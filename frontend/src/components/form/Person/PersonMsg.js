import React, { Component } from 'react';
import {Form, Select, Input, Button, message} from 'antd';
import BreadcrumbCustom from '../../common/BreadcrumbCustom';
// import ECustomizedForm from '../EForm/ECustomizedForm';

const FormItem = Form.Item;
const Option = Select.Option;
//
class PersonForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             dataSource: [],
//             loading: true,
//         };
//     }
//
//     handleSubmit = (e) => {
//         e.preventDefault();
//         this.props.form.validateFields((err, values) => {
//             if (!err) {
//                 console.log('Received values of form: ', values);
//             }
//         });
//     };
//
//     //getData
//     getData = () => {
//         var employeeId = localStorage.getItem("employee");
//         console.log(employeeId);
//         var apiURL = "/sm/employee/employee/" + employeeId;
//         //
//         // fetch(apiURL).then((response) => {
//         //     if (response.status !== 200) {
//         //         throw new Error('Fail to get response with status ' + response.status);
//         //     }
//         //     response.json().then((responseJSON) => {
//         //
//         //         if (responseJSON.code !== 200) {
//         //             message.error("the network has some errors!");
//         //         } else {
//         //             let responseData = responseJSON.data;
//         //             console.log(responseData[0].employeeGender);
//         //             for (var i=0; i<responseData.length; i++) {
//         //                 if (responseData[i].employeeGender === 1) {
//         //                     responseData[i].employeeGender = "男";
//         //                 } else if (responseData[i].employeeGender === 0) {
//         //                     responseData[i].employeeGender = "女";
//         //                 }
//         //             }
//         //             this.setState({
//         //                 dataSource: responseData,
//         //                 loading: false
//         //             });
//         //         }
//         //
//         //         // console.log(this.state.dataSource);
//         //     });
//         // }).catch((error) => {
//         //     console.log(error);
//         // });
//     };
//
//     //渲染
//     componentDidMount(){
//         //获取数据
//         this.getData();
//     }
//
//
//     //设置表单值
//     // editClick = (employeeId) => {
//     //     const form = this.form;
//     //     const { dataSource } = this.state;
//     //     console.log(employeeId);
//     //     form.setFieldsValue({
//     //         employeeId: dataSource[index].employeeId,
//     //         employeeName: dataSource[index].employeeName,
//     //         employeeNickname: dataSource[index].employeeNickname,
//     //         employeeGender: dataSource[index].employeeGender,
//     //         employeeDepartmentName: dataSource[index].employeeDepartmentName,
//     //         employeePositionName: dataSource[index].employeePositionName,
//     //         employeeRoleName: dataSource[index].employeeRoleName,
//     //         employeeEmail: dataSource[index].employeeEmail,
//     //         employeeMobile: dataSource[index].employeeMobile,
//     //         employeeTel: dataSource[index].employeeTel,
//     //         employeeSeat: dataSource[index].employeeSeat,
//     //         employeeCreatorAccountName: dataSource[index].employeeCreatorAccountName,
//     //         employeeCreatedTime: dataSource[index].employeeCreatedTime,
//     //         employeeUpdatorAccountName: dataSource[index].employeeUpdatorAccountName,
//     //         employeeUpdatedTime: dataSource[index].employeeUpdatedTime,
//     //         employeeRemarks: dataSource[index].employeeRemarks,
//     //     });
//     //     this.setState({
//     //         visible: true,
//     //         tableRowKey: employeeId,
//     //         isUpdate: true,
//     //     });
//     // };
//
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <BreadcrumbCustom paths={['index','personal info']}/>

                <div className='formBody'>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            label="Id"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('id', {
                                rules: [{ required: true}],
                            })(
                                <Select mode='tags' style={{width: 120}} disable >
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            label="Note"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('note', {
                                rules: [{ required: true, message: 'Please input your note!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="Name"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input your name!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="Nickname"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('nickname', {
                                rules: [{ required: true, message: 'Please input your nickname!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="Gender"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('gender', {
                                rules: [{ required: true, message: 'Please select your gender!' }],
                            })(
                                <Select
                                    placeholder="Select a option and change input text above"
                                    onChange={this.handleSelectChange}
                                >
                                    <Option value="male">male</Option>
                                    <Option value="female">female</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            wrapperCol={{ span: 12, offset: 5 }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}
//
const PersonMsg = Form.create()(PersonForm);

export default PersonMsg;