var db = require('./db');
var User = require("./user").User;
var Conferee = require('./conferee').Conferee;
var ConferenceRoom = require("./conferenceRoom").ConferenceRoom;
var ConferenceRoomReserveLog = require('./conferenceRoomReserveLog').ConferenceRoomReserveLog;
var PunchingCardLog = require('./punchingCardLog').PunchingCardLog;


// ConferenceRoom.hasMany(ConferenceRoomReserveLog, {foreignKey: 'conferenceRoomId', sourceKey: 'id'});
// ConferenceRoom.hasMany(Conferees, {foreignKey: 'conferenceRoomId', sourceKey: 'id'});

// db.sync();

module.exports={
  User,
  Conferee,
  ConferenceRoom,
  ConferenceRoomReserveLog,
  PunchingCardLog,
}