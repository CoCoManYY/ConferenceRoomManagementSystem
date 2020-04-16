import React, { Component } from 'react';
import { Modal, Form, Input, Radio, InputNumber, Cascader, Select, AutoComplete } from 'antd';
// import axios from 'axios';
// import address from './request/address';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const options = [];

class PCustomizedForm extends Component{
    state = {
        autoCompleteResult: [],
        positionData: [],
        departmentData: [],
        roleData: [],
        value: [],
        fetching: false
    };
    constructor(props){
        super(props);

        this.fetchPosition = this.fetchPosition.bind(this);
        this.fetchDepartment = this.fetchDepartment.bind(this);
    }

    //获取职位信息
    fetchPosition = (value) => {

        this.setState({ positionData: [], fetching: true });
        //成功发送请求
        fetch(`/sm/position/position`).then((response) => {
            //请求没有正确响应
            if (response.status !== 200) {
                throw new Error('Fail to get response with status ' + response.status);
            }
            //请求体为JSON
            response.json().then((responseJson) => {

                const positionData = [];
                // console.log(responseJson.data);
                for (let k of Object.keys(responseJson.data)) {

                    positionData.push({
                        value: responseJson.data[k],
                        text: k
                    })
                }
                this.setState({ positionData, fetching: false });
            });
        });

    };

    //get department
    fetchDepartment = (value) => {

        this.setState({ departmentData: [], fetching: true });
        //成功发送请求
        fetch(`/sm/department/department/select`).then((response) => {
            //请求没有正确响应
            if (response.status !== 200) {
                throw new Error('Fail to get response with status ' + response.status);
            }
            //请求体为JSON
            response.json().then((responseJson) => {

                const departmentData = [];
                // console.log(responseJson.data);
                for (let k of Object.keys(responseJson.data)) {

                    departmentData.push({
                        value: responseJson.data[k],
                        text: k
                    })
                }
                this.setState({ departmentData, fetching: false });
            });
        });

    };

    render(){
        const { visible, onCancel, onCreate, form, okText, title } = this.props;
        const { getFieldDecorator } = form;
        const { autoCompleteResult, positionData, value, departmentData } = this.state;
        const FormItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };

        return (
            <Modal
                visible={visible}
                title={title}
                okText={okText}
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="horizontal">
                    <FormItem label="employeeName" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('employeeName', {
                            rules: [{ required: true, message: 'Please input Name！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Nickname" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('employeeNickname', {
                            rules: [{ required: true, message: 'Please input Nickname！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Gender" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('employeeGender', {
                            rules: [{ required: true, message: 'Please select Gender！' }],
                        })(
                            <Radio.Group style={{marginRight: 20}}>
                                {/*<Radio value={1}>男</Radio>*/}
                                {/*<Radio value={0}>女</Radio>*/}
                                <Radio value="男">男</Radio>
                                <Radio value="女">女</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem label="DepartmentName" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('employeeDepartmentId', {
                            rules: [{ required: true, message: 'Please input DepartmentName！' }],
                        })(
                            <Select placeholder="Please select a department"
                                    onMouseEnter={this.fetchDepartment}
                            >
                                {departmentData.map(d => <Option key={d.value}>{d.text}</Option>)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="PositionName" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('employeePositionId', {
                            rules: [{ required: true, message: 'Please input PositionName！' }],
                        })(
                            <Select placeholder="Please select a position"
                                    onMouseEnter={this.fetchPosition}
                            >

                                {positionData.map(d => <Option key={d.value}>{d.text}</Option>)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="RoleName" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('employeeRoleId', {
                            rules: [{ required: true, message: 'Please input RoleName！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Email" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('employeeEmail', {
                            rules: [{ required: true, message: 'Please input Email！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Mobile" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('employeeMobile', {
                            rules: [{ required: true, message: 'Please input Mobile！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Tel" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('employeeTel', {
                            rules: [{ required: false, message: 'Please input Tel！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Seat" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('employeeSeat', {
                            rules: [{ required: false, message: 'Please input Seat！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Remarks" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('employeeRemarks', {
                            rules: [{ required: false, message: 'Please input Remarks！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const PCollectionCreateForm = Form.create()(PCustomizedForm);
export default PCollectionCreateForm;
