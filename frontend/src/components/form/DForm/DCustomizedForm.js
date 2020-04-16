import React, { Component } from 'react';
import { Modal, Form, Input, Radio, InputNumber, Cascader, Select, AutoComplete } from 'antd';
// import axios from 'axios';
// import address from './request/address';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const options = [];

class DCustomizedForm extends Component{
    state = {
        autoCompleteResult: [],
    };
    constructor(props){
        super(props);
    }
    render(){
        const { visible, onCancel, onCreate, form, okText, title } = this.props;
        const { getFieldDecorator } = form;
        const { autoCompleteResult } = this.state;
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
                        {getFieldDecorator('departmentName', {
                            rules: [{ required: true, message: 'Please input employee name！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem label="Remarks" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('departmentRemarks', {
                            rules: [{ required: false, message: 'Please input employee nickname！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const DCollectionCreateForm = Form.create()(DCustomizedForm);
export default DCollectionCreateForm;
