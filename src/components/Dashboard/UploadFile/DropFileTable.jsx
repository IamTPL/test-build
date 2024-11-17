import React, { useEffect, useState } from "react";
import { Table, Button, Space, Select } from "antd";
import { DeleteOutlined, FileTextOutlined } from "@ant-design/icons";

const DropFileTable = ({ data, onChangeSelectedBank }) => {
  const [selectedBank, setSelectedBank] = useState({});
  const bankOptions = [
    {
      id: 1,
      name: "HD Bank",
    },
    {
      id: 2,
      name: "Vietcom Bank",
    },
    {
      id: 3,
      name: "Vietin Bank",
    },
    {
      id: 4,
      name: "Techcom Bank",
    },
  ];
  const convertFileSize = (fileSize) =>
    fileSize >= 1000000.0
      ? Number((fileSize / 1000000.0).toFixed(1)) + " MB"
      : Number((fileSize / 1000.0).toFixed(1)) + " KB";

  useEffect(() => {
    console.log("running update selectedBank");
    onChangeSelectedBank(selectedBank);
  }, [selectedBank]);

  const handleChange = (value, key) => {
    setSelectedBank((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

 
  data = data.map((item, index) => ({
    ...item,
    key: index,
  }));

  const columns = [
    {
      title: "File Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex gap-4">
          <FileTextOutlined className="text-2xl" />
          <div>
            <div>{record.file.name}</div>
            <div className="text-gray-500 text-sm">
              {convertFileSize(record.file.size)}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Bank Name",
      key: "bank",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Space wrap>
            <Select
              value={selectedBank[record.key]}
              style={{
                width: 150,
              }}
              onChange={(value) => handleChange(value, record.key)}
              options={bankOptions.map((option) => ({
                value: option.id,
                label: option.name,
              }))}
              placeholder="Select Bank name..."
            />
          </Space>
        </div>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
  );
};

export default DropFileTable;
