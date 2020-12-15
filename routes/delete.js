var express = require('express');
var router = express.Router();
var request = require('request');
let auth = require('../config/auth');
/* GET home page. */

router.get('/:id', auth.ensureAuthenticated, function(req, res){
    
    console.log('pase');

    let data = '';
    https.get('https://a2klab.azurewebsites.net/api/Promociones/'+ req.params.id, (resp) => {
      
      resp.on('data', (chunk) => {
        data += chunk;
      });
    
      resp.on('end', () => {
        console.log(JSON.parse(data)[0].nombre);
        res.render('delete', { 
          title: 'Eliminar promocion',
          data: JSON.parse(data)[0]
        });
      });
    
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

});


// Update Submit POST Route
router.post('/:id', auth.ensureAuthenticated, function(req, res){
    let data = {};
    data.id = req.params.id;
    data.nombre = req.body.nombre;
    data.descripcion = req.body.descripcion;
    data.linkurl = req.body.linkurl;
    data.linkimagen = req.body.linkimagen;
  
    var options = {
      'method': 'POST',
      'url': 'https://a2klab.azurewebsites.net/api/Promociones',
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