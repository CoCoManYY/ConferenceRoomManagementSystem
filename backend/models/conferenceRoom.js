var Sequelize = require("sequelize");
var db = require("./db");
var ConferenceRoomReserveLog = require('./conferenceRoomReserveLog').ConferenceRoomReserveLog;

const ConferenceRoom = db.define("conferenceRoom", {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	houseNumber: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
	containNum: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
	},
    hasProjector:{
    type:  Sequelize.INTEGER(11),
		allowNull: false,
  },
  supportRemote: {
		type:  Sequelize.INTEGER(11),
		allowNull: false,
  },
});


var conferenceRoom = ConferenceRoom.sync({ force: false });

// 查询所有的会议室
exports.queryAllConferenceRooms = function() {
	// 向 user 表中插入数据
	return ConferenceRoom.findAll();
};

// 通过id查找会议室
exports.queryConferenceRoomById = function(id) {
	return User.findOne({ where: { id: id } });
};

ConferenceRoom.hasMany(ConferenceRoomReserveLog, {foreignKey: 'conferenceRoomId', sourceKey: 'id'});
exports.ConferenceRoom=ConferenceRoom;

