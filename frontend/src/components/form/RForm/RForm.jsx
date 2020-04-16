import React, { Component } from 'react';
import '../form.less';
import moment from 'moment';
import { Row, Col, Input, Icon, message, DatePicker, Button, Tooltip, Popconfirm, Select } from 'antd';

import BreadcrumbCustom from '../../common/BreadcrumbCustom';
import RCollectionCreateForm from './RCustomizedForm';
import RFormTable from './RFormTable';

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
        if(ar.roleId === key){
            index1 = index;
        }
    });
    return index1;
}
//替换数组的对应项
function replace(arr, item, place){ //arr 数组,item 数组其中一项, place 替换项
    arr.map(function (ar) {
        if(ar.key === item){
            arr.splice(arr.indexOf(ar),1,place)
        }
    });
    return arr;
}

export default class RForm extends Component{
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
        var apiURL = "/sm/position/position/detail";
        var opts = {
            credentials: "include",
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };
        fetch(apiURL, opts).then((response) => {
            // var responseData = JSON.stringify(response.data);
            response.json().then((responseJSON) => {
                var responseData = JSON.stringify(responseJSON.data);
                this.setState({
                    dataSource: JSON.parse(responseData),
                    loading: false
                });
                // console.log(this.state.dataSource);
            });
        }).catch((error) => {
            console.log(error);
        });
    };

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.dataSource !== this.props.dataSource);
    }

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
        // const { dataSource } = this.state;
        // this.setState({
        //     dataSource: dataSource.filter(item.employeePositionName.indexOf(value) !== -1),
        //     loading: false,
        // });
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
            var apiURL = "/sm/position/position";
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

                    if (response.status !== 200) {
                        throw new Error('Fail to get response with status ' + response.status);
                    }

                    // var responseData = JSON.stringify(responseJSON.data);
                    // this.setState({
                    //     dataSource: JSON.parse(responseData),
                    //     loading: false
                    // });
                    // console.log(this.state.dataSource);
                });
            }).catch((error) => {
                console.log(error);
            });

            form.resetFields();
            this.setState({
                visible: false,
                dataSource: [...dataSource, values],
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
            dataSource: dataSource.filter(item => !isContains(selectedRowKeys, item.id)),
        });
    };

    //单个删除
    onDelete = (roleId) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.roleId !== roleId) });

        console.log(roleId);
        //Delete方法
        var apiUrl = '/sm/position/position/' + roleId;

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

            console.log(roleId);
            //请求体为JSON
            response.json().then((responseJson) => {
                //对JSON的解析
                //     console.log(responseJson);
                if (responseJson.code === 200) {
                    alert("删除成功！");
                } else {
                    alert("删除失败！")
                }

            }).catch((error) => {
                alert("操作失败！");
            });
        });
    };

    //点击修改
    editClick = (roleId) => {
        const form = this.form;
        const { dataSource } = this.state;
        const index = catchIndex(dataSource, roleId);
        console.log(roleId);
        form.setFieldsValue({
            roleId: dataSource[index].roleId,
            roleName: dataSource[index].roleName,
            roleCreatorName: dataSource[index].roleCreatorName,
            // address: dataSource[index].address.split(' / '),
            roleCreatedTime: dataSource[index].roleCreatedTime,
            roleUpdatorName: dataSource[index].roleUpdatorName,
            roleUpdatedTime: dataSource[index].roleUpdatedTime,
            roleRemarks: dataSource[index].roleRemarks
        });
        this.setState({
            visible: true,
            tableRowKey: roleId,
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

            values.roleId = tableRowKey;

            //PUT
            var apiURL = "/sm/role/role";
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

                    if (responseJSON.code === 200) {
                        message.success("update success!")
                    }
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
        const { employeeName, timeRange, dataSource, visible, isUpdate, loading } = this.state;
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
                                placeholder="Input EmployeeName"
                                prefix={<Icon type="user" />}
                                value={employeeName}
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
                                placeholder="Select a Position"
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
                    <RFormTable
                        dataSource={dataSource}
                        checkChange={this.checkChange}
                        onDelete={this.onDelete}
                        editClick={this.editClick}
                        loading={loading}
                    />
                    {isUpdate?
                        <RCollectionCreateForm ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel} onCreate={this.handleUpdate} title="Update Info" okText="update"
                        /> : <RCollectionCreateForm ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel} onCreate={this.handleCreate} title="Create Info" okText="create"
                        />}
                </div>
            </div>
        )
    }
}
