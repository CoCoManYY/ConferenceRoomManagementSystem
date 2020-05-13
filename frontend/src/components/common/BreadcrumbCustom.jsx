import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'

import {getQueryString} from '../../utils/params';

const conferenceRoomId = getQueryString('conferenceRoomId')||'';
export default class BreadcrumbCustom extends Component{
    Breadcrumbs(){
        const { paths } = this.props;
        let v = paths.map(function(item,index){
            let innerContent = item;
            if(item==="首页") innerContent = <Link to={"/app"}>{item}</Link>;
            if(item==="会议室详情") innerContent = <Link to={`/app/detail?conferenceRoomId=${conferenceRoomId}`}>{item}</Link>;
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