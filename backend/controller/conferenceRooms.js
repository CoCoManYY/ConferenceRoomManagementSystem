// 预定时间粒度为1小时

var Sequelize = require("sequelize");
var Until = require('./util')  //同级目录下
var ConferenceRoom = require('../models/conferenceRoom').ConferenceRoom;
var ConferenceRoomReserveLog = require('../models/conferenceRoomReserveLog').ConferenceRoomReserveLog;
var ConferenceRoomReserveLogModel = require('../models/conferenceRoomReserveLog');
const Op = Sequelize.Op;

module.exports = {
    getConferenceRoomDetail: function(req, res, next) {
        const conferenceRoomId =  req.query.conferenceRoomId;
        ConferenceRoom.findOne({    
            where: {
                id: conferenceRoomId,
            },
            include:[{
                model:ConferenceRoomReserveLog,
                required:false 
            }]
        }).then((data)=>{
            // console.log('getAllConferenceRoomInfo',data);
            if(data){
                res.json({success:true,data,code:200,msg:null});
            }else{
                res.json({success:false,data,code:500,msg:"未查到数据"});
            }  
        },(err)=>{
            res.status(500).send(err);
        });
    },
    getAllConferenceRoomInfo: function(req, res, next) {
        ConferenceRoom.findAll({
            include:[{
                model:ConferenceRoomReserveLog,
                required:false 
            }]
        }).then((data)=>{
            console.log('getAllConferenceRoomInfo',data);
            if((data||[]).length){
                res.json({success:true,data,code:200,msg:null});
            }else{
                res.json({success:false,data,code:500,msg:"未查到数据"});
            }  
        },(err)=>{
            res.status(500).send(err);
        });
    },
    getCurrentConferenceRoomsInfo: function(req, res, next) {
        console.log('params',req.body);
        console.log('testtest');
        ConferenceRoom.findAll({
            include:[{
                model:ConferenceRoomReserveLog,
                where:{
                    startTime:{[Op.lt]:(new Date()).getTime()},
                    endTime:{[Op.gt]:(new Date()).getTime()}
                },
                required:false 
            }]
        }).then((data)=>{
            if((data||[]).length){
                res.json({success:true,data,code:200,msg:null});
            }else{
                res.json({success:false,data,code:500,msg:"未查到数据"});
            } 
            // console.log(JSON.stringify(data));
    
        },(err)=>{
            console.log('err'+ err);
        });
    },
    addConferenceRoomReserveLog: function(req, res, next) {
        console.log('params',req.body);
        var startTime=req.body.startTime;
        var endTime=req.body.endTime;
        var conferenceRoomId=req.body.conferenceRoomId;
        var status=req.body.status;
        ConferenceRoomReserveLogModel.addConferenceRoomReserveLog(startTime,endTime, conferenceRoomId,status).then(data=>{
            console.log('预定',data);
            if(data){
                res.json({success:true,data:{conferenceRoomReserveLogId:data.id},code:200,msg:'预定成功'});
            }else{
                res.json({success:false,data:data,code:500,mag:'注册失败'});
            }
        });
    }
}