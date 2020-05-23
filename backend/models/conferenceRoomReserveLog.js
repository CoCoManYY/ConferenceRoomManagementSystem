var Sequelize = require("sequelize");
var db = require("./db");
var ConferenceRoom = require('./conferenceRoom').ConferenceRoom;
var Conferee = require('./conferee').Conferee;

const ConferenceRoomReserveLog = db.define("conferenceRoomReserveLog", {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	userId:{
		type: Sequelize.INTEGER(11),
		allowNull: false,
	},
	conferenceRoomId: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
	},
	description: {
		type:  Sequelize.STRING(255),
        allowNull: true,
	},
    startTime:{
        type:  Sequelize.DATE(),
        allowNull: false,
    },
    endTime:{
        type:  Sequelize.DATE(),
        allowNull: false,
    },
	status: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
	},
});


var conferenceRoomReserveLog = ConferenceRoomReserveLog.sync({ force: false });

// 查询所有的会议室预定记录
exports.queryAllConferenceRoomReserveLogs = function() {
	// 向 user 表中插入数据
	return ConferenceRoomReserveLog.findAll();
};

// 通过id查找会议室预定记录
exports.queryConferenceRoomById = function(id) {
	return ConferenceRoomReserveLog.findOne({ where: { id: id } });
};

// 添加新预定
exports.addConferenceRoomReserveLog = function(startTime,endTime, conferenceRoomId,description,userId) {
		
	console.log('addConferenceRoomReserveLog',startTime,endTime, conferenceRoomId,description,userId);
	// 向 user 表中插入数据
	return ConferenceRoomReserveLog.create({
		startTime,endTime, conferenceRoomId,description,userId,status:0
	});
},
exports.updateConferenceRoomReserveLogStatus = function (conferenceRoomReserveLogId, type) {
	return ConferenceRoomReserveLog.update({status:type}, {where:{ id: conferenceRoomReserveLogId}});
},

exports.ConferenceRoomReserveLog=ConferenceRoomReserveLog;

