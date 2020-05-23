import { Calendar, Badge, message, Descriptions, List, Avatar } from "antd";
import React, { Component } from "react";
import moment from "moment";
import BreadcrumbCustom from "../../common/BreadcrumbCustom";
import { userStateMap } from '../../../constant/allKindsOfMap';
import { getQueryString, myFetch } from "../../../utils/networks";
import "./index.less";
import { calendarFormat } from "moment";

export default class my extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calenderListData: {
        // month:{
        //     day:[]
        // }
      },
      conferenceRoomReserveLogDetail: {}
    };
  }

  componentDidMount() {
    const conferenceRoomReserveLogId = getQueryString("conferenceRoomReserveLogId");
    myFetch(
      "http://localhost:9000/conferenceRoom/getConferenceReserveLogDetail",
      "get",
      { conferenceRoomReserveLogId }
    ).then(
      responseJson => {
        //对JSON的解析
        if (responseJson.code === 200) {
          console.log("getDetail", responseJson.data);
          this.setState({ conferenceRoomReserveLogDetail: responseJson.data });
        }
      },
      error => {
        message.error("获取会议信息失败");
      }
    );
  }

  render() {
    return (
      <div>
        <BreadcrumbCustom paths={["首页", "个人会议列表","会议详情"]} />
        <div className="formBody">
          <Descriptions title="会议详细信息" bordered>
            <Descriptions.Item label="会议室名称">
              {
                (this.state.conferenceRoomReserveLogDetail.conferenceRoom || {})
                  .houseNumber
              }
            </Descriptions.Item>
            <Descriptions.Item label="会议描述" span={2}>
              {this.state.conferenceRoomReserveLogDetail.description}
            </Descriptions.Item>
            <Descriptions.Item label="开始时间">
              {moment(
                this.state.conferenceRoomReserveLogDetail.startTime
              ).format("YYYY.MM.DD HH:mm")}
            </Descriptions.Item>
            <Descriptions.Item label="结束时间">
              {moment(this.state.conferenceRoomReserveLogDetail.endTime).format(
                "YYYY.MM.DD HH:mm"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="会议组织者">
              {(this.state.conferenceRoomReserveLogDetail.conferenceOrganizer||{}).username}
            </Descriptions.Item>
            <Descriptions.Item label="可容纳人数">
              {
                (this.state.conferenceRoomReserveLogDetail.conferenceRoom || {})
                  .containNum
              }
              人
            </Descriptions.Item>
            <Descriptions.Item label="是否有投影仪">
              {(this.state.conferenceRoomReserveLogDetail.conferenceRoom || {})
                .hasProjector
                ? "是"
                : "否"}
            </Descriptions.Item>
            <Descriptions.Item label="是否支持远程会议">
              {(this.state.conferenceRoomReserveLogDetail.conferenceRoom || {})
                .supportRemote
                ? "是"
                : "否"}
            </Descriptions.Item>
            <Descriptions.Item label="与会人员">
              <List
                itemLayout="horizontal"
                dataSource={this.state.conferenceRoomReserveLogDetail.conferees||[]}
                renderItem={item => (
                  <List.Item 
                    // actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                  >
                    <List.Item.Meta
                        avatar={
                            <Avatar  icon="user" />
                        }
                      title={<a href="https://ant.design">{(item.user||{}).username}</a>}
                      description={(item.user||{}).email}
                    />
                    <div>{userStateMap[item.status]}</div>
                  </List.Item>
                )}
              />
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    );
  }
}
