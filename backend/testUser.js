var User = require('./models').User

var now = Date.now();

User.create({
  type: 'student',
username:"yuyu",
password:'12345678',
gender:'F',
id_card:'123'
}).then(function (p) {
  console.log('created.' + JSON.stringify(p));
}).catch(function (err) {
  console.log('failed: ' + err);
});