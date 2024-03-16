// app.tsx
"use client";
import React, { useState } from "react";
import { Button, Table, Form, Input, Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
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
import Spinner from "@/components/Spinner";
import Link from "next/link";
type FormInput = {
  studentID: string;
  name: string;
};
interface TableData {
  id: "1";
  name: "has";
  section: "A";
  year: "2016";
}
const StudentList: React.FC = () => {
  const [studentId, setStudentId] = useState<string | null>(null);
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
    "http://143.110.190.164:3001/admin/student/profile/find/all"
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();

  const columns = [
    { key: "1", title: "Student ID", dataIndex: "studentID" },
    { key: "2", title: "Name", dataIndex: "name" },
    { key: "3", title: "Section", dataIndex: "section" },
    { key: "4", title: "Year", dataIndex: "dateOfBirth" },
    {
      key: "5",
      title: "Actions",
      render: (record: FormInput) => {
        return (
          <>
            <EditOutlined onClick={() => onEditExpense(record.studentID)} />
            <DeleteOutlined
              onClick={() => onDeleteExpense(record.studentID)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onEditExpense = (studentId: string) => {
    setStudentId(studentId);
    showModal();
  };
  /* const onEditExpense = (studentId: string) => {
    showModal();
    // Logic to edit the selected expense

     axios.put(
      `http://143.110.190.164:3001/admin/student/profile/update/${studentId}`
    );
  }; */

  const onDeleteExpense = (studentId: string) => {
    axios
      .delete(
        `http://143.110.190.164:3001/admin/student/profile/delete/${studentId}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="bg-[#ecf0f1]">
      <div className="flex flex-col container px-6 py-6">
        <HeaderDiv />
        <div className="bg-white flex flex-row justify-between  mt-8 px-4 py-2">
          <h1 className="text-lg" style={{ color: "#263238" }}>
            Student List
          </h1>
          <Link href="/admission_form">
            <Button type="default" className="flex items-center">
              Add Student
              <PlusOutlined />
            </Button>
          </Link>
        </div>
        <div>
          <h2
            style={{ color: "#354856" }}
            className="mt-12 text-center text-4xl"
          >
            Student Profile List
          </h2>
          <div className="w-full mt-12 mb-12 flex justify-center items-center">
            <Form
              layout="vertical"
              className="xl:w-[35%] bg-white lg:w-[50%] md:w-[70%] sm:w-[90%] xs:w-[96%] shadow-md rounded p-8 mx-12"
              // onFinish={handleSubmit(onSubmit)}
            >
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name required" }}
                render={({ field }) => (
                  <Form.Item
                    label="Name"
                    validateStatus={errors.name ? "error" : undefined}
                    help={errors.name?.message}
                  >
                    <Input {...field} placeholder="Search by name" />
                  </Form.Item>
                )}
              />

              <Controller
                name="studentID"
                control={control}
                rules={{ required: "ID is required" }}
                render={({ field }) => (
                  <Form.Item
                    label="ID"
                    validateStatus={errors.studentID ? "error" : undefined}
                    help={errors.studentID?.message}
                  >
                    <Input {...field} placeholder="Search by ID" />
                  </Form.Item>
                )}
              />
              <div className="flex justify-center">
                <Button
                  className="px-8 text-gray-800 rounded bg-primary hover:bg-gray-800 hover:text-primary"
                  // type="primary"
                  htmlType="submit"
                >
                  Search
                </Button>
              </div>
            </Form>
          </div>
          {loading ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <Table
              dataSource={data}
              columns={columns}
              pagination={false}
              className="w-full"
            />
          )}
          <Modal
            title="Edit Student"
            visible={isModalOpen}
            onCancel={handleCancel}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
            width={1000}
          >
            {studentId && <UpdateStudent studentId={studentId} />}
          </Modal>
        </div>
      </div>
    </section>
  );
};

export default StudentList;
