import { Calendar, Badge } from 'antd';
import React, { Component } from 'react';
import BreadcrumbCustom from "../common/BreadcrumbCustom";

export default class my extends Component {

    constructor(props){

        super(props);
    }


    getListData = (value) => {

        let mth = this.getMonthData(value);
        let b = 11;
        let a = 8;
        let c = 12;
        let listData;
        console.log(mth);
        if (mth === b) {
            switch (value.date()) {
                case a:
                    listData = [
                        { type: 'success', content: '14:00:00-14:30:00  新加坡 交付流程讨论'  },
                        { type: 'success', content: '10:00:00-11:00:00  新加坡 测试会议'  },
                    ]; break;

                case c:
                    listData = [
                        { type: 'success', content: '09:00:00-10:30:00  新加坡 交付流程讨论'  },
                        { type: 'success', content: '10:00:00-11:00:00  新加坡 测试会议'  },
                    ]; break;
                default:
            }
        }
        return listData || [];
    }

    dateCellRender = (value) => {
        const listData = this.getListData(value);
        return (
            <ul className="events">
                {
                    listData.map(item => (
                        <li key={item.content}>
                            <Badge status={item.type} text={item.content} />
                        </li>
                    ))
                }
            </ul>
        );
    }

    getMonthData = (value) => {
        // console.log(value.month());
        // if (value.month() === 11) {
        //   return 1394;
        // }
        return value.month();
    }

    monthCellRender = (value) => {
        const num = this.getMonthData(value);
        // console.log(value.month());
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }

    render() {

        return(
            <div>
                <BreadcrumbCustom paths={['index','book meeting']}/>
                <div className='formBody'>
                    {/* <notice-calendar> */}
                    <Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender}
                    />
                    {/* </notice-calendar> */}
                </div>
            </div>
        )
    }
    // ReactDOM.render(
    //   <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />,
    //   mountNode);
}
