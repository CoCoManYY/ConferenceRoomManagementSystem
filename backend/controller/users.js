/*  */// var User = require('../models').User
var Until = require('./util')  //同级目录下
var userModel = require('../models/user');
var checkToken = require('./util').checkToken;
var setToken = require('./util').setToken;
module.exports = {
    login: function(req, res, next) {
        var username = req.body.userName; 
        var password = req.body.password;
        var token = setToken({userName:username,password});
        userModel.findByNameAndPassword(username,password).then(data=>{
            if(data){
                res.json({success:true,data:{token,userName:username},code:200,msg:null});
            }else{
                res.json({success:false,data:data,code:500,mag:'登陆失败'});
            }
        });
    },
    register: function(req, res, next) {
        var username = req.body.userName; 
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