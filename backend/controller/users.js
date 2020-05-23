/*  */// var User = require('../models').User
var Until = require('./util')  //同级目录下
var userModel = require('../models/user');
var checkToken = require('./util').checkToken;
var setToken = require('./util').setToken;
module.exports = {
    findAllUsersWithoutMyself: function(req, res, next) {
        var userId = req.query.userId; 
        console.log('userId',userId);
        userModel.findAllUsersWithoutMyself(0,10,userId).then(data=>{
            if(data){
                res.json({success:true,data,code:200,msg:null});
            }else{
                res.json({success:false,data:[],code:500,msg:'用户信息获取失败'});
            }
        });
    },
    searchUserInfo: function (req, res, next) {
        console.log('params', req.body);
        var userId = req.query.userId; 
        var keywords = req.query.keywords || '';
        userModel.searchUserInfo(0,10,keywords,userId).then((data) => {
            if (data) {
                res.json({
                    success: true,
                    data,
                    code: 200,
                    msg: null
                });
            } else {
                res.json({
                    success: false,
                    data,
                    code: 500,
                    msg: "未查到数据"
                });
            }

        }, (err) => {
            console.log('err' + err);
        });
    },
    login: function(req, res, next) {
        var username = req.body.userName; 
        var password = req.body.password;
        var token = setToken({userName:username,password});
        userModel.findByNameAndPassword(username,password).then(data=>{
            if(data){
                res.json({success:true,data:{token,userName:username,userId:data.id},code:200,msg:null});
            }else{
                res.json({success:false,data:data,code:500,msg:'登陆失败'});
            }
        });
    },
    register: function(req, res, next) {
        var username = req.body.userName; 
        var password = req.body.password;
        var email = req.body.email;
        var gender = req.body.gender;
        var idCard = req.body.idCard;
        var userType = req.body.userType;
        token = setToken({userName:username,password});
        userModel.addUser(username,password,email,gender,idCard,userType).then(data=>{
            if(data){
                res.json({success:true,data:{token,userName:username,userId:data.id},code:200,msg:'注册成功'});
            }else{
                res.json({success:false,data:data,code:500,msg:'注册失败'});
            }
        });
    },
    getUserInfo:function(req, res, next) {
        console.log('params',req.query);
        var userId = req.query.userId;
        userModel.findByUserId(userId).then(data=>{
            if(data){
                res.json({success:true,data,code:200,msg:'查找用户成功'});
            }else{
                res.json({success:false,data:data,code:500,msg:'查找用户失败'});
            }
        });
    },
    modifyPassword:function(req, res, next) {
        var oldPassword = req.body.oldPassword;
        var password = req.body.password;
        var userId = req.body.userId;
        userModel.findPasswordByUserId(userId).then(data=>{
            if(data.password== oldPassword){
                userModel.updatePassword(userId,password).then(data=>{
                    if(data){
                        res.json({success:false,data:{},code:200,msg:'修改密码成功'});
                    }else{
                        res.json({success:false,data:{},code:500,msg:'修改密码失败'});
                    }
                })
            }else{
                res.json({success:false,data:{},code:500,msg:'旧密码填写错误，请重新填写'});
            }
        });
    },
}