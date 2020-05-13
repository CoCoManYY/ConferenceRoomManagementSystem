/*  */// var User = require('../models').User
var Until = require('./util')  //同级目录下
var userModel = require('../models/user');
var checkToken = require('./util').checkToken;
var setToken = require('./util').setToken;
module.exports = {
    login: function(req, res, next) {
        console.log('params',req.body);
        console.log('testtest');
        var username = req.body.userName;  //统一接收前端的电话号，用户名，或者其他（多方式登录）
        var password = req.body.password;
        //检查token
        var token = setToken({userName:username,password});
        // if(Object.keys(tokenObj||{}).length>0){
        //     username = tokenObj.userName;
        //     password = tokenObj.password;
        // }
        console.log('testestes');
        userModel.findByNameAndPassword(username,password).then(data=>{
            if(data){
                res.json({success:true,data:{token,userName:username},code:200,msg:null});
            }else{
                res.json({success:false,data:data,code:500,mag:'登陆失败'});
            }
        });
    },
    register: function(req, res, next) {
        console.log('params',req.body);
        console.log('testtest');
        var username = req.body.userName;  //统一接收前端的电话号，用户名，或者其他（多方式登录）
        var password = req.body.password;
        var gender = req.body.gender;
        var idCard = req.body.idCard;
        var userType = req.body.userType;
        token = setToken({userName:username,password});
        userModel.addUser(username,password,gender,idCard,userType).then(data=>{
            if(data){
                res.json({success:true,data:{token,userName:username},code:200,msg:'注册成功'});
            }else{
                res.json({success:false,data:data,code:500,mag:'注册失败'});
            }
        });
    }
}