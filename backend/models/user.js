var Sequelize = require("sequelize");
var db = require("./db");

const Op = Sequelize.Op;

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
	gender: {
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


var user = User.sync({
	force: false
});


module.exports = {
	// 通过名称搜索用户 //#endregion
	searchUserInfo: (pageIndex, pageSize, keywords,userId) => {
		return User.findAll({
			offset: pageSize * pageIndex,
			limit: pageSize,
			where: {
				id: {
					[Op.ne]: userId
				},
				username: {
					[Op.like]: '%' + keywords + '%'
				}
			},
			attributes: {
				exclude: ['password']
			}
		})
	},
	// 通过用户id查找用户
	findAllUsersWithoutMyself: function (pageIndex, pageSize, userId) {
		console.log('diaoyong ')
		return User.findAll({
			offset: pageSize * pageIndex,
			limit: pageSize,
			where: {
				id: {
					[Op.ne]: userId
				}
			},
			attributes: {
				exclude: ['password']
			}
		});
	},

	// 添加新用户
	addUser: function (userName, password, email, gender, idCard, userType) {
		console.log('register', userName, password, email, gender, idCard, userType);
		// 向 user 表中插入数据
		return User.create({
			username: userName,
			password,
			email,
			gender,
			idcard: idCard,
			usertype: userType
		});
	},
	// 通过用户id查找用户
	findByUserId: function (userId) {
		return User.findOne({
			where: {
				id: userId
			},
			attributes: {
				exclude: ['password']
			}
		});
	},
// 通过用户id查找用户
findByIdCard: function (idCard) {
	return User.findOne({
		where: {
			idcard: idCard
		},
		attributes: {
			exclude: ['password']
		}
	});
},

	// 通过用户id查找用户
	findPasswordByUserId: function (userId) {
		return User.findOne({
			where: {
				id: userId
			},
			attributes: ['password']
		});
	},
	// 更新密码
	updatePassword: function (userId, password) {
		return User.update({
			password
		}, {
			where: {
				id: userId
			}
		});
	},
	// 通过用户名和木马查找用户
	findByNameAndPassword: function (userName, password) {
		console.log('findByNameAndPassword');
		return User.findOne({
			where: {
				username: userName,
				password
			}
		});
	},
	User
}