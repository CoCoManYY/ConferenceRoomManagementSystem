import React, { Component } from "react";
import "../../style/login.less";
import {myFetch} from '../../utils/networks';
import { Form, Icon, Input, Button, Checkbox, message, Spin } from "antd";

const FormItem = Form.Item;

class NormalLoginForm extends Component {
  state = {
    isLoding: false
  };
  handleSubmit = e => {
    //阻止默认跳转
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.state.msg = values;
        myFetch(`http://localhost:9000/user/login`,'post',values).then(responseJson => {
          //对JSON的解析
          if (responseJson.code === 200) {
            console.log("responseJson", responseJson);
            if (responseJson.data !== "" || responseJson.data !== null) {
              message.success("login success!"); //成功信息
              this.setState({
                isLoding: true
              });
              let responseDate = responseJson.data;
              // console.log(responseDate.employeeId);
              localStorage.setItem(
                "authorizationToken",
                responseDate.token
              );
              localStorage.setItem("userInfo", JSON.stringify(responseDate));
              localStorage.setItem("userId", responseDate.userId);
              // console.log(responseDate);
              let that = this;
              setTimeout(function() {
                //延迟进入
                console.log(that.props);
                //页面跳转
                that.props.history.push({
                  pathname: "/app",
                  state: values
                });
              }, 2000);
            } else {
              message.error("no response!");
            }
          } else if (
            responseJson.message !== "" ||
            responseJson.message !== null
          ) {
            message.error('登陆失败');
          }
        },error => {
          message.error("login failed!");
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return this.state.isLoding ? (
      <Spin size="large" className="loading" />
    ) : (
      <div className="login">
        <div className="login-form">
          <div className="login-logo">
            <div className="login-name">会议室管理系统</div>
          </div>
          <Form onSubmit={this.handleSubmit} style={{ maxWidth: "300px" }}>
            <FormItem>
              {getFieldDecorator("userName", {
                rules: [{ required: true, message: "Please input userName!" }]
              })(
                <Input
                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                  placeholder="account name"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "Please input password!" }]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  type="password"
                  placeholder="password"
                />
              )}
            </FormItem>
            <FormItem style={{ marginBottom: "0" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%" }}
              >
                Login In
              </Button>
          Or <a href="/register">register now!</a>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const Login = Form.create()(NormalLoginForm);
export default Login;
