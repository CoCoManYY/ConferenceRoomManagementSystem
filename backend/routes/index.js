var express = require('express');
var users = require('../controller/users');
var conferenceRooms = require('../controller/conferenceRooms');
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
router.get('/conferenceRoom/getAllConferenceRoomInfo', authorization, conferenceRooms.getAllConferenceRoomInfo);
router.get('/conferenceRoom/getConferenceRoomDetail', authorization,conferenceRooms.getConferenceRoomDetail);
router.get('/conferenceRoom/getCurrentConferenceRoomsInfo', authorization,conferenceRooms.getCurrentConferenceRoomsInfo);
router.get('/conferenceRoom/getConferenceRoomsInfo',conferenceRooms.getConferenceRoomsInfo);
router.post('/conferenceRoom/addConferenceRoomReserveLog', authorization,conferenceRooms.addConferenceRoomReserveLog);
router.post('/user/login',users.login);
router.post('/user/register',users.register);
router.get('/user/getUserInfo',authorization,users.getUserInfo);
router.post('/user/modifyPassword',authorization,users.modifyPassword);


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
