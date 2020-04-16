// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host: '127.0.0.1',	// 连接的服务器
//   port: 3306,
// 	user: 'root',	// 用户名
// 	password: '12345678',	// 用户密码
// 	database: 'meetingRoomManagement'	// 选择的库
// });

// connection.connect();	// 创建一个mysql的线程

// connection.query('SELECT 1 + 1 AS solution', (err, results, fields) => {
// 	if (err) {
// 		throw  err;
// 	};

//   console.log('The solution is:', results[0].solution);	// 返回第一条记录的solution列的内容
// });


var Sequelize =  require('sequelize');
const caching_sha2_password = require('mysql2/lib/auth_plugins/caching_sha2_password.js');
const mysql_native_password = require('mysql2/lib/auth_plugins/mysql_native_password.js');
// database数据库名称   name 用户  password密码
var sequelize = new Sequelize('database', 'name', 'password', {
		dialect: 'mysql',
		dialectOptions:{
			authPlugins: { 
				sha256_password: mysql_native_password({})
		}
		},
		host: '127.0.0.1',	// 连接的服务器
		port: 3306,
		user: 'root',	// 用户名
		password: '12345678',	// 用户密码
		database: 'meetingRoomManagement',	// 选择的库
});
module.exports=sequelize