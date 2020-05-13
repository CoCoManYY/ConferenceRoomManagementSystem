var jwt = require("jwt-simple"); //引入jwt模块
var findUserByNameAndPassword = require('../models/user').findByNameAndPassword;
const salt = "cocoman";

const setResult= (code, message = "success", data = null) => {
	return {
		code: code,
		message: message,
		data: data,
	};
}


const setToken= function (obj) {
	//设置Token
	return jwt.encode(obj, salt); //返回加密结果   jwt.encode('加密的对象','加密的秘钥')
}

const checkToken = function (token) {
	var tokenObj = jwt.decode(token, salt); //token存在，进行解密
	return tokenObj;
}



module.exports = {
	setToken,
	checkToken,
	/* 接口统一返回格式 */
	setResult,
};
