var express = require('express');
var users = require('../controller/users');
var conferenceRooms = require('../controller/conferenceRooms');
var router = express.Router();

/* GET home page. */
router.get('/user/login',users.login);
router.get('/conferenceRoom/getAllConferenceRoomInfo', conferenceRooms.getAllConferenceRoomInfo);
router.get('/conferenceRoom/getConferenceRoomDetail', conferenceRooms.getConferenceRoomDetail);
router.get('/conferenceRoom/getCurrentConferenceRoomsInfo', conferenceRooms.getCurrentConferenceRoomsInfo);
router.post('/conferenceRoom/addConferenceRoomReserveLog', conferenceRooms.addConferenceRoomReserveLog);
router.post('/user/login',users.login);
router.post('/user/register',users.register);
router.get('/', function (req, res) {
  res.send('Got a POST request')
})

router.post('/', function (req, res) {
  res.send('Got a POST request')
})

router.put('/', function (req, res) {
  res.send('Got a PUT request at /user')
})
router.delete('/', function (req, res) {
  res.send('Got a DELETE request at /user')
})

module.exports = router;
