import React, { Component } from "react";
import {
  Form,
  Select,
  Input,
  Button,
  message,
  Descriptions,
  Spin,
  Drawer
} from "antd";

import history from "../../common/history";
import { myFetch } from '../../../utils/networks';
import BreadcrumbCustom from "../../common/BreadcrumbCustom";
// import ECustomizedForm from '../EForm/ECustomizedForm';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
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

class PersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // dataSource: [],
      userInfo: {},
      loading: true,
      drawerVisible: false
    };
  }
  //getData
  getData = () => {
    //请求URL
    // const apiUrl = `/scb_sms-0.0.1-SNAPSHOT/sm/account/accountLogin`
    myFetch('http://localhost:9000/user/getUserInfo','get',{userId:localStorage.getItem("userId")}).then(responseJson=>{
      //对JSON的解析
      if (responseJson.code === 200) {
        const conferenceRoomsInfo = [];
        console.log("getDetail", responseJson.data);
        this.setState({
          userInfo: responseJson.data,
          loading: false
        });
      }
    },error => {
      message.error("获取个人信息失败");
    });
   
  };
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
    }
    callback();
};
compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
        callback('两次密码输入不一致!');
    } else {
        callback();
    }
};

  modifyPassword = () => {
    this.setState({ drawerVisible: true });
  };

  onDrawerClose = () => {
    this.setState({ drawerVisible: false });
  };

  handleSubmitModifyPassword = () => {
    this.props.form.validateFields((err, values) => {
      if(!err){
        myFetch('http://localhost:9000/user/modifyPassword','post',{...values, userId:localStorage.getItem("userId")}).then(
          (responseJson) => {
            //对JSON的解析
            if (responseJson.code === 200) {
                const conferenceRoomsInfo = [];
                console.log('modifyPassword',responseJson.data);
                message.success(responseJson.msg);
                this.setState({drawerVisible:false});
                localStorage.removeItem("authorizationToken");
                localStorage.removeItem("userId");
                localStorage.removeItem("userInfo");
                history.push('/login');
            } else{
              message.error(responseJson.msg);
            }
        },(error) => {
          message.error("密码修改失败");
      }
        )
      
      }
    })
  };

  //渲染
  componentDidMount() {
    //获取数据
    this.getData();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return this.state.loading ? (
      <Spin size="large" className="loading" />
    ) : (
      <div>
        <BreadcrumbCustom paths={["首页", "个人中心"]} />

        <div className="formBody">
          <Descriptions
            title="个人信息"
            // bordered
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="姓名" span={3}>
              {this.state.userInfo.username}
            </Descriptions.Item>
            <Descriptions.Item label="性别" span={3}>
              {this.state.userInfo.gender == "f" ? "女" : "男"}
            </Descriptions.Item>
            <Descriptions.Item label="用户类型" span={3}>
              {this.state.userInfo.usertype == "student" ? "学生" : "教师"}
            </Descriptions.Item>
            <Descriptions.Item label="电子邮箱" span={3}>
              {this.state.userInfo.email}
            </Descriptions.Item>
            <Descriptions.Item label="身份证证号" span={3}>
              {this.state.userInfo.idcard}
            </Descriptions.Item>
          </Descriptions>
          <Button type="primary" onClick={this.modifyPassword}>
            修改密码
          </Button>
        </div>
        <Drawer
          title="修改密码"
          width="50%"
          placement="right"
          closable={false}
          onClose={this.onDrawerClose}
          visible={this.state.drawerVisible}
        >
          <Form
            {...formItemLayout}
            onSubmit={this.handleSubmit}
            style={{ maxWidth: "600px" }}
          >
            <Form.Item label="旧密码" hasFeedback>
              {getFieldDecorator("oldPassword", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="新密码" hasFeedback>
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
            <Form.Item label="确认新密码" hasFeedback>
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
            <FormItem {...tailFormItemLayout} style={{ marginBottom: "0" }}>
              {/*<a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码?</a>*/}
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                onClick={this.handleSubmitModifyPassword}
              >
                 确认修改
              </Button>
            </FormItem>
          </Form>
        </Drawer>
      </div>
    );
  }
}
//
const PersonalCenter = Form.create()(PersonForm);

export default PersonalCenter;
