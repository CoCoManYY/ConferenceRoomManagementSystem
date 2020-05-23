var Sequelize = require("sequelize");
var db = require("./db");
var ConferenceRoomReserveLog = require('./conferenceRoomReserveLog').ConferenceRoomReserveLog;
var ConferenceRoom = require('./conferenceRoom').ConferenceRoom;

const Conferee = db.define("conferee", {
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
	conferenceRoomReserveLogId: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
	},
	status: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
	},
});


var conferee = Conferee.sync({ force: false });
// Conferee.belongsTo(ConferenceRoomReserveLog, {foreignKey:  'conferenceRoomReserveLogId'});
// Conferee.belongsTo(ConferenceRoom, {foreignKey:  'conferenceRoomId'});
// ConferenceRoom.belongsToMany(ConferenceRoomReserveLog, {foreignKey: 'conferenceRoomId', sourceKey: 'id'});

// 更新密码
exports.updateConfereeStatus = function (confereeId, type) {
	return Conferee.update({status:type}, {where:{ id: confereeId}});
},
exports.Conferee=Conferee;

