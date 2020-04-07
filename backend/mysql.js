var mysql = require('mysql');
var connection = mysql.createConnection({
  host: '127.0.0.1',	// 连接的服务器
  port: 3306,
	user: 'root',	// 用户名
	password: '12345678',	// 用户密码
	database: 'meetingRoomManagement'	// 选择的库
});

connection.connect();	// 创建一个mysql的线程

connection.query('SELECT 1 + 1 AS solution', (err, results, fields) => {
	if (err) {
		throw  err;
	};

  console.log('The solution is:', results[0].solution);	// 返回第一条记录的solution列的内容
});
