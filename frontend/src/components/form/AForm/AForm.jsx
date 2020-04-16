import React, { Component } from 'react';
import '../form.less';

import axios from 'axios';
import moment from 'moment';
import { Row, Col, Input, Icon, message, DatePicker, Button, Tooltip, Popconfirm, Select } from 'antd';

import BreadcrumbCustom from '../../common/BreadcrumbCustom';
// import address from './request/address.json';
// import data from './request/data.json';
import ACollectionCreateForm from './ACustomizedForm';
import AFormTable from './AFormTable';

const Search = Input.Search;
const Option = Select.Option;
// const InputGroup = Input.Group;
// const options = [];
const { RangePicker } = DatePicker;
// Mock.mock('/address', address);
// Mock.mock('/data', data);

//数组中是否包含某项
function isContains(arr, item){
    arr.map(function (ar) {
        if(ar === item){
            return true;
        }
    });
    return false;
}
//找到对应元素的索引
function catchIndex(arr, key){
    let index1 = 0;
    arr.map(function (ar, index) {
        if(ar.accountId === key){
            index1 = index;
        }
    });
    return index1;
}
//替换数组的对应项
function replace(arr, item, place){ //arr 数组,item 数组其中一项, place 替换项
    arr.map(function (ar) {
        if(ar.accountId === item){
            arr.splice(arr.indexOf(ar),1,place)
        }
    });
    return arr;
}

