// var records = [
//     { id: '', username: '', password: '', displayName: '', system: '' }
// ];
var records = [];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    if (records[id]) {
      cb(null, records[id]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.checkUser = function(username, password, cb) {
  let data = '';
  https.get('https://a2klab.azurewebsites.net/api/User/'+ username + '/' + password + '/promono' , (resp) => {
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      if (resp.statusCode === 200)
      {
        let userObject = JSON.parse(data)[0] 
        records[userObject.id] = userObject;
        return cb(null, records[userObject.id]);
      }
      else
        return cb(null, null);
    });
  }).on("error", (err) => {
    return cb(null, null);
  });
}

// exports.findByUsername = function(username, cb) {
//   process.nextTick(function() {
//     for (var i = 0, len = records.length; i < len; i++) {
//       var record = records[i];
//       if (record.username === username) {
//         return cb(null, record);
//       }
//     }
//     return cb(null, null);
//   });
// }

const https = require('https');