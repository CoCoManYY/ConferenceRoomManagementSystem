var jwt = require("jwt-simple"); //引入jwt模块
var User = require("../models").User; //引入User数据库模型

module.exports = {
	setToken: function (obj) {
		//设置Token
		return jwt.encode(obj, "hhdj"); //返回加密结果   jwt.encode('加密的对象','加密的秘钥')
	},
	checkToken: function (req, res, next) {
		//检查token
		var t = req.headers["token"];
		if (!t) {
			//如果请求头中不存在token，返回"no token"信息
			res.send(this.setResult(500, "no token"));
			return;
		}
		var token = jwt.decode(t, "hhdj"); //token存在，进行解密
		if (!token) {
			res.send(this.setResult(500, "token error")); //解密不成功
			return;
		}
		//解密成功，查询
		User.find({ where: { id: token.id } })
			.then((r) => {
				req.TOKEN_USER = r;
				//将在数据里边查询的信息，保存到req. TOKEN_USER里边
				next();
			})
			.catch((r) => {
				res.send(this.setResult(0, "token验证失败"));
			});
	},
	/* 接口统一返回格式 */
	setResult: (code, message = "success", data = null) => {
		return {
			code: code,
			message: message,
			data: data,
		};
	},
};
