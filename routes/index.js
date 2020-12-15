var express = require('express');
var router = express.Router();
let auth = require('../config/auth');

/* GET home page. */
router.get('/', auth.ensureAuthenticated, function(req, res, next) {
  
  let data = '';

  https.get('https://a2klab.azurewebsites.net/api/Promociones', (resp) => {
    
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data)[0].nombre);
        // console.log('hola!');
      res.render('index', { 
        title: 'Todas las promociones',
        data: JSON.parse(data)
      });
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });



});

const https = require('https');



module.exports = router;
