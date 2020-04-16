import React, {Component} from 'react';
import {Table, Icon, Popconfirm} from 'antd';
import moment from 'moment';

export default class PFormTable extends Component {
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
            title: 'PositionName',
            dataIndex: 'positionName',
            width: 80,
        }, {
            title: 'PositionCreatorName',
            dataIndex: 'positionCreatorName',
            width: 120,
        }, {
            title: 'PositionCreatedTime',
            dataIndex: 'positionCreatedTime',
            sorter: (a, b) => moment(a.positionCreatedTime) - moment(b.positionCreatedTime),
            width: 150,
        }, {
            title: 'PositionUpdatorName',
            dataIndex: 'positionUpdatorName',
            width: 120,
        }, {
            title: 'PositionUpdatedTime',
            dataIndex: 'positionUpdatedTime',
            sorter: (a, b) => moment(a.positionUpdatedTime) - moment(b.positionUpdatedTime),
            width: 150,
        // }, {
        //     title: '备注',
        //     dataIndex: 'employeeRemarks',
        //     width: 150,
        }, {
            title: 'Opera',
            dataIndex: 'opera',
            width: 100,
            render: (text, record) =>
                <div className='opera'>
                        <span onClick={() => editClick(record.positionId)}>
                            <Icon type="edit"/> update
                        </span><br/>
                    <span><Popconfirm title="Are you sure you want to delete?" onConfirm={() => onDelete(record.positionId)}><Icon
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