const express = require('express');
const router = express.Router();

router.get('/admin',(req, res) => {
    res.render('admin/dashboard');
});
router.get('/create_event',(req, res) => {
    res.render('admin/create_event');
});

module.exports = router;
