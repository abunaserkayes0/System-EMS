// app.tsx
"use client";
import React, { useState } from "react";
import { Button, Table, Form, Input, Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  TeamOutlined,
  FieldTimeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import HeaderDiv from "@/components/header";

type FormInput = {
  section: string;
  group: string;
  year: string;
};
interface TableData {
  id: "1";
  name: "has";
  section: "A";
  year: "2016";
}
const RoutineList: React.FC = () => {
  const [dataSource, setDataSource] = useState<TableData[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();

  const columns = [
    { key: "1", title: "Student ID", dataIndex: "id" },
    { key: "2", title: "Name", dataIndex: "name" },
    { key: "3", title: "Section", dataIndex: "section" },
    { key: "4", title: "Year", dataIndex: "year" },
    { key: "5", title: "Group", dataIndex: "group" },
    { key: "6", title: "Amount", dataIndex: "amount" },
    { key: "7", title: "Status", dataIndex: "status" },
    { key: "8", title: "Phone", dataIndex: "phone" },
    { key: "9", title: "Email", dataIndex: "email" },
    {
      key: "10",
      title: "Actions",
      render: (record: FormInput) => {
        return (
          <>
            <EditOutlined onClick={() => onEditExpense(record)} />
            <DeleteOutlined
              onClick={() => onDeleteExpense(record)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onEditExpense = (record: FormInput) => {
    // Logic to edit the selected expense
  };

  const onDeleteExpense = (record: FormInput) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this expense?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => pre.filter((form) => form !== record));
      },
    });
  };

  return (
    <section className="bg-[#ecf0f1]">
      <div className="flex flex-col container px-6 py-6">
        <HeaderDiv />
        <div className="bg-white flex flex-row justify-between items-center  mt-8 px-4 py-2">
          <h1 className="text-lg" style={{ color: "#263238" }}>
            All Schedule
          </h1>
          <button className="bg-[#2c5ff7] rounded-md px-4 py-1">
            <PlusOutlined className="text-white font-semibold text-sm" />
            <span className="text-white font-semibold text-sm ml-1">New</span>
          </button>
        </div>
        <div className="mb-24">
          <div className="border border-l-4 mt-12 border-l-primary bg-white  px-4 py-2 w-6/12 mx-4 rounded-md">
            <div className="flex flex-row">
              <FieldTimeOutlined />
              <p className="ml-2">
                Section A, 1st year, Science Group, Date:02/02/23
              </p>
            </div>
          </div>
          <div className="border border-l-4 mt-2 border-l-primary bg-white  px-4 py-2 w-6/12 mx-4 rounded-md">
            <div className="flex flex-row">
              <FieldTimeOutlined />
              <p className="ml-2">
                Section A, 1st year, Science Group, Date:02/02/23
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoutineList;
