import React, { Component } from 'react';
import { Modal, Form, Input, Radio, InputNumber, Cascader, Select, AutoComplete } from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const options = [];

class ACustomizedForm extends Component{
    state = {
        autoCompleteResult: [],
        data: [],
        fetching: false,
        value: []
    };
    constructor(props){
        super(props);

        this.fetchAccountEmployeeNickname = this.fetchAccountEmployeeNickname.bind(this);
    }

    //get accountEmployeeNickname
    fetchAccountEmployeeNickname = (value) => {

        this.setState({ data: [], fetching: true });
        //成功发送请求
        fetch(`/sm/employee/employeeNickname`).then((response) => {
            //请求没有正确响应
            if (response.status !== 200) {
                throw new Error('Fail to get response with status ' + response.status);
            }
            //请求体为JSON
            response.json().then((responseJson) => {

                const data = [];
                // console.log(responseJson.data);
                for (let k of Object.keys(responseJson.data)) {

                    data.push({
                        value: responseJson.data[k],
                        text: k
                    })
                }
                this.setState({ data, fetching: false });
            });
        });

    };

    render(){
        const { visible, onCancel, onCreate, form, okText, title } = this.props;
        const { getFieldDecorator } = form;
        const { fetching, data, value } = this.state;
        const FormItemLayout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 11 },
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
                    <FormItem label="accountName" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('accountName', {
                            rules: [{ required: true, message: 'accountName！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem label="accountEmployeeNickname" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('accountEmployeeId', {
                            rules: [{ required: true, message: 'accountEmployeeNickname！' }],
                        })(
                            <Select placeholder="Please select a role"
                                    onMouseEnter={this.fetchAccountEmployeeNickname}
                            >
                                {data.map(d => <Option key={d.value}>{d.text}</Option>)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="accountRemarks" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('accountRemarks', {
                            rules: [{ required: false, message: 'accountRemarks！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                </Form>
            </Modal>
        );
    }
}

const ACollectionCreateForm = Form.create()(ACustomizedForm);
export default ACollectionCreateForm;
