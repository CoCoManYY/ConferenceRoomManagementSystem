import {
  Timeline,
  message,
  Drawer,
  Form,
  Input,
  Select,
  Button,
  TimePicker,
  Descriptions,
  Divider,
  Row,
  Col
} from "antd";
import React, { Component } from "react";
import moment from "moment";
import debounce from "lodash/debounce";

import { myFetch } from "../../../utils/networks";
import history from "../../common/history";
import { getQueryString } from "../../../utils/networks";
import BreadcrumbCustom from "../../common/BreadcrumbCustom";
import { canReserveStatusMap } from "../../../constant/allKindsOfMap";

// todo 会议室的详细信息显示、与会人员+邮箱
import "./index.less";

const { Option } = Select;
const { RangePicker } = TimePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 4
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 20
    }
  }
};
const colorMap = {
  0: "green",
  1: "green",
  2: "red",
  3: "red",
  4: "gray"
};

class Reserve extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 类似学校图书馆开放关闭时间
      timelineData: {
        8: {
          time: "8:00-9:00",
          status: 0
        },
        9: {
          time: "9:00-10:00",
          status: 0
        },
        10: {
          time: "10:00-11:00",
          status: 0
        },
        11: {
          time: "11:00-12:00",
          status: 0
        },
        12: {
          time: "12:00-13:00",
          status: 0
        },
        13: {
          time: "13:00-14:00",
          status: 0
        },
        14: {
          time: "14:00-15:00",
          status: 0
        },
        15: {
          time: "15:00-16:00",
          status: 0
        },
        16: {
          time: "16:00-17:00",
          status: 0
        },
        17: {
          time: "17:00-18:00",
          status: 0
        }
      },
      visible: false,
      conferenceRoomDetail: {},
      userList: []
    };
    this.onSearchChange = debounce(this.onSearchChange, 800);
  }
  reverseConferenceRoom = () => {
    console.log("reverseConferenceRoom");
    // 更新用户信息
    myFetch("http://localhost:9000/user/findAllUsersWithoutMyself", "get", {
      userId: localStorage.getItem("userId")
    }).then(
      responseJson => {
        //对JSON的解析
        if (responseJson.code === 200) {
          this.setState({
            visible: true,
            userList: responseJson.data
          });
        } else {
          message.error("获取用户信息失败");
        }
      },
      err => {
        message.error("获取用户信息失败");
      }
    );
  };

  initData = () => {
    const conferenceRoomId = getQueryString("conferenceRoomId");
    const timestamp = parseInt(getQueryString("timestamp"));
    myFetch(
      "http://localhost:9000/conferenceRoom/getConferenceRoomDetail",
      "get",
      {
        conferenceRoomId
      }
    ).then(
      responseJson => {
        //对JSON的解析
        if (responseJson.code === 200) {
          console.log("getDetail", responseJson.data);
          const timelineData = JSON.parse(
            JSON.stringify(this.state.timelineData)
          );
          (responseJson.data.conferenceRoomReserveLogs || []).forEach(log => {
            const startTime = moment(log.startTime);
            const endTime = moment(log.endTime);
            const hour = startTime.hour();
            if (moment(startTime).isSame(moment(timestamp), "day")) {
              if (log.status == 2) { 
                (timelineData[hour] || {}).status = 2;
              } else {
                if (
                  moment().valueOf() - startTime.valueOf() >= 15 * 60 * 1000 &&
                  moment().valueOf() < endTime.valueOf()
                ) {
                  (timelineData[hour] || {}).status = 1;
                } else {
                  (timelineData[hour] || {}).status = 3;
                }
              }
            }
          });
          // 过期情况处理
          (Object.keys(this.state.timelineData || {}) || []).forEach(key => {
            if (moment(timestamp).isBefore(moment(), "date")||((moment(timestamp).isSame(moment(), "date")&&(parseInt(key)+1)<=moment().hour()))) {
              (timelineData[key] || {}).status = 4;
            }
          });
          this.setState({
            //   calenderListData,
            conferenceRoomDetail: responseJson.data,
            timelineData
          });
        }
      },
      error => {
        message.error("获取会议室信息失败");
      }
    );
  };

  componentDidMount() {
    this.initData();
  }

  onClose = () => {
    this.setState({
      visible: false
    });
  };
  onSelectChange = () => {};
  onSearchChange = keywords => {
    myFetch("http://localhost:9000/user/searchUserInfo", "get", {
      userId: localStorage.getItem("userId"),
      keywords
    }).then(responseJson => {
      if (responseJson.code === 200) {
        console.log("getDetail", responseJson.data);
        this.setState({
          userList: responseJson.data
        });
      }
    });
  };

  disabledStartHoursHandle = () => {
    const disabledHours = [];
    const canSelectHours = Object.keys(this.state.timelineData);
    for (let i = 0; i < 24; i++) {
      if (canSelectHours.some(hour => hour == i)) continue;
      disabledHours.push(i);
    }
    return disabledHours;
  };

  disabledStartMinutesHandle = () => {
    const disabledMinutes = [];
    for (let i = 0; i < 60; i++) disabledMinutes.push(i);
    return disabledMinutes;
  };

  disabledStartSecondsHandle = () => {
    const disabledSeconds = [];
    for (let i = 0; i < 60; i++) disabledSeconds.push(i);
    return disabledSeconds;
  };

  disabledEndHoursHandle = () => {
    const disabledHours = [];
    const canSelectHours = Object.keys(this.state.timelineData);
    for (let i = 0; i < 24; i++) {
      if (canSelectHours.some(hour => hour == i)) continue;
      disabledHours.push(i);
    }
    return disabledHours;
  };

  disabledEndMinutesHandle = () => {
    const disabledMinutes = [];
    for (let i = 0; i < 60; i++) disabledMinutes.push(i);
    return disabledMinutes;
  };

  disabledEndSecondsHandle = () => {
    const disabledSeconds = [];
    for (let i = 0; i < 60; i++) disabledSeconds.push(i);
    return disabledSeconds;
  };

  compareToStartTime = (rule, value, callback) => {
    const { form } = this.props;
    console.log(
      'form.getFieldValue("startTime")',
      value,
      form.getFieldValue("startTime")
    );
    if (value.isAfter(form.getFieldValue("startTime"))) {
      callback();
    } else {
      callback("结束时间必须大于开始时间");
    }
  };

  handleFormSubmit = e => {
    const conferenceRoomId = getQueryString("conferenceRoomId");
    const timestamp = parseInt(getQueryString("timestamp"));
    //阻止默认跳转
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        myFetch(
          "http://localhost:9000/conferenceRoom/addConferenceRoomReserveLog",
          "post",
          {
            ...values,
            conferenceRoomId,
            userId: localStorage.getItem("userId")
          }
        ).then(responseJson => {
          if (responseJson.code == 200) {
            this.initData();
            message.success("预定成功");
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <BreadcrumbCustom paths={["首页", "会议室详情", "预定会议室"]} />
        <div className="formBody">
          <Timeline>
            
            {(Object.keys(this.state.timelineData || {}) || []).map(key => {
              const data = this.state.timelineData[key];
              return (
                <Timeline.Item color={colorMap[data.status]}>
                  <p> {data.time} </p>
                  <p>
                    
                    {data.status == 0 || data.status == 1 ? (
                      <a onClick={this.reverseConferenceRoom}>
                        
                        {canReserveStatusMap[data.status]}
                      </a>
                    ) : (
                      canReserveStatusMap[data.status]
                    )}
                  </p>
                </Timeline.Item>
              );
            })}
          </Timeline>
        </div>
        <Drawer
          title="预定信息填写"
          placement="right"
          width="50%"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Descriptions title="当前会议室信息" bordered>
            <Descriptions.Item label="会议室名称">
              
              {this.state.conferenceRoomDetail.houseNumber}
            </Descriptions.Item>
            <Descriptions.Item label="可容纳人数">
              
              {this.state.conferenceRoomDetail.containNum}人
            </Descriptions.Item>
            <Descriptions.Item label="是否有投影仪">
              
              {this.state.conferenceRoomDetail.hasProjector ? "是" : "否"}
            </Descriptions.Item>
            <Descriptions.Item label="是否支持远程会议">
              
              {this.state.conferenceRoomDetail.supportRemote ? "是" : "否"}
            </Descriptions.Item>
          </Descriptions>
          <Divider type="horizontal" />
          <Form
            {...formItemLayout}
            name="reserveInfo"
            initialValues={{}}
            onSubmit={this.handleFormSubmit}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="会议描述"
              name="description"
              rules={[
                {
                  required: true,
                  message: "请输入会议描述!"
                }
              ]}
            >
              {getFieldDecorator("description", {
                rules: [
                  {
                    type: "string",
                    required: true,
                    message: "请填写会议描述"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="开始时间" name="startTime">
              
              {getFieldDecorator("startTime", {
                rules: [
                  {
                    type: "object",
                    required: true,
                    message: "Please select time!"
                  }
                ],
                initialValue: moment("12:00:00", "HH:mm:ss").date(moment(parseInt(getQueryString("timestamp"))).date())
              })(
                <TimePicker
                  allowClear={false}
                  disabledHours={this.disabledStartHoursHandle}
                  disabledMinutes={this.disabledStartMinutesHandle}
                  disabledSeconds={this.disabledStartSecondsHandle}
                />
              )}
            </Form.Item>
            <Form.Item label="结束时间" name="endTime">
              
              {getFieldDecorator("endTime", {
                rules: [
                  {
                    type: "object",
                    required: true,
                    message: "Please confirm your password!"
                  },
                  {
                    validator: this.compareToStartTime
                  }
                ],
                initialValue: moment("12:00:00", "HH:mm:ss").date(moment(parseInt(getQueryString("timestamp"))).date())
              })(
                <TimePicker
                  allowClear={false}
                  disabledHours={this.disabledEndHoursHandle}
                  disabledMinutes={this.disabledEndMinutesHandle}
                  disabledSeconds={this.disabledEndSecondsHandle}
                />
              )}
            </Form.Item>
            <Form.Item label="与会人员 " name="conferees">
              
              {getFieldDecorator("conferees", {
                rules: [
                  {
                    required: true,
                    message: "请选择与会人员"
                  }
                ]
              })(
                <Select
                  placeholder="选择与会人员"
                  mode="multiple"
                  // onChange={this.onSelectChange}
                  onSearch={this.onSearchChange}
                  allowClear
                >
                  {(this.state.userList || []).map(user => (
                    <Option value={JSON.stringify(user)}>
                      
                      {user.username}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 4
              }}
            >
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    );
  }
}

const CurrentConferenceRoomsReserve = Form.create()(Reserve);
export default CurrentConferenceRoomsReserve;
