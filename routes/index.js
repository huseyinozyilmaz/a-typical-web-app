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

router.get('/users', function(req, res, next) {
    res.render('layout', {
        title   : 'Users',
        partial : 'users'
    });
});

router.get('/greetings', function(req, res, next) {
    res.render('layout', {
        title   : 'Greetings',
        partial : 'greetings'
    });
});


router.get('/navigation', function(req, res, next) {
    res.render('layout', {
        title   : 'Navigation',
        partial : 'navigation'
    });
});

router.get('/alert', function(req, res, next) {
    res.render('layout', {
        title   : 'Alert',
        partial : 'alert'
    });
});

router.get('/internet', function(req, res, next) {
    res.render('layout', {
        title   : 'Internet Usage',
        partial : 'internet'
    });
});

router.get('/cities', function(req, res, next) {
    res.render('layout', {
        title   : 'Large Cities',
        partial : 'cities'
    });
});
router.post('/cities', function(req, res, next) {
    res.render('layout', {
        title   : 'Large Cities',
        partial : 'selectedcity',
        continent: req.body.continent,
        country: req.body.country,
        city: req.body.city
    });
});

router.get('/test', function(req, res, next) {
    res.render('layout', {
        title   : 'Test',
        partial : 'test'
    });
});


module.exports = router;
