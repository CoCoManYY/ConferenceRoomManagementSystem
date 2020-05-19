import { Timeline, message,Drawer,Form,Input,Select,Button, TimePicker  } from 'antd';
import React, { Component } from 'react';
import moment from 'moment';

import history from '../../common/history';
import { getQueryString } from '../../../utils/params';
import BreadcrumbCustom from "../../common/BreadcrumbCustom";
import { canReserveStatusMap } from '../../../constant/conferenceRooms';

// todo 会议室的详细信息显示、与会人员+邮箱
import './index.less';


const { Option } = Select;
const { RangePicker } = TimePicker;

const colorMap={
    0: 'green',
    1: 'green',
    2: 'red',
    3: 'red',
    4: 'gray'
}

export default class my extends Component {

    constructor(props){

        super(props);
        this.state={
            // 类似学校图书馆开放关闭时间
            timelineData : {
                8:{time:'8:00-9:00',status:0},
                9:{time:'9:00-10:00',status:0},
                10:{time:'10:00-11:00',status:0},
                11:{time:'11:00-12:00',status:0},
                12:{time:'12:00-13:00',status:0},
                13:{time:'13:00-14:00',status:0},
                14:{time:'14:00-15:00',status:0},
                15:{time:'15:00-16:00',status:0},
                16:{time:'16:00-17:00',status:0},
                17:{time:'17:00-18:00',status:0},
            },
            visible: false
        }
    }
    reverseConferenceRoom = ()=>{
        console.log('reverseConferenceRoom');
        this.setState({visible:true})
    }

    componentDidMount(){
        const conferenceRoomId = getQueryString('conferenceRoomId');
        const queryMonth = getQueryString('month');
        const queryDay = getQueryString('day');
        //请求URL
        // const apiUrl = `/scb_sms-0.0.1-SNAPSHOT/sm/account/accountLogin`;
        const apiUrl = `http://localhost:9000/conferenceRoom/getConferenceRoomDetail?conferenceRoomId=${conferenceRoomId}`;
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
                    const conferenceRoomsInfo = [];
                   console.log('getDetail',responseJson.data);
                    const timelineData = JSON.parse(JSON.stringify(this.state.timelineData));
                   (responseJson.data.conferenceRoomReserveLogs||[]).forEach(log=>{
                            const startTime = moment.utc(log.startTime);
                            const endTime  = moment.utc(log.endTime);
                            const month = startTime.month();
                            const day = startTime.date();
                            const hour = startTime.hour();
                            console.log('month',month,queryMonth,month==queryMonth,day,queryDay,day==queryDay);
                            if(month==queryMonth && day==queryDay && log.status!=1){
                                if(log.status==2){
                                    timelineData[hour].status = 2;
                                }else{
                                    if(moment.utc().valueOf()-startTime.valueOf()>=15*60*1000&&moment.utc().valueOf()<endTime.valueOf()){
                                        timelineData[hour].status = 1;
                                    }else{
                                        timelineData[hour].status = 3;
                                    }   
                                }
                            }
                        } 
                   );
                   (Object.keys(this.state.timelineData||{})||[]).forEach(key=>{
                       if(queryMonth<moment.utc().month()||(queryMonth==moment.utc().month()&&queryDay<moment.utc().date())||((queryMonth==moment.utc().month()&&queryDay==moment.utc().date()&&(parseInt(key)+1)<=moment.utc().hour()))){
                        console.log(queryMonth,queryDay,parseInt(key)+1,moment.utc().month(),moment.utc().date(),moment.utc().hour());
                        console.log('jinlaile');
                        timelineData[key].status=4;
                       }
                   });
                   console.log('timelineData',timelineData);
                   this.setState({timelineData});
                }
            }).catch((error) => {
                message.error("获取会议室信息失败");
            });
        }).catch((error) => {
            message.error("获取会议室信息失败");
        })
    }

    onClose =()=>{
        this.setState({visible:false});
    }

    onFormFinish = ()=>{

    }

    onSelectChange = ()=>{

    }

    render() {
        return(
            <div>
                <BreadcrumbCustom paths={['首页','会议室详情','预定会议室']}/>
                <div className='formBody'>
                    <Timeline>
                        {(Object.keys(this.state.timelineData||{})||[]).map(key=>{
                            const data = this.state.timelineData[key];
                            return  (<Timeline.Item color={colorMap[data.status]}>
                                <p>{data.time}</p>
                                <p>{data.status==0||data.status==1?<a onClick={this.reverseConferenceRoom}>{canReserveStatusMap[data.status]}</a>:canReserveStatusMap[data.status]}</p>
                                </Timeline.Item>)
                        })}
                    </Timeline>
                </div>
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    width="50%"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    >
                   <Form
                    name="basic"
                    initialValues={{}}
                    onFinish={this.onFormFinish}
                    // onFinishFailed={onFinishFailed}
                    >
                    <Form.Item
                        label="会议室"
                        name="conferenceRoomId"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="预定时间" name="reserveTime">
                        <TimePicker defaultValue={moment('12:00:00', 'HH:mm:ss')} disabled />
                    </Form.Item>

               
                    {/* todo 优化点加搜索 */}
                    <Form.Item label="与会人员 " name="conferee">
                        <Select
                            placeholder="选择与会人员"
                            mode="multiple"
                            onChange={this.onSelectChange}
                            allowClear
                            >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                            </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                    </Form>
                </Drawer>
            </div>
            
        )
    }
}
