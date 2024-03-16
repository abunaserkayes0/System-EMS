// app.tsx
"use client";
import React, { useState } from "react";
import { Table, Modal, Checkbox, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import HeaderDiv from "@/components/header";

import type { CheckboxChangeEvent } from "antd/es/checkbox";
import Link from "next/link";
type FormInput = {
  name: string;
  stdID: string;
  month: string;
  present: string;
  absent: string;
};
interface TableData {}
const onChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`);
};
const demoData: FormInput[] = [
  {
    name: "John Doe",
    stdID: "1",

    month: "Jan",

    present: "20",
    absent: "5",
  },
  {
    name: "Jane Doe",
    stdID: "10",

    month: "March",

    present: "10",
    absent: "15",
  },
  // Add more data as needed
];
const AttendanceView: React.FC = () => {
  const [dataSource, setDataSource] = useState<TableData[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();

  const onSubmit = async (data: FormInput) => {
    // try {
    //   startLoading();
    //   const date = new Date(data.date);
    //   // Prepare the data to send to the createInventory function
    //   const expenseObj = {
    //     amount: data.amount,
    //     status: data.status,
    //     type: data.type,
    //     date,
    //     description: data.description,
    //   };
    //   // Call the createInventory function to send the data to the server
    //   const createdExpense = await createExpense(expenseObj);
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   reset();
    //   stopLoading();
    // } catch (error) {
    //   console.error("Error creating expense:", error);
    //   stopLoading();
    // }
  };
  const columns = [
    {
      key: "1",
      title: "Select",

      render: (_text: any, record: FormInput) => (
        <Checkbox onChange={(e) => onChange(e, record)} />
      ),
    },
    { key: "2", title: "Name", dataIndex: "name" },
    { key: "3", title: "STD ID", dataIndex: "stdID" },
    { key: "4", title: "Month", dataIndex: "month" },
    { key: "5", title: "Presence", dataIndex: "present" },
    { key: "6", title: "Absent", dataIndex: "absent" },

    {
      key: "7",
      title: "Action",
      render: (record: FormInput) => {
        return (
          <div className="bg-[#09aed3] px-0 w-20 py-1">
            <p className="text-white text-center">View</p>
            {/* <EditOutlined onClick={() => onEditExpense(record)} />
            <DeleteOutlined
              onClick={() => onDeleteExpense(record)}
              style={{ color: "red", marginLeft: 12 }}
            /> */}
          </div>
        );
      },
    },
  ];
  const onChange = (e: CheckboxChangeEvent, record: FormInput) => {
    console.log(
      `checked = ${e.target.checked} for student ID: ${record.stdID}`
    );
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
            Attendance View
          </h1>
          <Link href="/attendance_form">
            <Button className="flex items-center" type="default">
              Add Attendance
              <PlusOutlined />
            </Button>
          </Link>
        </div>
        <div className="w-full mt-12 mb-12 ">
          <Table columns={columns} dataSource={demoData} pagination={false} />
        </div>
      </div>
    </section>
  );
};

export default AttendanceView;
