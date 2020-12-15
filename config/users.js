var records = [
    { id: 1, username: 'ntello', password: 'ntello', displayName: 'Nahuel', emails: [ { value: 'ntello@unarix.com.ar' } ] }
  , { id: 2, username: 'pedro', password: 'pedro', displayName: 'Pedro', emails: [ { value: 'pedro@unarix.com.ar' } ] }
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}