export default class AForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            employeeName: '',
            employeePositionName: '',
            timeRange: '',
            visible: false, //新建窗口隐藏
            dataSource: [],
            // count: data.length,
            selectedRowKeys: [],
            tableRowKey: 0,
            isUpdate: false,
            loading: true,
        };
    }
    //getData
    getData = () => {
        var apiURL = "/sm/account/account";
        var opts = {
            // credentials: "include",
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };
        fetch(apiURL, opts).then((response) => {
            response.json().then((responseJSON) => {
                var responseData = JSON.stringify(responseJSON.data);
                this.setState({
                    dataSource: JSON.parse(responseData),
                    loading: false
                });
            });
        }).catch((error) => {
            console.log(error);
        });
    };

    //用户名输入
    onChangeUserName = (e) => {
        const value = e.target.value;
        this.setState({
            employeeName: value,
        })
    };
    //用户名搜索
    onSearchUserName = (value) => {
        console.log(value);
        const { dataSource } = this.state;
        this.setState({
            dataSource: dataSource.filter(item => item.employeeName.indexOf(value) !== -1),
            loading: false,
        })
    };

    //时间选择
    RangePicker_Select = (date, dateString) => {
        // console.log(date, dateString);
        const { dataSource } = this.state;
        const startime = moment(dateString[0]);
        const endtime = moment(dateString[1]);
        if(date.length===0){
            this.setState({
                timeRange: date,
                dataSource: [],
            });
            this.getData();
        }else{
            this.setState({
                timeRange: date,
                dataSource: dataSource.filter(item => (moment(item.createtime.substring(0,10)) <= endtime  && moment(item.createtime.substring(0,10)) >= startime) === true)
            });
        }
    };
    //渲染
    componentDidMount(){
        //获取数据
        this.getData();
    }

    //提交搜索框的value
    handleChange(value) {
        console.log(value);
    }
    //搜索按钮,查询相关职位信息的employee
    btnSearch_Click = () => {

    };
    //重置按钮
    btnClear_Click = () => {
        this.setState({
            employeeName: '',
            // address: '',
            timeRange: '',
            dataSource: [],
            // count: data.length,
        });
        this.getData();
    };
    //新建信息弹窗
    CreateItem = () => {
        this.setState({
            visible: true,
            isUpdate: false,
        });
        const form = this.form;
        // console.log(form);
        form.resetFields();
    };
    //接受新建表单数据
    saveFormRef = (form) => {
        this.form = form;
    };
    //填充表格行
    handleCreate = () => {
        const { dataSource, count } = this.state;
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);

            //POST
            var apiURL = "/sm/account/account";
            var opts = {
                credentials: "include",
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            };
            fetch(apiURL, opts).then((response) => {
                // var responseData = JSON.stringify(response.data);
                response.json().then((responseJSON) => {
                    var responseData = JSON.stringify(responseJSON.data);
                    if (responseJSON.code !== 200) {
                        this.setState({
                            dataSource: JSON.parse(responseData),
                            loading: false
                        });
                    } else {
                        message.success("create success!")
                    }
                });
            }).catch((error) => {
                console.log(error);
            });

            form.resetFields();
            this.setState({
                visible: false,
                dataSource: [...dataSource, values],
                count: count+1,
            });
        });
    };
    //取消
    handleCancel = () => {
        this.setState({ visible: false });
    };
    //批量删除
    MinusClick = () => {
        const { dataSource, selectedRowKeys } = this.state;
        this.setState({
            dataSource: dataSource.filter(item => !isContains(selectedRowKeys, item.accountId)),
        });
    };
    //单个删除
    onDelete = (accountId) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.accountId !== accountId) });

        console.log(accountId);

        //Delete方法
        var apiUrl = '/sm/account/account/' + accountId;

        //设置请求方式
        var opts = {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
        //成功发送请求
        fetch(apiUrl, opts).then((response) => {
            //请求没有正确响应
            if (response.status !== 200) {
                throw new Error('Fail to get response with status ' + response.status);
            }
            //请求体为JSON
            response.json().then((responseJson) => {
                //对JSON的解析
                // console.log(responseJson);
                if (responseJson.code === 200) {
                    // alert("删除成功！")
                    message.success("delete success!");
                } else {
                    message.error("delete success!");
                }


            }).catch((error) => {
                alert("Operation Failed！");
            });
        });
    };
    //点击修改
    editClick = (accountId) => {
        const form = this.form;
        const { dataSource } = this.state;
        console.log(dataSource);
        const index = catchIndex(dataSource, accountId);
        console.log(index);
        console.log(dataSource[index].accountId);
        form.setFieldsValue({
            accountId: dataSource[index].accountId,
            accountName: dataSource[index].accountName,
            accountEmployeeName: dataSource[index].accountEmployeeName,
            // address: dataSource[index].address.split(' / '),
            accountEmployeeNickname: dataSource[index].accountEmployeeNickname,
            accountCreatorAccountName: dataSource[index].accountCreatorAccountName,
            accountCreatedTime: dataSource[index].accountCreatedTime,
            accountUpdatorAccountName: dataSource[index].accountUpdatorAccountName,
            accountUpdatedTime: dataSource[index].accountUpdatedTime,
            accountRemarks: dataSource[index].accountRemarks,
        });
        this.setState({
            visible: true,
            tableRowKey: accountId,
            isUpdate: true,
        });
    };

    //更新修改
    handleUpdate = () => {
        const form = this.form;
        const { dataSource, tableRowKey } = this.state;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);

            values.accountId = tableRowKey;
            // values.address = values.address.join(" / ");
            // values.createtime = moment().format("YYYY-MM-DD hh:mm:ss");

            //PUT
            var apiURL = "/sm/account/account";
            var opts = {
                credentials: "include",
                method: "PUT",
                body: JSON.stringify(values),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            };
            fetch(apiURL, opts).then((response) => {
                // var responseData = JSON.stringify(response.data);
                response.json().then((responseJSON) => {
                    // var responseData = JSON.stringify(responseJSON.data);
                    // this.setState({
                    //     dataSource: JSON.parse(responseData),
                    //     loading: false
                    // });
                    // alert("修改成功！")
                    message.success('edit success!');
                });
            }).catch((error) => {
                console.log(error);
            });


            form.resetFields();
            this.setState({
                visible: false,
                dataSource: replace(dataSource, tableRowKey, values)
            });
        });
    };
    //单选框改变选择
    checkChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys: selectedRowKeys});
    };
    render(){
        const { accountName, timeRange, dataSource, visible, isUpdate, loading } = this.state;
        const questiontxt = ()=>{
            return (
                <p>
                    <Icon type="plus-circle-o" /> : Create Info<br/>
                    <Icon type="minus-circle-o" /> : Batch Delete
                </p>
            )
        };
        return(
            <div>
                <BreadcrumbCustom paths={['index','form']}/>
                <div className='formBody'>
                    <Row gutter={16}>
                        <Col className="gutter-row" sm={8}>
                            <Search
                                placeholder="Input AccountName"
                                prefix={<Icon type="user" />}
                                value={accountName}
                                onChange={this.onChangeUserName}
                                onSearch={this.onSearchUserName}
                            />
                        </Col>
                        <Col className="gutter-row" sm={8}>
                            {/* <InputGroup compact>
                                <Cascader style={{ width: '100%' }} options={options} placeholder="Select Position" onChange={this.Cascader_Select} value={employeePositionName}/>
                            </InputGroup> */}
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Select a Account"
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                // onFocus={handleFocus}
                                // onBlur={handleBlur}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="总裁">总裁</Option>
                                <Option value="开发">开发</Option>
                                <Option value="项目主管">项目主管</Option>
                            </Select>
                        </Col>
                        <Col className="gutter-row" sm={8}>
                            <RangePicker style={{ width:'100%' }} onChange={this.RangePicker_Select} value={timeRange}/>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <div className='plus' onClick={this.CreateItem}>
                            <Icon type="plus-circle" />
                        </div>
                        <div className='minus'>
                            <Popconfirm title="Are you sure you want to batch delete?" onConfirm={this.MinusClick}>
                                <Icon type="minus-circle" />
                            </Popconfirm>
                        </div>
                        <div className='question'>
                            <Tooltip placement="right" title={questiontxt}>
                                <Icon type="question-circle" />
                            </Tooltip>
                        </div>
                        <div className='btnOpera'>
                            <Button type="primary" onClick={this.btnSearch_Click} style={{marginRight:'10px'}}>query</Button>
                            <Button type="primary" onClick={this.btnClear_Click} style={{background:'#f8f8f8', color: '#108ee9'}}>reset</Button>
                        </div>
                    </Row>
                    <AFormTable
                        dataSource={dataSource}
                        checkChange={this.checkChange}
                        onDelete={this.onDelete}
                        editClick={this.editClick}
                        loading={loading}
                    />
                    {isUpdate?
                        <ACollectionCreateForm ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel} onCreate={this.handleUpdate} title="Update Info" okText="update"
                        /> : <ACollectionCreateForm ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel} onCreate={this.handleCreate} title="Create Info" okText="create"
                        />}
                </div>
            </div>
        )
    }
}
