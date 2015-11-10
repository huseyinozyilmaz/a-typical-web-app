var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('template');
});

router.get('/login', function(req, res, next) {
    //res.render('login', { title: 'Login' });
    /**
    res.locals = {
        title: 'Login',
    };
    res.render('template', { 
        partials: { page: '_login' }
    });
**/
});

module.exports = router;
