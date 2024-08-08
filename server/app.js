
// const path = require('path');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const expressLayouts = require('express-ejs-layouts');
// const flash = require('connect-flash');
// const passport = require('passport');
// const app = express();
// // Configurations de base
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // view engine  EJS
// app.set('view engine', 'ejs');
// app.use(expressLayouts);
// // Middlewares

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(session({
//     secret: 'votre_secret',
//     resave: false,
//     saveUninitialized: true
// }));
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());

// // Fichiers statiques
// app.use(express.static(path.join(__dirname, 'public')));

// // Routes
// const indexRouter = require('./routes/index');
// const eventRouter = require('./routes/event');
// const adminRouter = require('./routes/admin');



// app.use('/', indexRouter);
// app.use('/admin', adminRouter);
// app.use('/event', eventRouter);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
// server/server.js
// server/server.js
// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const expressLayouts = require('express-ejs-layouts');
// const flash = require('connect-flash');
// const passport = require('passport');
// const  createDatabase  = require('../config/creation_db');
// const userRoutes = require('../routes/auth');

// require("./config/passport")(passport);
// // const createDatabase  = require('../config/creation_db'); 
// const methodOverride = require('method-override'); // for PUT and DELETE methods
// const  app = express();

// // Configurations de base
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '../views'));

// // view engine  EJS
// app.use(expressLayouts);
// // Middlewares 
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(session({
//     secret: 'votre_secret',
//     resave: false,
//     saveUninitialized: true
// }));
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(methodOverride('_method'));

// // Fichiers statiques
// app.use(express.static(path.join(__dirname, '../public')));

// // Routes
// const indexRouter = require('../routes/index');
// const eventRouter = require('../routes/event');
// const adminRouter = require('../routes/admin');

// app.use('/', indexRouter);
// app.use('/admin', adminRouter);
// app.use('/event', eventRouter);

// const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// // });
// // 
// createDatabase();
//  app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });
// createDatabase().then(() => {
//     // Configurations de base
//     app.set('view engine', 'ejs');
//     app.set('views', path.join(__dirname, '../views'));
  
//     // View engine EJS
//     app.use(expressLayouts);
    
//     // Middlewares 
//     app.use(express.json());
//     app.use(express.urlencoded({ extended: true }));
//     app.use(cookieParser());
//     app.use(session({
//       secret: 'votre_secret',
//       resave: false,
//       saveUninitialized: true
//     }));
//     app.use(flash());
//     app.use(passport.initialize());
//     app.use(passport.session());
//     app.use(methodOverride('_method'));
  
//     // Fichiers statiques
//     app.use(express.static(path.join(__dirname, '../public')));
  
//     // Routes
//     const indexRouter = require('../routes/index');
//     const eventRouter = require('../routes/event');
//     const adminRouter = require('../routes/admin');
//     const authRouter = require('../routes/auth');
  
//     app.use('/', indexRouter);
//     app.use('/admin', adminRouter);
//     app.use('/event', eventRouter);
//     app.use('/', authRouter);
  
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => {
//       console.log(`Server running at http://localhost:${PORT}`);
//     });
//   }).catch(err => {
//     console.error('Failed to create database:', err);
//   });


  // server/app.js
const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");


const passport = require("passport");
require("../config/passport")(passport);
const app = express();
 

const setUserRole = require('../middlewares/role');

// app.use(setUserRole);
// Import and run the database creation script
const createDatabase = require("../config/creation_db");
createDatabase();

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(methodOverride('_method'));
// Use express-ejs-layouts 
app.use(expressLayouts);

// Serve static files 
app.use(express.static(path.join(__dirname, "../public")));

// Body parser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: "secret_sam",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash

// Global variables for flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
const indexRoutes = require("../routes/index");
const authRoutes = require("../routes/auth");
const eventRoutes = require('../routes/event');
const adminRoutes = require("../routes/admin");


app.use("/", indexRoutes);
app.use("/", adminRoutes);
app.use("/", authRoutes);
app.use("/event",eventRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
