import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout, Card, Row, Col, Divider,message} from 'antd';
import '../../style/index.less';

import SiderCustom from './SiderCustom';
import HeaderCustom from './HeaderCustom';
import {canReserveStatusMap} from '../../constant/conferenceRooms';
import MIndex from '../index/Index';
// import Echarts from '../chart/echarts/Echarts';
import CurrentConferenceRoomsInfo from '../form/CurrentConferenceRoomsInfo';
import CurrentConferenceRoomsDetail from '../form/CurrentConferenceRoomsDetail';
import CurrentConferenceRoomsReserve from '../form/CurrentConferenceRoomsReserve';

import AForm from '../form/AForm/AForm';
import DForm from '../form/DForm/DForm';
import EForm from '../form/EForm/EForm';
import PForm from '../form/PForm/PForm';
import RForm from '../form/RForm/RForm';
import PersonMsg from '../form/Person/PersonMsg';
import MeeManagement from '../meeting/Meeting';
import my from '../calendars/Calendar';
// import NtiCalendars from '../header/Calendars';
import noMatch from './404';

const {Content, Footer} = Layout;

export default class App extends Component {
    state = {
        collapsed: localStorage.getItem("mms_SiderCollapsed") === "true",
        conferenceRooms:[
            {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:1,canReserveStatus:0},
            {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:1,canReserveStatus:1},
            {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:1,canReserveStatus:2},
            {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:1,canReserveStatus:3},
            {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:0,canReserveStatus:3}
        ]
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        }, function () {
            localStorage.setItem("mms_SiderCollapsed", this.state.collapsed);
        });
    };
    getCurrentConferenceRoomsInfo = () => {
        //请求URL
        // const apiUrl = `/scb_sms-0.0.1-SNAPSHOT/sm/account/accountLogin`;
        const apiUrl = `http://localhost:9000/conferenceRoom/getCurrentConferenceRoomsInfo`;

        //设置请求方式，请求头和请求内容
        var opts = {
            // credentials: "include",
            method: "get",
            headers: {
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
                    const conferenceRoomsInfo = [];
                   console.log('getCurrentConferenceRoomsInfo',responseJson.data);
                   (responseJson.data||[]).forEach(data=>{
                        if((data.conferenceRoomReserveLogs||[]).length){
                            let canReserveStatus = 0;
                            const recentLog = data.conferenceRoomReserveLogs[data.conferenceRoomReserveLogs.length-1];
                            if(recentLog.status=='2') canReserveStatus = 2;
                            else if(recentLog.status=='0') {
                               if((new Date()).getTime() - (new Date(recentLog.startTime)).getTime()<=15*60*1000){
                                canReserveStatus=3;
                               }else{
                                canReserveStatus=1;
                               }
                            }
                           
                            conferenceRoomsInfo.push(Object.assign(data,{canReserveStatus}));
                        }else{
                            conferenceRoomsInfo.push(Object.assign(data,{canReserveStatus:0}))
                        }
                   });
                   console.log('conferenceRoomsInfos',conferenceRoomsInfo);
                   this.setState({conferenceRooms:conferenceRoomsInfo});
                }
            }).catch((error) => {
                message.error("获取会议室信息失败");
            });
        }).catch((error) => {
            message.error("获取会议室信息失败");
        });
    };
    componentDidMount() {
        //save Sider
        if (localStorage.getItem("mms_SiderCollapsed") === null) {
            localStorage.setItem("mms_SiderCollapsed", false);
        }
        this.getCurrentConferenceRoomsInfo();

        // var data = JSON.stringify(localStorage.getItem("employee"));
        // console.log(JSON.parse(data).menuTree[0]);
    }

    render() {
        const {collapsed} = this.state;
        const {location} = this.props;
        let userName;
        if (localStorage.getItem("employee") === null) {
            return <Redirect to="/login"/>
        } else {
            let userInfo = JSON.parse(localStorage.getItem("userInfo")||"{}");
            // console.log(JSONEmployee.employeeName);
        // employeeNickName = location.state === undefined ? JSONEmployee.employeeNickName : location.state.employeeNickName;
            userName = userInfo.userName;
        }


        return (
            <Layout className="ant-layout-has-sider" style={{minHeight: '100vh'}}>
                <SiderCustom collapsed={collapsed} path={location.pathname}/>
                <Layout>
                    <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={userName}/>
                    <Content style={{margin: '0 16px'}}>
                    <Switch>
                        <Route exact path={'/app'} component={CurrentConferenceRoomsInfo} />
                        <Route exact path={'/app/detail'} component={CurrentConferenceRoomsDetail} />
                        <Route exact path={'/app/detail/reserve'} component={CurrentConferenceRoomsReserve}/>
                        <Route exact path={'/app/account'} component={AForm} />
                        <Route exact path={'/app/department'} component={DForm} />
                        <Route exact path={'/app/employee'} component={EForm} />
                        <Route exact path={'/app/position'} component={PForm} />
                        <Route exact path={'/app/role'} component={PForm} />
                        <Route exact path={'/app/meeting'} component={MeeManagement} />
                        <Route exact path={'/app/personalInformation'} component={PersonMsg} />
                        <Route exact path={'/app/meetingSchedule'} component={MeeManagement} />
                        <Route exact path={'/app/calendar'} component={my} />

                        <Route component={noMatch} />
                    </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        ©2020 Created by cocoman
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
