var User = require('../models').User
var Until = require('./until')  //同级目录下
module.exports = {
    login: function(req, res, next) {
        var username = req.body.username;  //统一接收前端的电话号，用户名，或者其他（多方式登录）
        var password = req.body.password;
        var param={
            $or:{   //$or  sequelize提供的 或者查询
                phone:username,
                id_card:username
            },
            password:password
        }
        User.findOne({where:param}).then(r=>{
            res.send(Until.setResult(200,'success', Until.setToken(r)))
        }).catch(err=>{
            res.send(Until.setResult(500,'error',err))
        })
    }
}