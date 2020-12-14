var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log('hola!');
  res.render('index', { 
    title: 'Mickess' 
  });
});

module.exports = router;
