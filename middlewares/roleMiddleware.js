// Middleware for role-based access control
function ensureRole(role) {
  return function(req, res, next) {
      if (!req.isAuthenticated()) {
          return res.redirect('/login'); // Redirect to login if not authenticated
      }
      
      if (req.user.role !== role) {
          return res.status(403).send('Forbidden'); // Forbidden if role does not match
      }
      
      next(); // Proceed if the user has the required role
  };
}

// Middleware for visitor access
function ensureAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next(); // Proceed if not authenticated
}

module.exports = { ensureRole, ensureAuthenticated };
