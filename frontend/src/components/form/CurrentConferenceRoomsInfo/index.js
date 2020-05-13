import React, {Component} from 'react';
import { Card, Row, Col,message} from 'antd';
import './index.less';

import {canReserveStatusMap} from '../../../constant/conferenceRooms';
export default class App extends Component {
    state = {
        conferenceRooms:[
            {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:1,canReserveStatus:0},
            {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:1,canReserveStatus:1},
            {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:1,canReserveStatus:2},
            {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:1,canReserveStatus:3},
            {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:0,canReserveStatus:3}
        ]
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
        this.getCurrentConferenceRoomsInfo();
    }

    render() {
        return (
            <Row gutter={8}>
            {
                this.state.conferenceRooms.map(room=>( 
                    <Col className="gutter-row" span={6}>
                        <Card 
                            title={room.houseNumber} 
                            extra={(room.canReserveStatus==0||room.canReserveStatus==1)?<a href={`app/detail?conferenceRoomId=${room.id}`} >{canReserveStatusMap[room.canReserveStatus]}</a>:<span>{canReserveStatusMap[room.canReserveStatus]}</span>} style={{ width: 300,margin:'8px' }}
                        >
                            <p>可容纳{room.containNum}人</p>
                            <p>{room.hasProjector?'有':"无"}投影仪</p>
                            <p>{room.supportRemote?'可':'不可'}远程连线</p>
                        </Card>
                    </Col>)
                )
            }
            </Row>
        );
    }
}
