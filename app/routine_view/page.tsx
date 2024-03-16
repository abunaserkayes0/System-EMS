// app.tsx
"use client";
import React, { useState } from "react";
import { Button, Table, Modal, Checkbox } from "antd";
import { useForm, Controller } from "react-hook-form";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import HeaderDiv from "@/components/header";

import type { CheckboxChangeEvent } from "antd/es/checkbox";
type FormInput = {
  class: string;
  section: string;
  subject: string;
  time: string;
  day: string;
  id: string;
};
interface TableData {}
const onChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`);
};
const demoData: FormInput[] = [
  {
    class: "John Doe",
    id: "1",

    section: "A",

    subject: "Maths",
    time: "123-456-7890",
    day: "sun",
  },
  {
    class: "John Doe",
    id: "2",

    section: "A",

    subject: "Maths",
    time: "123-456-7890",
    day: "sun",
  },
  // Add more data as needed
];
const RoutineView: React.FC = () => {
  const [dataSource, setDataSource] = useState<TableData[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();

  const columns = [
    {
      key: "1",
      title: "Select",
      dataIndex: "date",
      render: (_text: any, record: FormInput) => (
        <Checkbox onChange={(e) => onChange(e, record)} />
      ),
    },
    { key: "2", title: "Class", dataIndex: "class" },
    { key: "3", title: "Section", dataIndex: "section" },
    { key: "4", title: "Subject", dataIndex: "subject" },
    { key: "5", title: "Time", dataIndex: "time" },
    { key: "6", title: "Day", dataIndex: "day" },

    {
      key: "7",
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
  const onChange = (e: CheckboxChangeEvent, record: FormInput) => {
    console.log(`checked = ${e.target.checked} for student ID: ${record.id}`);
    // You can do something with the checked value and record data here
  };
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
            Schedule View
          </h1>
          <button className="bg-[#2c5ff7] rounded-md px-4 py-1">
            <PlusOutlined className="text-white font-semibold text-sm" />
            <span className="text-white font-semibold text-sm ml-1">New</span>
          </button>
        </div>
        <div className="w-full mt-12 mb-12 ">
          <Table columns={columns} dataSource={demoData} pagination={false} />
        </div>
      </div>
    </section>
  );
};

export default RoutineView;
