import React, { useState } from 'react';
import { Input, Space, Table, Tag } from 'antd';
import {
    CloudOutlined,
    DeleteOutlined,
    DownloadOutlined,
    FileSyncOutlined,
} from '@ant-design/icons';

const TableView = () => {
    const [tableData, setTableData] = useState([
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            sex: 'Male',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            sex: 'Male',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            sex: 'Male',
        },
        {
            key: '4',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            sex: 'Male',
        },
        {
            key: '5',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            sex: 'Male',
        },
        {
            key: '6',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            sex: 'Male',
        },
        {
            key: '7',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            sex: 'Male',
        },
        {
            key: '8',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            sex: 'Male',
        },
        {
            key: '9',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            sex: 'Male',
        },
        {
            key: '10',
            name: 'Joe Black',
            age: 32,
            address:
                'Sydney No. 1 Lake Park Sydney No. 1 Lake Park Sydney No. 1 Lake Park',
            sex: 'Male',
        },
    ]);

    const handleInputChange = (key, dataIndex, value) => {
        setTableData((prevData) =>
            prevData.map((record) =>
                record.key === key ? { ...record, [dataIndex]: value } : record
            )
        );
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) =>
                        handleInputChange(record.key, 'name', e.target.value)
                    }
                    className="dynamic-input"
                />
            ),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) =>
                        handleInputChange(record.key, 'age', e.target.value)
                    }
                    className="dynamic-input"
                />
            ),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) =>
                        handleInputChange(record.key, 'address', e.target.value)
                    }
                    className="dynamic-input"
                />
            ),
        },
        {
            title: 'Sex',
            dataIndex: 'sex',
            key: 'sex',
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) =>
                        handleInputChange(record.key, 'sex', e.target.value)
                    }
                    className="dynamic-input"
                />
            ),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address 2',
            className: 'review-column',
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) =>
                        handleInputChange(record.key, 'sex', e.target.value)
                    }
                    className="dynamic-input"
                />
            ),
        },
        {
            title: 'Email',
            dataIndex: 'address',
            key: 'email',
            className: 'review-column',
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) =>
                        handleInputChange(record.key, 'sex', e.target.value)
                    }
                    className="dynamic-input"
                />
            ),
        },
        {
            title: 'IP',
            dataIndex: 'address',
            key: 'ip address',
            className: 'review-column',
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) =>
                        handleInputChange(record.key, 'sex', e.target.value)
                    }
                    className="dynamic-input"
                />
            ),
        },
        {
            title: 'Relationship',
            dataIndex: 'address',
            key: 'relationship',
            className: 'review-column',
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) =>
                        handleInputChange(record.key, 'sex', e.target.value)
                    }
                    className="dynamic-input"
                />
            ),
        },
        {
            title: 'Actions',
            key: 'action',
            className: 'review-column',

            render: () => (
                <div className="flex gap-4">
                    <button>
                        <DeleteOutlined className="text-red-400" />
                    </button>
                    <button>
                        <FileSyncOutlined className="text-blue-400" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <p className="text-end font-bold">FileName.pdf</p>
            <div className="flex justify-between items-center mb-4">
                <p className="font-bold">Review (update as necessary)</p>
                <div className="flex gap-4 items-center">
                    <span className="px-2 py-1 border rounded-lg text-xs text-gray-500">
                        <CloudOutlined className="mr-2" />
                        Saved
                    </span>
                    <button className="px-4 py-1 text-sm font-bold bg-orange-400 text-white rounded-lg flex items-center space-x-2 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300">
                        Dowload <DownloadOutlined className="ml-2" />
                    </button>
                    <button className="text-blue-400 text-sm font-bold hover:underline">
                        Change logs
                    </button>
                    <button className="text-orange-400 text-sm font-bold hover:underline">
                        Add item
                    </button>
                </div>
            </div>
            <div className="w-full overflow-x-auto">
                <Table columns={columns} dataSource={tableData} />
            </div>
        </>
    );
};

export default TableView;
