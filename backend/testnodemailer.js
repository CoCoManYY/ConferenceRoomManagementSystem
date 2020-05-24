const nodemailer = require('nodemailer');
const moment = require('moment');
const getEmailHtml = require('./constant/email').getEmailHtml;

exports.sendEmail = (sendList, startTime, endTime, houseNumber, description, username) => {
    let transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
            user: '1344483030@qq.com',
            // 这里密码不是qq密码，是你设置的smtp授权码
            pass: 'rxqhenqzjarohgad',
        }
    });
    let mailOptions = {
        from: '1344483030@qq.com', // sender address
        to: sendList, // list of receivers
        subject: '你有一份会议邀请', // Subject line
        // 发送text或者html格式
        // text: 'Hello world?', // plain text body
        html: getEmailHtml(startTime, endTime, houseNumber, description, username)
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
    });
}