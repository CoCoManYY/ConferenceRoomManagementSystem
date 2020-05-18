var Sequelize = require("sequelize");
var db = require("./db");

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
exports.addConferenceRoomReserveLog = function(startTime,endTime, conferenceRoomId,status) {
		
	console.log('addConferenceRoomReserveLog',startTime,endTime, conferenceRoomId,status);
	// 向 user 表中插入数据
	return ConferenceRoomReserveLog.create({
		startTime,endTime, conferenceRoomId,status
	});
},

exports.ConferenceRoomReserveLog=ConferenceRoomReserveLog;

