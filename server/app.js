
  // server/app.js
const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const { ensureRole, ensureAuthenticated } = require('../middlewares/roleMiddleware');

require("../config/passport")(passport);


const app = express();
 
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
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
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

// Import middleware for roles
// const { ensureAuthenticated, ensureAdmin, ensureUser } = require("../middlewares/roleMiddleware");

app.use("/", indexRoutes);
app.use("/", adminRoutes);
app.use("/", authRoutes);
app.use("/",eventRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
