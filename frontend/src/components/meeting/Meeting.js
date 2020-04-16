import React from 'react';
import { Form, DatePicker, TimePicker, Button, Upload, Icon, Select, Divider, Col, Row, Calendar, Badge, Collapse } from 'antd';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import AddMeetingForm from './addMeetingForm';
import DelMeetingForm from './delMeetingForm';
import UpdateMeetingForm from './updateMeetingForm';

import My from '../calendars/Calendar';

const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class Meeting extends React.Component {
    constructor(props){

        super(props);
    }

    //提交表单
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }

            // Should format date value before submit.
            // const rangeValue = fieldsValue['range-picker'];
            const rangeTimeValue = fieldsValue['range-time-picker'];
            const values = {
                ...fieldsValue,
                'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
                // 'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
                // 'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
                // 'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
                'range-time-picker': [
                    rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
                    rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
                ],
                'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
            };
            console.log('Received values of form: ', values);
        });
    }

    //日历
    getListData = (value) => {
        let mth = this.getMonthData(value);
        let b = 10;
        let a = 8;
        let listData;
        console.log(mth);
        if (mth === b) {
            switch (value.date()) {
                case a:
                    listData = [
                        { type: 'warning', content: 'This is warning event.' },
                        { type: 'success', content: 'This is usual event.' },
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
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };
        return (
            <div>
                <BreadcrumbCustom paths={['index','form']}/>

                <Row gutter={24}>
                    <Col span={8} >
                        <Divider>Room Management</Divider>

                        <Collapse defaultActiveKey={['1']}>
                            <Panel header="add meeting" key="1">
                                <AddMeetingForm />
                            </Panel>
                            <Panel header="update meeting" key="2">
                                <UpdateMeetingForm />
                            </Panel>
                            <Panel header="delete meeting" key="3" disabled>
                                <DelMeetingForm />
                            </Panel>
                        </Collapse>
                    </Col>
                    <Col span={16} >
                        <Divider>Book Details</Divider>
                        <div className='formBody' style={{border: '1px solid #d9d9d9', borderRadius: 4}}>
                            {/* <Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender}  */}
                            {/* /> */}
                            <My />
                        </div>
                    </Col>
                </Row>
            </div>

        );
    }
}

const MeeManagement = Form.create()(Meeting);

export default MeeManagement;