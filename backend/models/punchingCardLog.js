var Sequelize = require("sequelize");
var db = require("./db");

const PunchingCardLogs = db.define("punchingCardLogs", {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	conferenceRoomReserveLogsId: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
	}
});


var punchingCardLogs = PunchingCardLogs.sync({
	force: false
});

// 查询所有的打卡记录
exports.queryAllPunchingCardLogs = function () {
	// 向 user 表中插入数据
	return PunchingCardLogs.findAll();
};



// 通过id查找打卡记录
exports.queryPunchingCardLogsById = function (id) {
	return PunchingCardLogs.findOne({
		where: {
			id: id
		}
	});
};


// 添加打卡记录
exports.addPunchingCardLog = function (conferenceRoomReserveLogsId) {
	console.log('addPunchingCardLog', conferenceRoomReserveLogsId);
	// 向 user 表中插入数据
	return PunchingCardLogs.create({
		conferenceRoomReserveLogsId
	});
},

exports.PunchingCardLogs = PunchingCardLogs;