
var express = require('express');
var router = express.Router();
var request = require('request');
var passport = require('passport');
/* GET home page. */

// Login Form
router.get('/', function(req, res){
  res.render('login');
});

// Login Process
router.post('/', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/login'
    //failureFlash: true
  })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
  req.logout();
  //req.flash('success', 'You are logged out');
  res.redirect('/login');
});

const https = require('https');

module.exports = router;