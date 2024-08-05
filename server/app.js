// const express = require('express');
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
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const passport = require('passport');
const  createDatabase  = require('../config/creation_db');

// const createDatabase  = require('../config/creation_db'); 
const methodOverride = require('method-override'); // for PUT and DELETE methods
const  app = express();

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
createDatabase().then(() => {
    // Configurations de base
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));
  
    // View engine EJS
    app.use(expressLayouts);
    
    // Middlewares 
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(session({
      secret: 'votre_secret',
      resave: false,
      saveUninitialized: true
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(methodOverride('_method'));
  
    // Fichiers statiques
    app.use(express.static(path.join(__dirname, '../public')));
  
    // Routes
    const indexRouter = require('../routes/index');
    const eventRouter = require('../routes/event');
    const adminRouter = require('../routes/admin');
  
    app.use('/', indexRouter);
    app.use('/admin', adminRouter);
    app.use('/event', eventRouter);
  
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  }).catch(err => {
    console.error('Failed to create database:', err);
  });