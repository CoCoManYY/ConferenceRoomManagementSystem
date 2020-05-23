import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'

import {getQueryString} from '../../utils/networks';

const conferenceRoomId = getQueryString('conferenceRoomId')||'';

const urlNameMap ={
    "首页":"/app",
    "会议室详情":`/app/detail?conferenceRoomId=${conferenceRoomId}`,
    "个人会议列表":'/app/personalConferenceList'
}
export default class BreadcrumbCustom extends Component{
    Breadcrumbs(){
        const { paths } = this.props;
        let v = paths.map(function(item,index){
            let innerContent = item;
            if(urlNameMap[item]) innerContent = <Link to={urlNameMap[item]}>{item}</Link>;
            return (
                <Breadcrumb.Item key="item">
                   {innerContent}
                </Breadcrumb.Item>
            )
        });
        return v;
    }

    render(){
        return(
            <Breadcrumb style={{ margin: '12px 0' }}>
                {this.Breadcrumbs()}
            </Breadcrumb>
        )
    }
} 