// 预定时间粒度为1小时

var Sequelize = require("sequelize");
var moment = require("moment");
var Until = require('./util') //同级目录下
var Conferee = require('../models/conferee').Conferee;
var User = require('../models/user').User;
var ConferenceRoom = require('../models/conferenceRoom').ConferenceRoom;
var ConferenceRoomReserveLog = require('../models/conferenceRoomReserveLog').ConferenceRoomReserveLog;
var ConferenceRoomReserveLogModel = require('../models/conferenceRoomReserveLog');
const Op = Sequelize.Op;

const ConferenceRoomReserveLogAssociationWithUser = ConferenceRoomReserveLog.belongsTo(User, {
    foreignKey: 'userId',
    as: 'conferenceOrganizer'
});

module.exports = {
    getConferenceRoomDetail: function (req, res, next) {
        const conferenceRoomId = req.query.conferenceRoomId;
        ConferenceRoom.findOne({
            where: {
                id: conferenceRoomId,
            },
            include: [{
                model: ConferenceRoomReserveLog,
                association: ConferenceRoom.hasMany(ConferenceRoomReserveLog, {
                    foreignKey: 'conferenceRoomId',
                    sourceKey: 'id'
                }),
                where:{status:{[Op.ne]:1}},
                required: false
            }]
        }).then((data) => {
            // console.log('getAllConferenceRoomInfo',data);
            if (data) {
                res.json({
                    success: true,
                    data,
                    code: 200,
                    msg: null
                });
            } else {
                res.json({
                    success: false,
                    data,
                    code: 500,
                    msg: "未查到数据"
                });
            }
        }, (err) => {
            res.status(500).send(err);
        });
    },
    getConferenceReserveLogDetail: function (req, res, next) {
        const conferenceRoomReserveLogId = req.query.conferenceRoomReserveLogId;
        ConferenceRoomReserveLog.findOne({
            include: [{
                    model: ConferenceRoom,
                    association: ConferenceRoomReserveLog.belongsTo(ConferenceRoom, {
                        foreignKey: 'conferenceRoomId'
                    }),
                    required: true
                },
                {
                    model: Conferee,
                    association: ConferenceRoomReserveLog.hasMany(Conferee, {
                        foreignKey: 'conferenceRoomReserveLogId',
                        sourceKey: 'id'
                    }),
                    required: false,
                    include: [{
                        model: User,
                        association: ConferenceRoomReserveLog.belongsTo(User, {
                            foreignKey: 'userId'
                        }),
                        attributes: {
                            exclude: ['password']
                        }
                    }]
                },
                {
                    model: User,
                    association: ConferenceRoomReserveLogAssociationWithUser,
                    attributes: {
                        exclude: ['password']
                    }
                }
            ],
            where: {
                id: conferenceRoomReserveLogId
            }
        }).then((data) => {
            res.json({
                success: true,
                data,
                code: 200,
                msg: null
            });
        }, (err) => {
            console.log('err' + err);
        });
    },
    getConferenceReservedByMyself: function (req, res, next) {
        console.log('params', req.body);
        var userId = req.query.userId;
        var pageIndex = parseInt(req.query.pageIndex) || 0;
        var pageSize = parseInt(req.query.pageSize) || 10;
        ConferenceRoomReserveLog.findAndCountAll({
            offset: pageSize * pageIndex,
            limit: pageSize,
            include: [{
                    model: ConferenceRoom,
                    association: ConferenceRoomReserveLog.belongsTo(ConferenceRoom, {
                        foreignKey: 'conferenceRoomId'
                    }),
                    required: true
                },
                {
                    model: Conferee,
                    association: ConferenceRoomReserveLog.hasMany(Conferee, {
                        foreignKey: 'conferenceRoomReserveLogId',
                        sourceKey: 'id'
                    }),
                    required: false,
                    include: [{
                        model: User,
                        association: ConferenceRoomReserveLog.belongsTo(User, {
                            foreignKey: 'userId'
                        }),
                        attributes: {
                            exclude: ['password']
                        }
                    }]
                },
                {
                    model: User,
                    association: ConferenceRoomReserveLogAssociationWithUser,
                    attributes: {
                        exclude: ['password']
                    }
                }
            ],
            where: {
                startTime: {
                    [Op.gt]: moment.utc().valueOf(),
                    [Op.lt]: moment.utc().add('days', 7).valueOf()
                },
                endTime: {
                    [Op.gt]: moment.utc().valueOf(),
                    [Op.lt]: moment.utc().add('days', 7).valueOf()
                },
                userId,
                status: {
                    [Op.ne]: 1
                }
            }
        }).then((data) => {
            res.json({
                success: true,
                data,
                code: 200,
                msg: null
            });
        }, (err) => {
            console.log('err' + err);
        });
    },
    getConferenceRelatedToMyself: function (req, res, next) {
        console.log('params', req.query);
        var userId = req.query.userId;
        var status = req.query.status;
        var pageIndex = parseInt(req.query.pageIndex) || 0;
        var pageSize = parseInt(req.query.pageSize) || 10;
        Conferee.findAndCountAll({
            offset: pageSize * pageIndex,
            limit: pageSize,
            attributes: {
                include: [
                    ['status', 'confereeStatus']
                ]
            },
            include: [{
                model: ConferenceRoomReserveLog,
                association: Conferee.belongsTo(ConferenceRoomReserveLog, {
                    foreignKey: 'conferenceRoomReserveLogId'
                }),
                where: {
                    startTime: {
                        [Op.gt]: moment.utc().valueOf(),
                        [Op.lt]: moment.utc().add('days', 7).valueOf()
                    },
                    endTime: {
                        [Op.gt]: moment.utc().valueOf(),
                        [Op.lt]: moment.utc().add('days', 7).valueOf()
                    },
                    status: {
                        [Op.ne]: 1
                    }
                },
                include: [{
                        model: Conferee,
                        association: ConferenceRoomReserveLog.hasMany(Conferee, {
                            foreignKey: 'conferenceRoomReserveLogId',
                            sourceKey: 'id'
                        }),
                        required: false,
                        include: [{
                            model: User,
                            association: ConferenceRoomReserveLog.belongsTo(User, {
                                foreignKey: 'userId'
                            }),
                            attributes: {
                                exclude: ['password']
                            }
                        }]
                    },
                    {
                        model: User,
                        association: ConferenceRoomReserveLogAssociationWithUser,
                        attributes: {
                            exclude: ['password']
                        }
                    }
                ],
                required: true
            }, {
                model: ConferenceRoom,
                association: Conferee.belongsTo(ConferenceRoom, {
                    foreignKey: 'conferenceRoomId'
                }),
                required: true
            }],
            where: {
                status,
                userId
            }
        }).then((data) => {
            res.json({
                success: true,
                data,
                code: 200,
                msg: null
            });
        }, (err) => {
            console.log('err' + err);
        });
    },
    getConferenceRoomsInfo: function (req, res, next) {
        console.log('params', req.body);
        var keywords = req.query.keywords || '';
        var pageIndex = parseInt(req.query.pageIndex) || 0;
        var pageSize = parseInt(req.query.pageSize) || 10;
        ConferenceRoom.findAndCountAll({
            offset: pageSize * pageIndex,
            limit: pageSize,
            where: {
                houseNumber: {
                    [Op.like]: '%' + keywords + '%'
                }
            }
        }).then((data) => {
            if (Object.keys(data || {}).length !== 0) {
                res.json({
                    success: true,
                    data,
                    code: 200,
                    msg: null
                });
            } else {
                res.json({
                    success: false,
                    data,
                    code: 500,
                    msg: "未查到数据"
                });
            }

        }, (err) => {
            console.log('err' + err);
        });
    },
    searchConferenceRoomsInfo: function (req, res, next) {
        console.log('params', req.body);
        var keywords = req.query.keywords || '';
        var pageIndex = parseInt(req.query.pageIndex);
        var pageSize = parseInt(req.query.pageSize);
        ConferenceRoom.findAndCountAll({
            offset: pageSize * pageIndex,
            limit: pageSize,
            where: {
                houseNumber: {
                    [Op.like]: '%' + keywords + '%'
                }
            }
        }).then((data) => {
            if (Object.keys(data || {}).length !== 0) {
                res.json({
                    success: true,
                    data,
                    code: 200,
                    msg: null
                });
            } else {
                res.json({
                    success: false,
                    data,
                    code: 500,
                    msg: "未查到数据"
                });
            }

        }, (err) => {
            console.log('err' + err);
        });
    },
    addConferenceRoomReserveLog: function (req, res, next) {
        console.log('params', req.body);
        var description = req.body.description;
        var startTime = req.body.startTime;
        var endTime = req.body.endTime;
        var conferenceRoomId = req.body.conferenceRoomId;
        var userId = req.body.userId;
        const conferees =  req.body.conferees;
        ConferenceRoomReserveLogModel.addConferenceRoomReserveLog(startTime, endTime, conferenceRoomId,description,userId).then(data => {
            if (data) {
                const confereesParams=conferees.map(conferee=>{
                    const result = {};
                    result.userId=JSON.parse(conferee).id;
                    result.conferenceRoomId=parseInt(conferenceRoomId);
                    result.conferenceRoomReserveLogId = parseInt(data.id);
                    return result;
                });
                Conferee.bulkCreate(confereesParams).then(data=>{
                    if(data){
                        res.json({
                            success: true,
                            data: {
                                conferenceRoomReserveLogId: data.id
                            },
                            code: 200,
                            msg: '预定成功'
                        });
                    }else{
                        res.json({
                            success: false,
                            data: data,
                            code: 500,
                            mag: '预定失败'
                        });
                    }
                })  
            } else {
                res.json({
                    success: false,
                    data: data,
                    code: 500,
                    mag: '预定失败'
                });
            }
        });
    }
}