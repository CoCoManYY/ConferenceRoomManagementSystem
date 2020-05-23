import React, {Component} from 'react';
import { Card, Row, Col,message, Pagination, Input } from 'antd';
import history from '../../common/history';
import './index.less';
import { myFetch } from "../../../utils/networks";
import {canReserveStatusMap} from '../../../constant/allKindsOfMap';
const { Search } = Input;
export default class App extends Component {
    constructor(props){
        super(props);
        this. state = {
            current:1,
            pageSize:8,
            total:10,
            keywords:'',
            conferenceRooms:[
                // {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:1,canReserveStatus:0},
                // {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:1,canReserveStatus:1},
                // {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:1,canReserveStatus:2},
                // {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:1,canReserveStatus:3},
                // {id:'1',houseNumber:'东区-计-603',containNum:'30', hasProjector:1,supportRemote:0,canReserveStatus:3}
            ]
        };
    }
   
    getCurrentConferenceRoomsInfo = (page,keywords) => {
        //请求URL
        // const apiUrl = `/scb_sms-0.0.1-SNAPSHOT/sm/account/accountLogin`;
        myFetch('http://localhost:9000/conferenceRoom/getConferenceRoomsInfo','get',{
            pageIndex:page,
            pageSize:this.state.pageSize,
            keywords:keywords||this.state.keywords
        }).then(responseJson=>{
                //对JSON的解析
                if (responseJson.code === 200) {
                    this.setState({conferenceRooms:responseJson.data.rows,total:responseJson.data.count});
                 }
        },(error) => {
            message.error("获取会议室信息失败");
        })
    };

    onPaginationChange = (page)=>{
        this.getCurrentConferenceRoomsInfo(page-1);
    }
    searchHandle=(value)=>{
        this.setState({keywords:value,current:1});
        this.getCurrentConferenceRoomsInfo(0,value);
    }
    componentDidMount() {
        this.getCurrentConferenceRoomsInfo(0);
    }

    render() {
        return (
            <div>
                <div style={{padding:'10px'}}>
                <Search placeholder="搜索会议室" onSearch={this.searchHandle} enterButton />
                </div>
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
            <div style={{overflow:'hidden'}}>
            <Pagination style={{ width: '300px', float: 'right'}} simple defaultCurrent={this.state.current} pageSize={this.state.pageSize} total={this.state.total} onChange={this.onPaginationChange}/>
            </div>
            
            </div>
        );
    }
}
