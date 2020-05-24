// 预定时间粒度为1小时

var Sequelize = require("sequelize");
var moment = require("moment");
var Until = require('./util') //同级目录下
var Conferee = require('../models/conferee').Conferee;
var ConfereeModel = require('../models/conferee');
var User = require('../models/user').User;
var ConferenceRoom = require('../models/conferenceRoom').ConferenceRoom;
var ConferenceRoomReserveLog = require('../models/conferenceRoomReserveLog').ConferenceRoomReserveLog;
var ConferenceRoomReserveLogModel = require('../models/conferenceRoomReserveLog');
const Op = Sequelize.Op;

module.exports = {
    cancelConferenceRoomReserve: function (req, res, next) {
        const conferenceRoomReserveLogId = req.body.conferenceRoomReserveLogId;
        ConferenceRoomReserveLogModel.updateConferenceRoomReserveLogStatus(conferenceRoomReserveLogId, 1).then(data => {
            if (data) {
                res.json({
                    success: true,
                    data: {},
                    code: 200,
                    msg: '会议预定取消成功'
                });
            } else {
                res.json({
                    success: false,
                    data: {},
                    code: 500,
                    msg: '会议预定取消失败'
                });
            }
        })
    },
    clockInConferenceRoomReserve: function (req, res, next) {
        const conferenceRoomReserveLogId = req.body.conferenceRoomReserveLogId;
        ConferenceRoomReserveLogModel.updateConferenceRoomReserveLogStatus(conferenceRoomReserveLogId, 2).then(data => {
            if (data) {
                res.json({
                    success: true,
                    data: {},
                    code: 200,
                    msg: '会议打卡成功'
                });
            } else {
                res.json({
                    success: false,
                    data: {},
                    code: 500,
                    msg: '会议打卡成功'
                });
            }
        })
    },
    raceConferenceRoomReserve: function (req, res, next) {
        const conferenceRoomReserveLogId = req.body.conferenceRoomReserveLogId;
        const userId = req.body.userId;
        var description = req.body.description;
        const conferees = req.body.conferees;
        const conferenceRoomId = req.body.conferenceRoomId;
        ConferenceRoomReserveLogModel.raceConferenceRoomReserve(conferenceRoomReserveLogId, userId, description, 2).then(data => {
            if (data) {
                console.log('ConferenceRoomReserveLogModel', data);
                Conferee.destroy({
                    'where': {
                        'conferenceRoomReserveLogId': conferenceRoomReserveLogId
                    }
                }).then(data => {
                    const confereesParams = conferees.map(conferee => {
                        const result = {};
                        result.userId=JSON.parse(conferee).id;
                        result.conferenceRoomId = parseInt(conferenceRoomId);
                        result.conferenceRoomReserveLogId = parseInt(conferenceRoomReserveLogId);
                        return result;
                    });
                    Conferee.bulkCreate(confereesParams).then(data => {
                        if (data) {
                            res.json({success: true,data: {conferenceRoomReserveLogId},code: 200,msg: '抢占成功'});
                        } else {
                            res.json({success: false,data: data,code: 500,mag: '抢占失败2'});
                        }
                    })
                })
            } else {
                res.json({success: false,data: {},code: 500,msg: '抢占失败3' });
            }
        })
    }

}