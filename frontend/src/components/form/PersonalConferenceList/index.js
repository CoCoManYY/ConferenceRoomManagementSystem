import React, { Component } from "react";
import { Table, Divider, Tag, message, Tabs } from "antd";
import moment from "moment";
import history from "../../common/history";
import { myFetch, getQueryString } from "../../../utils/networks";
import { personalConferenceTypeMap } from "../../../constant/allKindsOfMap";
import BreadcrumbCustom from "../../common/BreadcrumbCustom";
// import ECustomizedForm from '../EForm/ECustomizedForm';

const { TabPane } = Tabs;

class PersonalConferenceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabsActiveKey: getQueryString("activeKey") || "1",
      pageSize: 10,
      totalPage: 1,
      current: 1,
      columns: [
        {
          title: "会议室名称",
          dataIndex: "conferenceRoom.houseNumber",
          key: "houseNumber",
          render: text => <a>{text}</a>
        },
        {
          title: "会议组织者",
          dataIndex: "conferenceOrganizer.username",
          key: "username"
        },
        {
          title: "描述",
          dataIndex: "description",
          key: "description"
        },
        {
          title: "开始时间",
          dataIndex: "startTime",
          key: "startTime"
        },
        {
          title: "结束时间",
          dataIndex: "endTime",
          key: "endTime"
        },
        {
          title: "与会人员",
          key: "conferees",
          dataIndex: "conferees",
          render: conferees => (
            <span>
              {Array.isArray(conferees) && conferees.length > 0
                ? conferees.map((conferee, index) => {
                    return (
                      <Tag color="green" key={index}>
                        {(conferee.user || {}).username}
                      </Tag>
                    );
                  })
                : "无"}
            </span>
          )
        },
        {
          title: "操作",
          key: "action",
          render: (text, record) => {
            const viewDetail = (
              <a
                onClick={() => {
                  history.push(
                    `/app/conferenceRoomReserveLogDetail?conferenceRoomReserveLogId=${record.conferenceRoomReserveLogId}`
                  );
                }}
              >
                查看详情
              </a>
            );
            if (record.type == 1) {
              return (
                <span>
                  {viewDetail}
                  <Divider type="vertical" />
                  <a
                    onClick={() => {
                      this.cancelReserve(record.conferenceRoomReserveLogId);
                    }}
                  >
                    取消预订
                  </a>
                </span>
              );
            } else if (record.type == 2) {
              return <span>{viewDetail}</span>;
            } else {
              return (
                <span>
                  {viewDetail}
                  <Divider type="vertical" />
                  <a
                    onClick={() => {
                      (record.conferees || []).forEach(conferee => {
                        if (conferee.userId == localStorage.getItem("userId")) {
                          console.log("命中", conferee);
                          this.changeConfereeStatus(conferee.id, 1);
                        }
                      });
                    }}
                  >
                    接受
                  </a>
                  <Divider type="vertical" />
                  <a
                    onClick={() => {
                      (record.conferees || []).forEach(conferee => {
                        if (conferee.userId == localStorage.getItem("userId")) {
                          console.log("命中", conferee);
                          this.changeConfereeStatus(conferee.id, 2);
                        }
                      });
                    }}
                  >
                    拒绝
                  </a>
                </span>
              );
            }
          }
        }
      ],

      tableDataSource: [
        {
          startTime: "11",
          endTime: "22",
          description: "description",
          conferenceRoom: { houseNumber: "jijijijiji" },
          conferees: [{ userId: 11 }, { userId: 22 }]
        }
      ]
    };
  }
  tabsChangeHandle = activeKey => {
    console.log("tabsChangeHandle", activeKey);
    this.setState({ tabsActiveKey: activeKey, current: 1 });
    this.initData(activeKey, this.state.current - 1);
  };

  cancelReserve = conferenceRoomReserveLogId => {
    myFetch(
      "http://localhost:9000/conferenceRoomReserveLog/cancelConferenceRoomReserve",
      "post",
      { conferenceRoomReserveLogId }
    ).then(
      responseJson => {
        //对JSON的解析
        if (responseJson.code === 200) {
          message.success(responseJson.msg);
          this.initData(this.state.tabsActiveKey, 0);
        } else {
          message.error(responseJson.msg);
        }
      },
      err => {
        message.error("会议预定取消失败");
      }
    );
  };

  changeConfereeStatus = (confereeId, type) => {
    myFetch("http://localhost:9000/conferee/changeConfereeStatus", "post", {
      confereeId,
      type
    }).then(
      responseJson => {
        //对JSON的解析
        if (responseJson.code === 200) {
          console.log("modifyPassword", responseJson.data);
          message.success(responseJson.msg);
          this.initData(this.state.tabsActiveKey, 0);
        } else {
          message.error(responseJson.msg);
        }
      },
      err => {
        message.error("修改用户状态失败");
      }
    );
  };

  initData = (type, page) => {
    myFetch(personalConferenceTypeMap[type].url, "get", {
      ...personalConferenceTypeMap[type].params,
      pageIndex: page,
      pageSize: this.state.pageSize
    }).then(
      responseJson => {
        if (responseJson.code === 200) {
          if (type == 1) {
            (responseJson.data.rows || []).forEach(item => {
              item.startTime = moment(item.startTime).format(
                "YYYY.MM.DD HH:mm"
              );
              item.endTime = moment(item.endTime).format("YYYY.MM.DD HH:mm");
              item.type = type;
              item.conferenceRoomReserveLogId = item.id;
            });
            this.setState({
              tableDataSource: responseJson.data.rows,
              totalPage: responseJson.data.count
            });
          } else {
            const tableDataSource = [];
            (responseJson.data.rows || []).forEach(item => {
              const result = {};
              result.startTime = moment(
                item.conferenceRoomReserveLog.startTime
              ).format("YYYY.MM.DD HH:mm");
              result.endTime = moment(
                item.conferenceRoomReserveLog.endTime
              ).format("YYYY.MM.DD HH:mm");
              if (item.conferenceRoomReserveLog) {
                result.description = item.conferenceRoomReserveLog.description;
                result.conferees = item.conferenceRoomReserveLog.conferees;
                result.conferenceRoomReserveLogId =
                  item.conferenceRoomReserveLog.id;
                result.conferenceOrganizer =
                  item.conferenceRoomReserveLog.conferenceOrganizer;
              }
              result.conferenceRoom = item.conferenceRoom;
              result.type = type;
              tableDataSource.push(result);
            });
            this.setState({
              tableDataSource,
              totalPage: responseJson.data.count
            });
          }
        }
      },
      err => {
        message.error("获取数据失败");
      }
    );
  };
  tableChangeHandle = (prop, type) => {
    this.initData(type, prop[0].current - 1);
    this.setState({ current: prop[0].current });
  };

  //渲染
  componentDidMount() {
    this.initData(this.state.tabsActiveKey, this.state.current - 1);
  }

  render() {
    return (
      <div style={{ height: "100%", background: "#ffffff" }}>
        <Tabs
          activeKey={this.state.tabsActiveKey}
          onChange={this.tabsChangeHandle}
        >
          <TabPane tab="已组织会议" key="1">
            <Table
              columns={this.state.columns}
              dataSource={this.state.tableDataSource}
              onChange={(...props) => this.tableChangeHandle(props, 1)}
              pagination={{
                pageSize: this.state.pageSize,
                total: this.state.totalPage,
                current: this.state.current
              }}
            />
          </TabPane>
          <TabPane tab="已接受会议" key="2">
            <Table
              columns={this.state.columns}
              dataSource={this.state.tableDataSource}
              onChange={(...props) => this.tableChangeHandle(props, 2)}
              pagination={{
                pageSize: this.state.pageSize,
                total: this.state.totalPage,
                current: this.state.current
              }}
            />
          </TabPane>
          <TabPane tab="未处理会议邀请" key="3">
            <Table
              columns={this.state.columns}
              dataSource={this.state.tableDataSource}
              onChange={(...props) => this.tableChangeHandle(props, 3)}
              pagination={{
                pageSize: this.state.pageSize,
                total: this.state.totalPage,
                current: this.state.current
              }}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
//

export default PersonalConferenceList;
