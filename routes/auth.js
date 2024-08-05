// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// // Routes pour l'authentification
// router.post('/register', authController.register);
// router.post('/login', authController.login);
// router.get('/verify-email', authController.verifyEmail);
// router.get('/logout', authController.logout);

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/authController');

// router.post('/register', userController.registerUser);
// router.post('/login', userController.loginUser);

// module.exports = router;
// routes/authRoutes.js
const express = require("express");
const passport = require("passport");
const authController = require("../controllers/AuthController1"); // Import the AuthController
const router = express.Router();

// Show login form
router.get("/connecter", authController.showLoginPage);

// Handle login logic
router.post("/login", authController.login);

// Show signup form
// router.get("/signup", authController.showSignupPage);

// Handle signup logic
router.post("/register", authController.signup);
router.get("/verify/:token", authController.verifyAccount);

router.get("/changepassword", authController.showChangePasswordPage);
router.post("/changepassword", authController.changePassword);

// Logout
router.get("/logout", authController.logout);

module.exports = router;
