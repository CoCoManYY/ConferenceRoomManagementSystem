import React, {Component} from 'react';
import {Table, Icon, Popconfirm} from 'antd';
import moment from 'moment';

export default class AFormTable extends Component {
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

        const columns = [{
            title: 'AccountName',
            dataIndex: 'accountName',
            width: 80,
        }, {
            title: 'AccountEmployeeName',
            dataIndex: 'accountEmployeeName',
            width: 80,
        }, {
            title: 'AccountEmployeeNickname',
            dataIndex: 'accountEmployeeNickname',
            width: 80,
        },{
            title: 'AccountCreatorAccountName',
            dataIndex: 'accountCreatorAccountName',
            width: 120,
        }, {
            title: 'AccountCreatedTime',
            dataIndex: 'accountCreatedTime',
            sorter: (a, b) => moment(a.accountCreatedTime) - moment(b.accountCreatedTime),
            width: 150,
        }, {
            title: 'AccountUpdatorAccountName',
            dataIndex: 'accountUpdatorAccountName',
            width: 120,
        }, {
            title: 'AccountUpdatedTime',
            dataIndex: 'accountUpdatedTime',
            sorter: (a, b) => moment(a.accountUpdatedTime) - moment(b.accountUpdatedTime),
            width: 150,
        }, {
            title: 'AccountRemarks',
            dataIndex: 'accountRemarks',
            width: 150,
        }, {
            title: 'Opera',
            dataIndex: 'opera',
            width: 100,
            render: (text, record) =>
                <div className='opera'>
                        <span onClick={() => editClick(record.accountId)}>
                            <Icon type="edit"/> update
                        </span><br/>
                    <span><Popconfirm title="Are you sure you want to delete?" onConfirm={() => onDelete(record.accountId)}><Icon
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