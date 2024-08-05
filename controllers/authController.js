// const bcrypt = require('bcrypt');
// const userModel = require('../models/user');

// module.exports = {
//   registerUser: (req, res) => {
//     const { username, email, password, role } = req.body;

//     userModel.checkUserByEmail(email, (err, result) => {
//       if (err) {
//         console.error('Error checking user:', err);
//         return res.status(500).send('Internal server error');
//       }
//       if (result.length > 0) {
//         return res.render('login', { 
//           message: 'User already registered', 
//           messageType: 'error',
//           showRegisterMessage: true 
//         });
//       } else {
//         bcrypt.hash(password, 10, (err, hashedPassword) => {
//           if (err) {
//             console.error('Error hashing password:', err);
//             return res.status(500).send('Internal server error');
//           }
//           userModel.insertUser(username, email, hashedPassword, role, (err, result) => {
//             if (err) {
//               console.error('Error inserting user:', err);
//               return res.status(500).send('Internal server error');
//             }
//             res.render('login', { 
//               message: 'Registration successful! You can now log in.', 
//               messageType: 'success',
//               showRegisterMessage: true 
//             });
//           });
//         });
//       }
//     });
//   },
  
//   loginUser: (req, res) => {
//     const { email, password } = req.body;
    
//     userModel.checkUserByEmail(email, (err, result) => {
//       if (err) {
//         console.error('Error querying user:', err);
//         return res.status(500).send('Internal server error');
//       }
//       if (result.length > 0) {
//         const user = result[0];
//         bcrypt.compare(password, user.password, (err, isMatch) => {
//           if (err) {
//             console.error('Error comparing passwords:', err);
//             return res.status(500).send('Internal server error');
//           }
//           if (isMatch) {
//             res.redirect('/index');
//           } else {
//             res.render('login', { 
//               message: 'Incorrect email or password', 
//               messageType: 'error',
//               showLoginMessage: true 
//             });
//           }
//         });
//       } else {
//         res.render('login', { 
//           message: 'Incorrect email or password', 
//           messageType: 'error',
//           showLoginMessage: true 
//         });
//       }
//     });
//   }
// };
