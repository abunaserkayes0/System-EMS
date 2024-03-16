// app.tsx
"use client";
import React, { useState } from "react";
import { Button, Table, Form, Input, Modal, Checkbox } from "antd";
import { useForm, Controller } from "react-hook-form";
import {
  EditOutlined,
  CloseSquareOutlined,
  PlusOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import HeaderDiv from "@/components/header";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

type FormInput = {
  name: string;
  id: string;
  dob: string;
  fatherName: string;
  contactNo: string;
};

const onChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`);
};
const demoData: FormInput[] = [
  {
    name: "John Doe",
    id: "1",
    dob: "09-10-2000",

    fatherName: "Doe Sr.",
    contactNo: "123-456-7890",
  },
  {
    name: "Jane Doe",
    id: "2",
    dob: "19-10-2001",

    fatherName: "Doe Sr.",
    contactNo: "987-654-3210",
  },
  // Add more data as needed
];
const AdmissionView: React.FC = () => {
  const [dataSource, setDataSource] = useState<FormInput[]>([]);

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

    {
      key: "2",
      title: "Student Name",
      dataIndex: "name",
      render: (_text: any, record: FormInput) => (
        <>
          <p>{record.name}</p>

          <span>{record.contactNo}</span>
        </>
      ),
    },

    // {
    //   key: "6",
    //   title: "Actions",
    //   render: (record: FormInput) => {
    //     return (
    //       <>
    //         <EditOutlined onClick={() => onEditExpense(record)} />
    //         <DeleteOutlined
    //           onClick={() => onDeleteExpense(record)}
    //           style={{ color: "red", marginLeft: 12 }}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];
  const onChange = (e: CheckboxChangeEvent, record: FormInput) => {
    console.log(`checked = ${e.target.checked} for student ID: ${record.id}`);
    // You can do something with the checked value and record data here
  };

  return (
    <section className="bg-[#ecf0f1]">
      <div className="flex flex-col container px-6 py-6">
        <HeaderDiv />
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
            <div className="bg-white flex flex-row justify-between items-center  mt-8 px-4 py-2">
              <h1 className="text-lg" style={{ color: "#263238" }}>
                All Students
              </h1>
              <button className="bg-[#2c5ff7] rounded-md px-4 py-1">
                <PlusOutlined className="text-white font-bold text-lg" />
              </button>
            </div>
            <div className="w-full mt-12 mb-12 ">
              <Table
                columns={columns}
                dataSource={demoData}
                pagination={false}
              />
            </div>
          </div>
          <div className="w-8/12 px-4 mt-8 bg-white py-6">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row space-x-4">
                <img src="/person.png" />
                <div className="flex flex-col">
                  <p className="text-base">Macachev Romuvo Agustin</p>
                  <p className="text-sm">Class 10</p>
                  <p className="text-sm">Session: 2015-2016</p>
                  <p className="text-sm">Student ID: 2535 </p>
                </div>
              </div>
              <div className="flex flex-row space-x-4">
                <EditOutlined />
                <CloseSquareOutlined />
                <MoreOutlined />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-base mt-6">Student's name: Jane doe</p>
              <p className="text-base mt-6">Father's name: John doe</p>

              <p className="text-base mt-6">Mother's name: Janet doe</p>

              <p className="text-base mt-6">Teacher's Mobile Number: 00000</p>
              <p className="text-base mt-6">Father's Mobile Number: 00000</p>

              <p className="text-base mt-6">Mother's Mobile Number: 00000</p>
              <p className="text-base mt-6">Present Address: ABC</p>
              <p className="text-base mt-6">Nationality: Bangladeshi</p>
              <p className="text-base mt-6">Religion: Muslim</p>
              <p className="text-base mt-6">Blood Group: B+</p>
              <p className="text-base mt-6">Date of Birth: 02.08.2000</p>
              <p className="text-base mt-6">Educational Qualification: SSC</p>
              <p className="text-base mt-6">Payment Number: 012823</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionView;
