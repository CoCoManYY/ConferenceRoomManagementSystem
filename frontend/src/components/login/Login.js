import React, {Component} from 'react';
import '../../style/login.less';
import {Form, Icon, Input, Button, Checkbox, message, Spin} from 'antd';

const FormItem = Form.Item;

class NormalLoginForm extends Component {
    state = {
        isLoding: false,
    };
    handleSubmit = (e) => {
        //阻止默认跳转
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.state.msg = values;

                //请求URL
                // const apiUrl = `/scb_sms-0.0.1-SNAPSHOT/sm/account/accountLogin`;
                const apiUrl = `sm/account/login`;

                //设置请求方式，请求头和请求内容
                var opts = {
                    // credentials: "include",
                    method: "POST",
                    body: JSON.stringify(values),
                    // body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                }

                //成功发送请求
                fetch(apiUrl, opts).then((response) => {
                    //请求没有正确响应
                    if (response.status !== 200) {
                        throw new Error('Fail to get response with status ' + response.status);
                    }
                    //请求体为JSON
                    response.json().then((responseJson) => {
                        //对JSON的解析
                        if (responseJson.code === 200) {
                            if (responseJson.data !== "" || responseJson.data !== null) {
                                message.success('login success!'); //成功信息
                                this.setState({
                                    isLoding: true,
                                });
                                    let responseDate = responseJson.data;
                                    // console.log(responseDate.employeeId);
                                    localStorage.setItem('employee',JSON.stringify(responseDate));
                                    // console.log(responseDate);
                                    let that = this;
                                    setTimeout(function () { //延迟进入
                                        console.log(that.props);
                                        //页面跳转
                                        that.props.history.push({pathname: '/app', state: values});
                                    }, 2000);

                                } else {
                                    message.error("no response!");
                                }
                            } else  if (responseJson.message !== "" || responseJson.message !== null) {
                                message.error(responseJson.message);
                            }
                    }).catch((error) => {
                        message.error("login failed!");
                    });
                }).catch((error) => {
                    message.error("login failed!");
                });
            }
        });
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            this.state.isLoding ? <Spin size="large" className="loading"/> :
                <div className="login">
                    <div className="login-form">
                        <div className="login-logo">
                            <div className="login-name">会议室管理系统</div>
                        </div>
                        <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                            <FormItem>
                                {getFieldDecorator('accountName', {
                                    rules: [{required: true, message: 'Please input userName!'}],
                                })(
                                    <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                           placeholder="account name"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('accountPassword', {
                                    rules: [{required: true, message: 'Please input password!'}],
                                })(
                                    <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                           placeholder="password"/>
                                )}
                            </FormItem>
                            <FormItem style={{marginBottom: '0'}}>
                                {getFieldDecorator('accountRemember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>remeber me</Checkbox>
                                )}
                                {/*<a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码?</a>*/}
                                <Button type="primary" htmlType="submit" className="login-form-button"
                                        style={{width: '100%'}}>
                                    Sign In
                                </Button>
                            </FormItem>
                        </Form>
                        {/*<a className="githubUrl" href="https://github.com/mooncoder1995"> </a>*/}
                    </div>
                </div>
        );
    }
}

const Login = Form.create()(NormalLoginForm);
export default Login;