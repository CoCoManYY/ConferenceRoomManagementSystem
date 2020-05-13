// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host: 'localhost',	// 连接的服务器
//   port: 3306,
// 	user: 'root',	// 用户名
// 	password: '123456',	// 用户密码
// 	database: 'meetingRoomManagement'	// 选择的库
// });

// module.exports = connection;

var Sequelize = require('sequelize');
module.exports = new Sequelize('meetingRoomManagement', 'root', '123456', {
    host: 'localhost', // 数据库地址
    dialect: 'mysql', // 指定连接的数据库类型
    pool: {
        max: 5, // 连接池中最大连接数量
        min: 0, // 连接池中最小连接数量
        idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    }
});
