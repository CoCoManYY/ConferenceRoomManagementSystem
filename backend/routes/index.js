var express = require('express');
var users = require('../controller/users');
var conferenceRooms = require('../controller/conferenceRooms');
var conferees = require('../controller/conferees');
var conferenceRoomReserveLogs = require('../controller/conferenceRoomReserveLogs');
var checkToken = require('../controller/util').checkToken;
var router = express.Router();


function authorization(req, res, next) {
  const token = req.get('Authorization');
  if(token){
    try{
      checkToken(token);
      next();
    }catch(err){
      res.status(401).send('token 非法,鉴权失败');
    }
  }else{
    res.status(401).send('token 为空,鉴权失败');
  }
};

/* GET home page. */
router.get('/user/login',users.login);
router.get('/conferenceRoom/getConferenceRoomDetail', authorization,conferenceRooms.getConferenceRoomDetail);
router.get('/conferenceRoom/getConferenceRoomsInfo',authorization,conferenceRooms.getConferenceRoomsInfo);
router.get('/conferenceRoom/searchConferenceRoomsInfo',conferenceRooms.searchConferenceRoomsInfo);
router.get('/conferenceRoom/getConferenceReservedByMyself',conferenceRooms.getConferenceReservedByMyself);
router.get('/conferenceRoom/getConferenceRelatedToMyself',conferenceRooms.getConferenceRelatedToMyself);
router.get('/conferenceRoom/getConferenceReserveLogDetail',conferenceRooms.getConferenceReserveLogDetail);
router.post('/conferenceRoom/addConferenceRoomReserveLog',conferenceRooms.addConferenceRoomReserveLog);

router.post('/user/login',users.login);
router.post('/user/register',users.register);
router.get('/user/getUserInfo',authorization,users.getUserInfo);
router.get('/user/findAllUsersWithoutMyself',users.findAllUsersWithoutMyself);
router.get('/user/searchUserInfo',users.searchUserInfo);
router.post('/user/modifyPassword',authorization,users.modifyPassword);

router.post('/conferee/changeConfereeStatus',conferees.changeConfereeStatus);
router.post('/conferee/addConferees',conferees.addConferees);


router.post('/conferenceRoomReserveLog/cancelConferenceRoomReserve',conferenceRoomReserveLogs.cancelConferenceRoomReserve);
router.post('/conferenceRoomReserveLog/clockInConferenceRoomReserve',conferenceRoomReserveLogs.clockInConferenceRoomReserve);
router.post('/conferenceRoomReserveLog/raceConferenceRoomReserve',conferenceRoomReserveLogs.raceConferenceRoomReserve);
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
