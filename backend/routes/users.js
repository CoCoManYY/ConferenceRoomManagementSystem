var express = require('express');
var router = express.Router();
var login = require('../controller/login');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/', function (req, res) {
  res.send('Got a user POST request')
})
router.post('/login', login.login);
router.put('/', function (req, res) {
  res.send('Got a user PUT request at /user')
})
router.delete('/', function (req, res) {
  res.send('Got a user DELETE request at /user')
})

module.exports = router;
