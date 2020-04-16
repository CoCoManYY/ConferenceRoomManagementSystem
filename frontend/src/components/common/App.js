import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import '../../style/index.less';

import SiderCustom from './SiderCustom';
import HeaderCustom from './HeaderCustom';
import MIndex from '../index/Index';
// import Echarts from '../chart/echarts/Echarts';
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
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        }, function () {
            localStorage.setItem("mms_SiderCollapsed", this.state.collapsed);
        });
    };

    componentDidMount() {
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
        let employeeNickName;
        if (localStorage.getItem("employee") === null) {
            return <Redirect to="/login"/>
        } else {
            var employee = localStorage.getItem("employee");
            var JSONEmployee = JSON.parse(employee);
            // console.log(JSONEmployee.employeeName);
        // employeeNickName = location.state === undefined ? JSONEmployee.employeeNickName : location.state.employeeNickName;
            employeeNickName = JSONEmployee.employeeNickname;
        }


        return (
            <Layout className="ant-layout-has-sider" style={{minHeight: '100vh'}}>
                <SiderCustom collapsed={collapsed} path={location.pathname}/>
                <Layout>
                    <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={employeeNickName}/>
                    <Content style={{margin: '0 16px'}}>
                        <Switch>
                            <Route exact path={'/app'} component={MIndex} />
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
                        SCB_SMS ©2018 Created by syx
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
