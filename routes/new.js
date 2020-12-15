var express = require('express');
var router = express.Router();
var request = require('request');
var uuid = require('uuid');
let auth = require('../config/auth');

/* GET new page. */
router.get('/', auth.ensureAuthenticated, function(req, res){
    
    res.render('new', { 
        title: 'Nueva promocion: '
      });
});


// Update Submit POST Route
router.post('/', auth.ensureAuthenticated, function(req, res){
    let data = {};
    data.id = uuid.v4();
    data.nombre = req.body.nombre;
    data.descripcion = req.body.descripcion;
    data.linkurl = req.body.linkurl;
    data.linkimagen = req.body.linkimagen;
  
    var options = {
      'method': 'POST',
      'url': 'https://a2klab.azurewebsites.net/api/Promociones/insert',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
      res.redirect('/');
    });
  });


const https = require('https');

module.exports = router;