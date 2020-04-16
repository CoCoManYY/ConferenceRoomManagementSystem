var Sequelize = require("sequelize");
var db = require("./db");

module.exports = db.define("user", {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	username: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
	password: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
  gender:{
    type: Sequelize.STRING(5),
		allowNull: false,
  },
	id_card: {
		type: Sequelize.STRING(50),
		allowNull: false,
  },
  type: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
});
