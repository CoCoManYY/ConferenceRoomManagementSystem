import React, {Component} from 'react';
import { Card, Row, Col,message, Pagination } from 'antd';
import history from '../../common/history';
import './index.less';

import {canReserveStatusMap} from '../../../constant/conferenceRooms';
export default class App extends Component {
    constructor(props){
        super(props);
        this. state = {
            current:1,
            pageSize:9,
            total:10,
            conferenceRooms:[
                // {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:1,canReserveStatus:0},
                // {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:1,canReserveStatus:1},
                // {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:1,canReserveStatus:2},
                // {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:1,canReserveStatus:3},
                // {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:0,canReserveStatus:3}
            ]
        };
    }
   
    getCurrentConferenceRoomsInfo = (page) => {
        //请求URL
        // const apiUrl = `/scb_sms-0.0.1-SNAPSHOT/sm/account/accountLogin`;
        const apiUrl = `http://localhost:9000/conferenceRoom/getConferenceRoomsInfo?pageIndex=${page}&pageSize=${this.state.pageSize}`;

        //设置请求方式，请求头和请求内容
        var opts = {
            // credentials: "include",
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('authorizationToken')
            }
        }

        //成功发送请求
        fetch(apiUrl, opts).then((response) => {
            //请求没有正确响应
            if (response.status !== 200) {
                if(response.status === 401){
                    history.push('/login');
                }
                throw new Error('Fail to get response with status ' + response.status);
            }
            //请求体为JSON
            response.json().then((responseJson) => {
                //对JSON的解析
                if (responseJson.code === 200) {
                   this.setState({conferenceRooms:responseJson.data.rows,total:responseJson.data.count});
                }
            }).catch((error) => {
                message.error("获取会议室信息失败");
            });
        }).catch((error) => {
            message.error("获取会议室信息失败");
        });
    };

    onPaginationChange = (page)=>{
        console.log('onPaginationChange',page);
        this.getCurrentConferenceRoomsInfo(page-1);
    }
    componentDidMount() {
        console.log('tetetetetete');
        this.getCurrentConferenceRoomsInfo(0);
    }

    render() {
        return (
            <div>
            <Row gutter={8}>
            {
                this.state.conferenceRooms.map(room=>( 
                    <Col className="gutter-row" span={6}>
                        <Card 
                            title={room.houseNumber} 
                            // extra={(room.canReserveStatus==0||room.canReserveStatus==1)?<a href={`app/detail?conferenceRoomId=${room.id}`} >{canReserveStatusMap[room.canReserveStatus]}</a>:<span>{canReserveStatusMap[room.canReserveStatus]}</span>} style={{ width: 300,margin:'8px' }}
                            extra={<a href={`app/detail?conferenceRoomId=${room.id}`} >查看详情</a>}
                            style={{ width: 300,margin:'8px' }}
                        >
                            <p>可容纳{room.containNum}人</p>
                            <p>{room.hasProjector?'有':"无"}投影仪</p>
                            <p>{room.supportRemote?'可':'不可'}远程连线</p>
                        </Card>
                    </Col>)
                )
            }
            </Row>
            <div>
            <Pagination style={{ width: '300px', float: 'right'}} simple defaultCurrent={this.state.current} pageSize={this.state.pageSize} total={this.state.total} onChange={this.onPaginationChange}/>
            </div>
            
            </div>
        );
    }
}
