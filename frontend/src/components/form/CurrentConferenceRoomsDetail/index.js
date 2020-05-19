import { Calendar, Badge, message, Descriptions } from "antd";
import React, { Component } from "react";
import BreadcrumbCustom from "../../common/BreadcrumbCustom";
import history from "../../common/history";
import { getQueryString } from "../../../utils/params";
import "./index.less";
import { calendarFormat } from "moment";
const conferenceRoomId = getQueryString("conferenceRoomId");
console.log("conferenceRoomId", conferenceRoomId);
export default class my extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calenderListData: {
        // month:{
        //     day:[]
        // }
      },
      conferenceRoomDetail:{}
    };
  }

  componentDidMount() {
    //请求URL
    // const apiUrl = `/scb_sms-0.0.1-SNAPSHOT/sm/account/accountLogin`;
    const apiUrl = `http://localhost:9000/conferenceRoom/getConferenceRoomDetail?conferenceRoomId=${conferenceRoomId}`;
    //设置请求方式，请求头和请求内容
    var opts = {
      // credentials: "include",
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("authorizationToken")
      }
    };
    //成功发送请求
    fetch(apiUrl, opts)
      .then(response => {
        //请求没有正确响应
        if (response.status !== 200) {
          if (response.status === 401) {
            history.push("/login");
          }
          throw new Error(
            "Fail to get response with status " + response.status
          );
        }
        //请求体为JSON
        response
          .json()
          .then(responseJson => {
            //对JSON的解析
            if (responseJson.code === 200) {
              console.log("getDetail", responseJson.data);
              const calenderListData = {};
              (responseJson.data.conferenceRoomReserveLogs || []).forEach(
                log => {
                  if (log.status != "1") {
                    const startTime = new Date(log.startTime);
                    const endTime = new Date(log.endTime);
                    const month = startTime.getMonth();
                    const day = startTime.getDate();
                    const content = `${startTime.toLocaleTimeString()}-${endTime.toLocaleTimeString()} 已预定`;
                    if (!calenderListData[month]) {
                      calenderListData[month] = {};
                    }
                    if (!calenderListData[month][day]) {
                      calenderListData[month][day] = [];
                    }
                    calenderListData[month][day].push({
                      type: "success",
                      content
                    });
                  }
                }
              );
              this.setState({ calenderListData,conferenceRoomDetail:responseJson.data});
            }
          })
          .catch(error => {
            message.error("获取会议室信息失败");
          });
      })
      .catch(error => {
        message.error("获取会议室信息失败");
      });
  }

  getListData = value => {
    let month = value.month();
    let day = value.date();
    // let b = 4;
    // let a = 8;
    // let c = 12;
    let listData;
    console.log("getListDatamth", month, day, this.state.calenderListData);
    Object.keys(this.state.calenderListData || {}).forEach(mth => {
      console.log("month", mth);
      if (mth == month) {
        Object.keys(this.state.calenderListData[mth] || {}).forEach(
          innerDay => {
            console.log("day", innerDay);
            if (day == innerDay) {
              console.log(
                "this.state.calenderListData[month][day]",
                this.state.calenderListData[month][day]
              );
              listData = this.state.calenderListData[month][day];
            }
          }
        );
      }
    });
    return listData || [];
  };

  dateCellRender = value => {
    const listData = this.getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  monthCellRender = value => {
    const num = this.getMonthData(value);
    // console.log(value.month());
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  disabledDate = value => {
    return !(
      value.date() >= new Date().getDate() &&
      value.date() < new Date().getDate() + 7
    );
  };
  selectHandle = val => {
    console.log("selectHandle", val._d.getMonth(), val._d.getDate());
    const month = val._d.getMonth();
    const day = val._d.getDate();
    history.push(
      `/app/detail/reserve?conferenceRoomId=${conferenceRoomId}&month=${month}&day=${day}`
    );
  };

  render() {
    return (
      <div>
        <BreadcrumbCustom paths={["首页", "会议室详情"]} />
        
        <div className="formBody">
        <Descriptions title="会议室详细信息" bordered>
          <Descriptions.Item label="会议室名称">{this.state.conferenceRoomDetail.houseNumber}</Descriptions.Item>
          <Descriptions.Item label="可容纳人数">{this.state.conferenceRoomDetail.containNum}人</Descriptions.Item>
          <Descriptions.Item label="是否有投影仪">{this.state.conferenceRoomDetail.hasProjector?"是":"否"}</Descriptions.Item>
          <Descriptions.Item label="是否支持远程会议">{this.state.conferenceRoomDetail.supportRemote?"是":"否"}</Descriptions.Item>
        </Descriptions>
        {/* <div>预定情况：</div> */}
          <Calendar
            dateCellRender={this.dateCellRender}
            monthCellRender={this.monthCellRender}
            onSelect={this.selectHandle}
            disabledDate={this.disabledDate}
          />
        </div>
      </div>
    );
  }
}
