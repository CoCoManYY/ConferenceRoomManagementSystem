import { Calendar, Badge, message, Descriptions, Alert } from "antd";
import React, { Component } from "react";
import BreadcrumbCustom from "../../common/BreadcrumbCustom";
import moment from "moment";
import history from "../../common/history";
import { getQueryString, myFetch } from "../../../utils/networks";
import "./index.less";
import "../form.less";
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
      conferenceRoomDetail: {}
    };
  }

  componentDidMount() {
    myFetch(
      "http://localhost:9000/conferenceRoom/getConferenceRoomDetail",
      "get",
      { conferenceRoomId }
    ).then(
      responseJson => {
        //对JSON的解析
        if (responseJson.code === 200) {
          console.log("getDetail", responseJson.data);
          const calenderListData = {};
          (responseJson.data.conferenceRoomReserveLogs || []).forEach(
            log => {
              // if (log.status != "1") {
              const startTime = new Date(log.startTime);
              const endTime = new Date(log.endTime);
              const month = startTime.getMonth();
              const day = startTime.getDate();
              const content = `${moment(startTime).format("HH:mm")}-${moment(
                endTime
              ).format("HH:mm")} 已预定`;
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
            // }
          );
          this.setState({
            calenderListData,
            conferenceRoomDetail: responseJson.data
          });
        }
      },
      error => {
        message.error("获取会议室信息失败");
      }
    );
  }

  getListData = value => {
    let month = value.month();
    let day = value.date();
    let listData;
    Object.keys(this.state.calenderListData || {}).forEach(mth => {
      if (mth == month) {
        Object.keys(this.state.calenderListData[mth] || {}).forEach(
          innerDay => {
            if (day == innerDay) {
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

  disabledDate = value => {
    return !(value.isSame(moment(),'day')||(value.isAfter(moment(),'day')&&value.isBefore(moment().add(7, 'days'),'day')));
  };
  selectHandle = val => {
    console.log("selectHandle", val.valueOf());
    const timestamp = val.valueOf();
    const month = val.month();
    const day = val.date();
    history.push(
      `/app/detail/reserve?conferenceRoomId=${conferenceRoomId}&month=${month}&day=${day}&timestamp=${timestamp}`
    );
  };

  render() {
    return (
      <div>
        <BreadcrumbCustom paths={["首页", "会议室详情"]} />

        <div className="formBody">
          <Descriptions title="会议室详细信息" bordered>
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
          <Alert
            className="notification"
            message={`注意：为了节约资源、方便管理，所有的会议只能提前7天预定~`}
            type="warning"
          />
          <Calendar
            dateCellRender={this.dateCellRender}
            onSelect={this.selectHandle}
            disabledDate={this.disabledDate}
          />
        </div>
      </div>
    );
  }
}
