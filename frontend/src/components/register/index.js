import React, { Component } from "react";
import "./index.less";
import { myFetch } from "../../utils/networks";
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Radio,
  message,
  Spin
} from "antd";

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 24,
      offset: 0
    }
  }
};

class NormalRegisterForm extends Component {
  state = {
    isLoding: false
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], {
        force: true
      });
    }
    callback();
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("两次密码输入不一致!");
    } else {
      callback();
    }
  };
  validateIdCard = (rule, value, callback) => {
    const { form } = this.props;
    if (
      /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/.test(
        value
      )
    ) {
      callback();
    } else {
      callback("请输入正确格式的身份证号码");
    }
  };
  handleSubmit = e => {
    //阻止默认跳转
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.state.msg = values;
        myFetch(`http://localhost:9000/user/register`, "post", values).then(
          responseJson => {
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
                message.error(responseJson.msg);
              }
            } else if (
              responseJson.message !== "" ||
              responseJson.message !== null
            ) {
              message.error(responseJson.msg);
            }
          },
          error => {
            message.error('注册失败');
          }
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return this.state.isLoding ? (
      <Spin size="large" className="loading" />
    ) : (
      <div className="register">
        <div className="register-form">
          <div className="register-logo">
            <div className="register-name"> 会议室管理系统 </div>
          </div>
          <Form
            {...formItemLayout}
            onSubmit={this.handleSubmit}
            style={{
              maxWidth: "600px"
            }}
          >
            <FormItem label="用户名">
              {getFieldDecorator("userName", {
                rules: [
                  {
                    required: true,
                    message: "Please input userName!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon
                      type="user"
                      style={{
                        fontSize: 13
                      }}
                    />
                  }
                  placeholder="account name"
                />
              )}
            </FormItem>
            <Form.Item label="密码" hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="确认密码" hasFeedback>
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm your password!"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item label="E-mail">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="性别">
              {getFieldDecorator("gender", {
                rules: [
                  {
                    required: true,
                    message: "请选择性别"
                  }
                ]
              })(
                <Radio.Group>
                  <Radio value="m"> 男 </Radio> <Radio value="f"> 女 </Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label="身份证号">
              {getFieldDecorator("idCard", {
                rules: [
                  {
                    required: true,
                    message: "请输入正确的身份证号"
                  },
                  {
                    validator: this.validateIdCard
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="用户类别">
              {getFieldDecorator("userType", {
                rules: [
                  {
                    required: true,
                    message: "请选择用户类型"
                  }
                ]
              })(
                <Radio.Group>
                  <Radio value="student"> 学生 </Radio>
                  <Radio value="teacher"> 老师 </Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <FormItem
              {...tailFormItemLayout}
              style={{
                marginBottom: "0"
              }}
            >
              {/*<a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码?</a>*/}
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
                style={{
                  width: "100%"
                }}
              >
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

const Register = Form.create()(NormalRegisterForm);
export default Register;
 