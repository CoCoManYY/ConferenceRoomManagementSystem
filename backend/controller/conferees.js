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
    changeConfereeStatus: function(req, res, next) {
        const confereeId =  req.body.confereeId;
        const type = parseInt(req.body.type||0);
        ConfereeModel.updateConfereeStatus(confereeId,type).then(data=>{
            if(data){
                res.json({success:true,data:{},code:200,msg:'与会人员状态更新成功'});
            }else{
                res.json({success:false,data:{},code:500,msg:'与会人员状态更新失败'});
            }
        })      
    },
    addConferees: function(req, res, next) {
        const conferees =  req.body.conferees;
        console.log('addConferees',conferees);  
        Conferee.bulkCreate(conferees).then(data=>{
            if(data){
                res.json({success:true,data:{},code:200,msg:'会议参与人员添加成功'});
            }else{
                res.json({success:false,data:{},code:500,msg:'会议参与人员添加失败'});
            }
        })      
    },
}