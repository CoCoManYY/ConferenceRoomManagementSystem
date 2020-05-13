import { Timeline } from 'antd';
import React, { Component } from 'react';
import { getQueryString } from '../../../utils/params';
import BreadcrumbCustom from "../../common/BreadcrumbCustom";
import { canReserveStatusMap } from '../../../constant/conferenceRooms';

import './index.less';

const conferenceRoomId = getQueryString('conferenceRoomId');
const month = getQueryString('month');
const day = getQueryString('day');
console.log('getQueryString',conferenceRoomId,month,day);

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
            timelineData : [
                {time:'8:00-9:00',status:4},
                {time:'9:00-10:00',status:1},
                {time:'10:00-11:00',status:2},
                {time:'11:00-12:00',status:3},
                {time:'12:00-13:00',status:0},
                {time:'13:00-14:00',status:3},
                {time:'14:00-15:00',status:3},
                {time:'15:00-16:00',status:3},
                {time:'16:00-17:00',status:3},
                {time:'17:00-18:00',status:3},
            ]
        }
    }
    reverseConferenceRoom = ()=>{
        console.log('reverseConferenceRoom');
    }

    render() {

        return(

            <div>
                <BreadcrumbCustom paths={['首页','会议室详情','预定会议室']}/>
                <div className='formBody'>
                    <Timeline>
                        {(this.state.timelineData||[]).map(data=>{
                            return  (<Timeline.Item color={colorMap[data.status]}>
                                <p>{data.time}</p>
                                <p>{data.status==0||data.status==1?<a onClick={this.reverseConferenceRoom}>{canReserveStatusMap[data.status]}</a>:canReserveStatusMap[data.status]}</p>
                                </Timeline.Item>)
                        })}

                        
                        {/* <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                        <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                        <Timeline.Item color="red">
                        <p>Solve initial network problems 1</p>
                        <p>Solve initial network problems 2</p>
                        <p>Solve initial network problems 3 2015-09-01</p>
                        </Timeline.Item>
                        <Timeline.Item>
                        <p>Technical testing 1</p>
                        <p>Technical testing 2</p>
                        <p>Technical testing 3 2015-09-01</p>
                        </Timeline.Item>
                        <Timeline.Item color="gray">
                        <p>Technical testing 1</p>
                        <p>Technical testing 2</p>
                        <p>Technical testing 3 2015-09-01</p>
                        </Timeline.Item>
                        <Timeline.Item color="gray">
                        <p>Technical testing 1</p>
                        <p>Technical testing 2</p>
                        <p>Technical testing 3 2015-09-01</p>
                        </Timeline.Item> */}
                    </Timeline>
                </div>
            </div>
            
        )
    }
}
