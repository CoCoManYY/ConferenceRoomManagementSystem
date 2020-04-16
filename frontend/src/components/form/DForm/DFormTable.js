import React, {Component} from 'react';
import {Table, Icon, Popconfirm} from 'antd';
import moment from 'moment';

export default class DFormTable extends Component {
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
            title: 'DepartmentName',
            dataIndex: 'departmentName',
            width: 80,
        }, {
            title: 'DepartmentCreatorName',
            dataIndex: 'departmentCreatorName',
            width: 120,
        }, {
            title: 'DepartmentCreatedTime',
            dataIndex: 'departmentCreatedTime',
            sorter: (a, b) => moment(a.departmentCreatedTime) - moment(b.departmentCreatedTime),
            width: 150,
        }, {
            title: 'DepartmentUpdatorAccountName',
            dataIndex: 'departmentUpdatorAccountName',
            width: 120,
        }, {
            title: 'DepartmentUpdatedTime',
            dataIndex: 'departmentUpdatedTime',
            sorter: (a, b) => moment(a.departmentUpdatedTime) - moment(b.departmentUpdatedTime),
            width: 150,
        }, {
            title: 'DepartmentRemarks',
            dataIndex: 'departmentRemarks',
            width: 150,
        }, {
            title: 'Opera',
            dataIndex: 'opera',
            width: 100,
            render: (text, record) =>
                <div className='opera'>
                        <span onClick={() => editClick(record.departmentId)}>
                            <Icon type="edit"/> update
                        </span><br/>
                    <span><Popconfirm title="Are you sure you want to delete?" onConfirm={() => onDelete(record.departmentId)}><Icon
                        type="minus-square-o"/> delete </Popconfirm></span>
                </div>
        }];

        return (
            <Table
                rowSelection={rowSelection}
                columns={columns}
                //分页，传入每页的条数
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