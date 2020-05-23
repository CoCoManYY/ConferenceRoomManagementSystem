import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout, Card, Row, Col, Divider,message} from 'antd';
import '../../style/index.less';

import SiderCustom from './SiderCustom';
import HeaderCustom from './HeaderCustom';
import {canReserveStatusMap} from '../../constant/allKindsOfMap';
import MIndex from '../index/Index';
// import Echarts from '../chart/echarts/Echarts';
import CurrentConferenceRoomsInfo from '../form/CurrentConferenceRoomsInfo';
import CurrentConferenceRoomsDetail from '../form/CurrentConferenceRoomsDetail';
import CurrentConferenceRoomsReserve from '../form/CurrentConferenceRoomsReserve';
import PersonalConferenceList from '../form/PersonalConferenceList';
import ConferenceRoomReserveLogDetail from '../form/ConferenceRoomReserveLogDetail';
import PersonalCenter from '../form/PersonalCenter';
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
    componentDidMount() {
        console.log('testtestprops',this.props);
        //save Sider
        if (localStorage.getItem("mms_SiderCollapsed") === null) {
            localStorage.setItem("mms_SiderCollapsed", false);
        }

        // var data = JSON.stringify(localStorage.getItem("employee"));
        // console.log(JSON.parse(data).menuTree[0]);
    }

    render() {
        const {collapsed} = this.state;
        const {location} = this.props;
        let userName;
        if (localStorage.getItem("authorizationToken") === null || localStorage.getItem("userId") === null) {
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
                    <Content style={{margin: '16px',height:'100%'}}>
                    <Switch>
                        <Route exact path={'/app'} component={CurrentConferenceRoomsInfo} />
                        <Route exact path={'/app/detail'} component={CurrentConferenceRoomsDetail} />
                        <Route exact path={'/app/detail/reserve'} component={CurrentConferenceRoomsReserve}/>
                        <Route exact path={'/app/personalCenter'} component={PersonalCenter}/>
                        <Route exact path={'/app/personalConferenceList'} component={PersonalConferenceList} />
                        <Route exact path={'/app/conferenceRoomReserveLogDetail'} component={ConferenceRoomReserveLogDetail} />
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
