// 预定时间粒度为1小时

var Sequelize = require("sequelize");
var moment = require("moment");
var Until = require('./util')  //同级目录下
var Conferee = require('../models/conferee').Conferee;
var ConfereeModel = require('../models/conferee');
var User = require('../models/user').User;
var ConferenceRoom = require('../models/conferenceRoom').ConferenceRoom;
var ConferenceRoomReserveLog = require('../models/conferenceRoomReserveLog').ConferenceRoomReserveLog;
var ConferenceRoomReserveLogModel = require('../models/conferenceRoomReserveLog');
const Op = Sequelize.Op;

module.exports = {
    cancelConferenceRoomReserve: function(req, res, next) {
        const conferenceRoomReserveLogId =  req.body.conferenceRoomReserveLogId;
        ConferenceRoomReserveLogModel.updateConferenceRoomReserveLogStatus(conferenceRoomReserveLogId,1).then(data=>{
            if(data){
                res.json({success:true,data:{},code:200,msg:'会议预定取消成功'});
            }else{
                res.json({success:false,data:{},code:500,msg:'会议预定取消失败'});
            }
        })      
    }
}