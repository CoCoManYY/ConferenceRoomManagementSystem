import React, {Component} from 'react';
import {Table, Icon, Popconfirm} from 'antd';
import moment from 'moment';

export default class RFormTable extends Component {
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
            title: 'RoleName',
            dataIndex: 'roleName',
            width: 80,
        }, {
            title: 'RoleCreatorName',
            dataIndex: 'positionCreatorName',
            width: 120,
        }, {
            title: 'RoleCreatedTime',
            dataIndex: 'positionCreatedTime',
            sorter: (a, b) => moment(a.positionCreatedTime) - moment(b.positionCreatedTime),
            width: 150,
        }, {
            title: 'RoleUpdatorName',
            dataIndex: 'positionUpdatorName',
            width: 120,
        }, {
            title: 'RoleUpdatedTime',
            dataIndex: 'positionUpdatedTime',
            sorter: (a, b) => moment(a.positionUpdatedTime) - moment(b.positionUpdatedTime),
            width: 150,
            }, {
                title: 'RoleRemarks',
                dataIndex: 'roleRemarks',
                width: 150,
        }, {
            title: 'Operate',
            dataIndex: 'opera',
            width: 100,
            render: (text, record) =>
                <div className='operate'>
                        <span onClick={() => editClick(record.roleId)}>
                            <Icon type="edit"/> update
                        </span><br/>
                    <span><Popconfirm title="Are you sure you want to delete?" onConfirm={() => onDelete(record.roleId)}><Icon
                        type="minus-square-o"/> delete </Popconfirm></span>
                </div>
        }];

        return (
            <Table
                rowSelection={rowSelection}
                columns={columns}
                //分页，传入每页的条数
                pagination={{pageSize: 3}}
                dataSource={dataSource}
                bordered={true}
                scroll={{x: '100%'}}
                className='formTable'
                loading={loading}
            />
        )
    }
}