import 'antd/dist/reset.css';
import React, { useState } from "react";
import { Table, Dropdown, Input, Card, Button, Space } from "antd";
import { CaretDownOutlined } from '@ant-design/icons';
import { data } from "./data"
import './product.css'

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    style: { backgroundColor: "#ADD8E6" }
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
];
const items = [
  {
    label: "Cheapest Five Items",
    key: 'cheapest',
  },
  {
    label: "All Items",
    key: 'all',
  },
];

const Product = () => {
  const [viewType, setViewType] = useState("cheapest");
  const [filteredData, setFilteredData] = useState(
    data.sort((a, b) => a.price - b.price).slice(0, 5)
  );

  const handleViewTypeChange = (e) => {
    setViewType(e.key);
    if (e.key === "all") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data
          .sort((a, b) => a.price - b.price)
          .slice(0, 5)
      );
    }
  };

  const handleFilterChange = (e) => {
    if ((e.target.value) || (e.target.value === '' && viewType === 'all')) {
      setFilteredData(
        data.filter((item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
    else if (e.target.value === '' && viewType === 'cheapest') {
      setFilteredData(
        data.sort((a, b) => a.price - b.price).slice(0, 5)
      )

    }

  };

  const menuProps = {
    items,
    onClick: handleViewTypeChange,
  };

  return (
    <Card
      bordered={false}
      style={{ width: '600px', position: 'absolute', top: '100px', left: '400px' }}
      headStyle={{
        padding: '10px',
        border: '1px solid #a8c6fa',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
      }}
      bodyStyle={{
        padding: '40px',
        // padding: 0,
        border: '1px solid #a8c6fa',
        borderBottomRightRadius: '10px',
        borderBottomLeftRadius: '10px',
      }}
      extra={
        <div>
          <Dropdown menu={menuProps}>
            <Button style={{ position: 'absolute', top: '21px', left: '21px' }}>
              <Space>
                {viewType === "cheapest" ? "Cheapest Five Items" : "All Items"}
                <CaretDownOutlined />
              </Space>
            </Button>
          </Dropdown>

          <Input
            placeholder="Filter by name"
            style={{ width: 200, margin: "10px 0" }}
            // style={{ width: "300px", margin: "10px 0" }}
            onChange={handleFilterChange}
          />
        </div>
      }
    >
      <div>
        <Table
          dataSource={filteredData}
          columns={columns}
          bordered
          pagination={false}
        />
      </div>
    </Card>
  );
};

export default Product;
