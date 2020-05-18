var Sequelize = require("sequelize");
var db = require("./db");

const User = db.define("user", {
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
	email: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
  gender:{
    type: Sequelize.STRING(5),
		allowNull: false,
  },
	idcard: {
		type: Sequelize.STRING(50),
		allowNull: false,
  },
  usertype: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
});


var user = User.sync({ force: false });


module.exports = {
	// 添加新用户
	addUser : function(userName,password, gender,idCard,userType) {		
        console.log('register',userName,password, gender,idCard,userType);
		// 向 user 表中插入数据
		return User.create({
			username:userName,password, gender,idcard:idCard,usertype:userType
		});
	},
	// 通过用户名查找用户
	findByName : function(userName) {
		return User.findOne({ where: { username: userName } });
	},
	// 通过用户名和木马查找用户
	findByNameAndPassword : function(userName,password) {
		console.log('findByNameAndPassword');
		return User.findOne({ where: { username: userName,password } });
	}
}
