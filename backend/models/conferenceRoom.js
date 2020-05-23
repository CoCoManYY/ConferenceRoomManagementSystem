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

exports.ConferenceRoom=ConferenceRoom;

