// app.tsx
"use client";
import React, { useState } from "react";
import { Table, Modal, Checkbox, Button } from "antd";
import { useForm } from "react-hook-form";
import {
  EditOutlined,
  DeleteOutlined,
  CloseSquareOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import HeaderDiv from "@/components/header";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import UpdateStudent from "@/components/UpdateStudents";
import UpdateClassroom from "@/components/UpdateClassroom";
import Spinner from "@/components/Spinner";
import Link from "next/link";
type FormData = {
  date: string;
  classID: string;
  className: string;
  section: string;
  shift: string;
  year: string;
};
interface TableData {
  id: "1";
  name: "has";
  section: "A";
  year: "2016";
}
const StudentList: React.FC = () => {
  const [dataSource, setDataSource] = useState<TableData[]>([]);
  const [classID, setStudentId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data, loading } = useFetch(
    "http://143.110.190.164:3001/admin/classroom/find/all"
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();

  const columns = [
    /* {
      key: "1",
      title: "Select",
      dataIndex: "date",
      render: (_text: string, record: FormData) => (
        <Checkbox onChange={(e) => onChange(e, record)} />
      ),
    }, */
    { key: "2", title: "Class ID", dataIndex: "classID" },
    { key: "3", title: "ClassName", dataIndex: "className" },
    { key: "4", title: "Section", dataIndex: "section" },
    { key: "5", title: "Shift", dataIndex: "shift" },
    { key: "6", title: "Year", dataIndex: "year" },
    {
      key: "7",
      title: "Actions",
      render: (record: FormInput) => {
        return (
          <>
            <EditOutlined onClick={() => onEditExpense(record.classID)} />
            <DeleteOutlined
              onClick={() => onDeleteExpense(record.classID)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onEditExpense = (classID: string) => {
    setStudentId(classID);
    showModal();
  };
  
  const onDeleteExpense = (classID: string) => {
    axios
      .delete(`http://143.110.190.164:3001/admin/classroom/delete/${classID}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="bg-[#ecf0f1]">
      <div className="flex flex-col container px-6 py-6">
        <HeaderDiv />
        <div className="bg-white flex flex-row justify-between mb-3 mt-8 px-4 py-2">
          <h1 className="text-lg" style={{ color: "#263238" }}>
            ClassRoom List
          </h1>
          <Link href="/classroom_form">
            <Button className="flex items-center" type="default">
              Add Classroom
              <PlusOutlined />
            </Button>
          </Link>
        </div>
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <Table
              dataSource={data}
              columns={columns}
              pagination={false}
              className="w-full"
              rowKey={(record) => record.classID}
            />
          )}
          <Modal
            title="Edit Classroom Details"
            visible={isModalOpen}
            onCancel={handleCancel}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
            width={1000}
          >
            {classID && <UpdateClassroom classID={classID} />}
          </Modal>
        </div>
      </div>
    </section>
  );
};

export default StudentList;
