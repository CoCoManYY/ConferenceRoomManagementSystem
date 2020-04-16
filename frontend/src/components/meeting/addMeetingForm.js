import React from 'react';
import { Form, DatePicker, TimePicker, Button, Upload, Icon, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class newMeeting extends React.Component{

    constructor(props) {
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


    render(){
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
            <div className="formBody">
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="select item:"
                    >
                        {getFieldDecorator('item', {
                            rules: [{ required: true, message: 'Please select your item!' }],
                        })(
                            <Select
                                placeholder="Select a item" style={{width: '100%'}}
                            >
                                <Option value="meetingRoom">Book Room</Option>
                                <Option value="meeting">Book Meeting</Option>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="select date:"
                    >
                        {getFieldDecorator('date-picker', config)(
                            <DatePicker />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="select room:"
                    >
                        {getFieldDecorator('item', {
                            rules: [{ required: true, message: 'Please select your place!' }],
                        })(
                            <Select
                                placeholder="Select a place" style={{width: '100%'}}
                            >
                                <Option value="Tailand">Tailand</Option>
                                <Option value="M">M</Option>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="optional time:"
                    >
                        <Select
                            mode="multiple"
                            style={{width: '100%'}}
                            defaultValue={[]}
                            disabled
                            // onChange={handleChange}
                        >
                            {children}
                        </Select>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="select begin time:"
                    >
                        {getFieldDecorator('time-picker-start', config)(
                            <TimePicker />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="select end time:"
                    >
                        {getFieldDecorator('time-picker-end', config)(
                            <TimePicker />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="meeting topic:"
                    >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your topic!' }],
                        })(
                           <input />
                        )}

                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="invitation list:"
                    >
                        <Select
                            mode="multiple"
                            style={{width: '100%'}}
                            placeholder="Please select"
                            defaultValue={['a10', 'c12']}
                            // onChange={handleChange}
                        >
                            {children}
                        </Select>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="select file："
                    >
                        <Upload action="//jsonplaceholder.typicode.com/posts/" directory>
                            <Button>
                                <Icon type="upload" /> Upload Directory
                            </Button>
                        </Upload>
                    </FormItem>

                    <FormItem
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 16, offset: 8 },
                        }}
                    >
                        <Button type="primary" htmlType="submit">Book</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }

}

const AddMeetingForm = Form.create()(newMeeting);
export default AddMeetingForm;
