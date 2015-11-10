var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('layout', { 
        title : 'Home',
        partial: 'home'
    });
});

router.get('/login', function(req, res, next) {
    res.render('layout', {
        title   : 'Login',
        partial : 'login'
    });
});

router.get('/subscribe', function(req, res, next) {
    res.render('layout', {
        title   : 'Subscribe',
        partial : 'subscribe'
    });
});

module.exports = router;
