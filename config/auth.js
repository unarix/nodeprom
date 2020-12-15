// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      //req.flash('danger', 'Please login');
      res.redirect('/login');
    }
  }

// Exporto la funcion para que sea visible desde otros modulos
module.exports = { ensureAuthenticated };