const User = require('../models/User'); // Adjust path as needed

const setUserRole = async (req, res, next) => {
    console.log(req.isAuthenticated);
    if (req.isAuthenticated()) { 
        try {
            const user = await User.findById(req.user.id);

            res.locals.isAdmin = true;
            
        } catch (err) {
            res.locals.isAdmin = false;
        }
    } else {
        res.locals.isAdmin = false;
    }
    next();
};

module.exports = setUserRole;
