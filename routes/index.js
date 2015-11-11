var express = require('express');
var pause   = require('connect-pause');
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
        partial : 'login',
        loginFailed: false
    });
});
router.post('/login', pause(1000), function(req, res, next) {
    var partial = 'login';
    var loginFailed = true;

    if(req.body.email == 'valid@email.com' && req.body.pwd == 'secret'){
        loginFailed = false;
        partial = 'loginsuccess';
    }
    res.render('layout', {
        title   : 'Login',
        partial : partial,
        loginFailed: loginFailed
    });
});

router.get('/subscribe', function(req, res, next) {
    res.render('layout', {
        title   : 'Subscribe',
        partial : 'subscribe'
    });
});

module.exports = router;
