const passport = require("passport");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
require('dotenv').config();
const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

module.exports = {
  showLoginPage: (req, res) => {
    res.render("auth/login");
  },

  // login: (req, res, next) => {
  //   passport.authenticate("local-login", (err, user, info) => {
  //     if (err) return next(err);

  //     if (!user) {
  //       const errorMsg = info.message || "La connexion a échoué.";
  //       req.flash("error_msg", errorMsg);
  //       return res.redirect("/login");
  //     }

  //     req.logIn(user, (err) => {
  //       if (err) return next(err);

  //       if (user.role === "admin") {
  //         return res.redirect("/admin");
  //       } else if (req.session.returnTo) {
  //         const redirectUrl = req.session.returnTo;
  //         delete req.session.returnTo;
  //         return res.redirect(redirectUrl);
  //       } else {
  //         return res.redirect("/");
  //       }
  //     });
  //   })(req, res, next);
  // },
  login: (req, res, next) => {
    passport.authenticate("local-login", (err, user, info) => {
      if (err) return next(err);
  
      if (!user) {
        const errorMsg = info.message || "La connexion a échoué.";
        req.flash("error_msg", errorMsg);
        console.log('Authentication failed:', errorMsg);  // Debugging log
        return res.redirect("/login");
      }
  
      req.logIn(user, (err) => {
        if (err) return next(err);
  
        console.log('Login successful:', user);  // Debugging log to show user details
  
        if (user.role === "admin") {
          return res.redirect("/admin");
        } else if (req.session.returnTo) {
          const redirectUrl = req.session.returnTo;
          delete req.session.returnTo;
          return res.redirect(redirectUrl);
        } else {
          return res.redirect("/");
        }
      });
    })(req, res, next);
  },
  
  showSignupPage: (req, res) => {
    res.render("auth/register");
  },

  signup: [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Le nom d'utilisateur doit comporter au moins 3 caractères")
      .trim()
      .escape(),
    body("email").isEmail().withMessage("Entrez une adresse mail valide"),
    body("nom")
      .matches(/^[a-zA-Z]+$/)
      .withMessage("Nom ne peut contenir que des lettres")
      .trim()
      .escape(),
    body("prenom")
      .matches(/^[a-zA-Z]+$/)
      .withMessage("Le prénom ne peut contenir que des lettres")
      .trim()
      .escape(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Le mot de passe doit contenir au moins 6 caractères")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d)/)
      .withMessage("Le mot de passe doit contenir à la fois des lettres et des chiffres"),

    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash(
          "error_msg",
          errors.array().map((err) => err.msg)
        );
        return res.redirect("/register");
      }

      const { username, email, password, nom, prenom, telephone,organisation ,profession, adresse } = req.body;
      try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
          req.flash("error_msg", "L'adresse e-mail est déjà utilisée");
          return res.redirect("/register");
        }

        const verificationToken = crypto.randomBytes(32).toString("hex");
        await User.createUser(
          username,
          email,
          password,
          nom,
          prenom,
          telephone,
          adresse,
          organisation,
          profession,
          verificationToken
        );
        
        const verificationUrl = `http://localhost:3000/verify/${verificationToken}`;
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
            
          },
        });
 
        const mailOptions = {
          from: process.env.EMAIL_USER, 
          to: email,
          subject: "Vérification de compte",
          text: `Veuillez vérifier votre compte en cliquant sur le lien suivant: ${verificationUrl}`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error("Erreur lors de l'envoi de l'e-mail:", err);
            req.flash("error_msg", "Erreur lors de l'envoi de l'e-mail de vérification.");
            return res.redirect("/register");
          }

          req.flash(
            "success_msg",
            "Vous vous êtes inscrit avec succès ! Veuillez vérifier votre e-mail pour vérifier votre compte."
          );
          res.redirect("/login");
        });
      } catch (err) {
        console.error("Erreur lors de l'inscription:", err);
        req.flash("error_msg", "Erreur de serveur, veuillez réessayer plus tard.");
        res.redirect("/register");
      }
    },
  ],

  verifyAccount: async (req, res) => {
    const { token } = req.params;

    try {
      const user = await User.verifyUser(token);
      if (!user) {
        req.flash("error_msg", "Jeton de vérification non valide.");
        return res.redirect("/register");
      }

      req.flash(
        "success_msg",
        "Votre compte a été vérifié. Vous pouvez désormais vous connecter."
      );
      res.redirect("/login");
    } catch (err) {
      console.error("Error verifying account:", err);
      req.flash(
        "error_msg",
        "Une erreur s'est produite lors de la vérification. Veuillez réessayer ultérieurement."
      );
      res.redirect("/register");
    }
  },

  logout: (req, res) => {
    req.logout();
    req.flash("success_msg", "Vous êtes déconnecté");
    res.redirect("/");
  },

  showChangePasswordPage: (req, res) => {
    if (req.user.role === "admin") {
      res.render("changer le mot de passe");
    } else {
      res.redirect("/");
    }
  },

  changePassword: async (req, res) => {
    if (req.user.role !== "admin") {
      return res.redirect("/");
    }

    const { currentPassword, newPassword } = req.body;

    try {
      const user = await User.findById(req.user.id);
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        req.flash("error_msg", "Ce mot de passe est incorrect");
        return res.redirect("/change-password");
      }

      await User.updatePassword(req.user.id, newPassword);
      req.flash("success_msg", "Mot de passe mis à jour avec succès");
      res.redirect("/");
    } catch (err) {
      console.error("Erreur lors du changement de mot de passe :", err);
      req.flash("error_msg", "Une erreur s'est produite lors du changement du mot de passe");
      res.redirect("/change-password");
    }
  },
};
