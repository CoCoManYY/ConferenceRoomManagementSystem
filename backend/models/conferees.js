var Sequelize = require("sequelize");
var db = require("./db");

const Conferees = db.define("conferees", {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	userId: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
	conferenceRoomReserveLogsId: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
	},
    createTime:{
        type:  Sequelize.DATE(),
        allowNull: false,
    }
});


var conferees = Conferees.sync({ force: false });

// 查询所有的会议室预定记录
exports.queryAllConferees = function() {
	// 向 user 表中插入数据
	return Conferees.findAll();
};

// 通过id查找会议室预定记录
exports.queryConfereesById = function(id) {
	return Conferees.findOne({ where: { id: id } });
};

