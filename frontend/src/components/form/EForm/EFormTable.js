import React, {Component} from 'react';
import {Table, Icon, Popconfirm} from 'antd';
import moment from 'moment';

export default class EFormTable extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {checkChange, onDelete, editClick, dataSource, loading} = this.props;
        const rowSelection = {
            onChange: checkChange,
            // getCheckboxProps: record => ({
            //     disabled: record.employeeName === 'Disabled User', // Column configuration not to be checked
            // }),
        };
        // const columns = EColumns.employeeColumns;
        // console.log(columns);

        const columns = [{
            title: 'EmployeeName',
            dataIndex: 'employeeName',
            width: 100,
        }, {
            title: 'EmployeeNickname',
            dataIndex: 'employeeNickname',
            width: 100,
        }, {
            title: 'EmployeeGender',
            dataIndex: 'employeeGender',
            filters: [
                {text: '男', value: "男"},
                {text: '女', value: "女"},
            ],
            onFilter: (value, record) => record.employeeGender.indexOf(value) === 0,
            width: 80,
        }, {
            title: 'EmployeeDepartmentName',
            dataIndex: 'employeeDepartmentName',
            width: 100,
        }, {
            title: 'EmployeePositionName',
            dataIndex: 'employeePositionName',
            // sorter: (a, b) => a.age - b.age,
            width: 100,
        }, {
            title: 'EmployeeRoleName',
            dataIndex: 'employeeRoleName',
            width: 100,
        }, {
            title: 'EmployeeEmail',
            dataIndex: 'employeeEmail',
            width: 140,
        }, {
            title: 'EmployeeMobile',
            dataIndex: 'employeeMobile',
            width: 120,
        }, {
            title: 'EmployeeTel',
            dataIndex: 'employeeTel',
            width: 80,
        }, {
            title: 'EmployeeSeat',
            dataIndex: 'employeeSeat',
            width: 80,
        }, {
            title: 'EmployeeCreatorAccountName',
            dataIndex: 'employeeCreatorAccountName',
            width: 120,
        }, {
            title: 'EmployeeCreatedTime',
            dataIndex: 'employeeCreatedTime',
            sorter: (a, b) => moment(a.employeeCreatedTime) - moment(b.employeeCreatedTime),
            width: 100,
        }, {
            title: 'EmployeeUpdatorAccountName',
            dataIndex: 'employeeUpdatorAccountName',
            width: 120,
        }, {
            title: 'EmployeeUpdatedTime',
            dataIndex: 'employeeUpdatedTime',
            sorter: (a, b) => moment(a.employeeUpdatedTime) - moment(b.employeeUpdatedTime),
            width: 100,
        }, {
            title: 'EmployeeRemarks',
            dataIndex: 'employeeRemarks',
            width: 80,
        }, {
            title: 'Opera',
            dataIndex: 'opera',
            width: 80,
            render: (text, record) =>
                <div className='opera'>
                        <span onClick={() => editClick(record.employeeId)}>
                            <Icon type="edit"/> update
                        </span><br/>
                    <span><Popconfirm title="Are you sure you want to delete?" onConfirm={() => onDelete(record.employeeId)}><Icon
                        type="minus-square-o"/> delete </Popconfirm></span>
                </div>
        }];

        return (
            <Table
                rowSelection={rowSelection}
                columns={columns}
                pagination={{pageSize: 9}}
                dataSource={dataSource}
                bordered={true}
                scroll={{x: '100%'}}
                className='formTable'
                loading={loading}
            />
        )
    }
}