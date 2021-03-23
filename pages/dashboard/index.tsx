import React from "react";
import { Typography, Table, TablePaginationConfig, Space } from "antd";
import { useRouter } from "next/router";

import Image from "next/image";

import { HeaderSidebar as Layout } from "../../layouts";

import { GetServerSideProps, GetStaticProps } from "next";
import { ColumnsType } from "antd/lib/table";
import { FilterValue, SorterResult } from "antd/lib/table/interface";

const { Title } = Typography;

const columns: ColumnsType<any> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: true,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    sorter: true,
  },
  {
    title: "Service",
    dataIndex: "service",
    key: "service",
    sorter: true,
  },
  {
    title: "Date Of Visit",
    dataIndex: "dateOfVisit",
    key: "dateOfVisit",
    sorter: true,
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a>View</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const Dashboard = ({ inquiries }) => {
  const { push, query } = useRouter();

  const { sort = null } = query;

  const onTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<any> | SorterResult<any>[]
  ) => {
    const { field, order }: any = sorter;
    if (field && order) {
      push({
        pathname: "/dashboard",
        query: {
          ...query,
          sort: `${!query ? "?" : ""}${field} ${
            order === "ascend" ? "asc" : "desc"
          }`,
        },
      });
    } else {
      const { sort, ...q } = query;
      push({
        pathname: "/dashboard",
        query: {
          ...q,
        },
      });
    }
  };
  return (
    <Layout>
      <Title>Inquiries</Title>
      <Table
        rowKey={(record) => record.id}
        onChange={onTableChange}
        dataSource={inquiries}
        columns={columns}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query: any = context.query;
  const params = new URLSearchParams(query);

  const res = await fetch(
    process.env.BASE_URL + `/api/inquiry?${params.toString() || ""}`
  );
  const inquiries = await res.json();

  return {
    props: {
      inquiries: inquiries.rows,
      count: inquiries.count,
    },
  };
};

export default Dashboard;
