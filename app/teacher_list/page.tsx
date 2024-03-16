"use client";
import React, { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { Button, Modal, Table } from "antd";
import { useForm } from "react-hook-form";
import {
  EditOutlined,
  DeleteOutlined,
  FileOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";
import HeaderDiv from "@/components/header";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import Swal from "sweetalert2";
import { FormInput } from "../teacher_form/page";
import UpdateTeacher from "@/components/UpdateTeacher";
import TeacherView from "@/components/TeacherView";

interface TableData {
  educationInfo: {
    instituteName: string;
    completeYear: number;
    resultPoint: number;
  };
  _id: string;
  teacherID: string;
  name: string;
  email: string;
  mobileNumber: string;
  joiningDate: string;
  religion: string;
  nationality: string;
  gender: string;
  employeeExperienceYear: number;
  NID: string;
  picture: string;
  experienceSubject: string;
  address: string;
  designation: string;
  salaryAmount: number;
}

type FormData = {
  teacherID: string;
  name: string;
  designation: string;
  experienceSubject: string;
  instituteName: string;
};

export default function TeacherList() {
  const { data, loading, refetch } = useFetch(
    "http://143.110.190.164:3001/admin/teacher/profile/find/all"
  );

  const [teacherID, setTeacherID] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showViewModal = () => {
    setIsModalViewOpen(true);
  };

  const handleViewOk = () => {
    setIsModalViewOpen(false);
  };

  const handleViewCancel = () => {
    setIsModalViewOpen(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TableData>();

  const columns = [
    { key: "1", title: "Teacher Id", dataIndex: "teacherID", align: "center" },
    { key: "2", title: "Name", dataIndex: "name", align: "center" },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
      key: "4",
      title: "TeacherDesignation",
      dataIndex: "designation",
      align: "center",
    },
    {
      key: "5",
      title: "Actions",
      render: (record: FormInput) => {
        return (
          <>
            <FileOutlined
              className="mr-3"
              onClick={() => onViewExpense(record.teacherID)}
            />
            <EditOutlined onClick={() => onEditExpense(record.teacherID)} />
            <DeleteOutlined
              onClick={() => onDeleteExpense(record.teacherID)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onViewExpense = (teacherID: string) => {
    setTeacherID(teacherID);
    showViewModal();
  };

  const onEditExpense = (teacherID: string) => {
    setTeacherID(teacherID);
    showModal();
    refetch();
  };

  const onDeleteExpense = (teacherID: string) => {
    axios
      .delete(`http://143.110.190.164:3001/admin/profile/delete/${teacherID}`)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Admin Deleted Successfully",
          });
          refetch();
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <>
      <section className="bg-[#ecf0f1]">
        <div className="flex flex-col container px-6 py-6">
          <HeaderDiv />
          <div className="bg-white flex flex-row justify-between my-8 px-4 py-2">
            <h1 className="text-lg" style={{ color: "#263238" }}>
              Teacher List
            </h1>
            <Link href="/teacher_form">
              <Button type="default" className="flex items-center">
                Add Teacher
                <PlusOutlined />
              </Button>
            </Link>
          </div>
          {loading ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <Table
              dataSource={data}
              columns={columns}
              rowKey={(record) => record.teacherID}
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
            {teacherID && (
              <UpdateTeacher
                teacherId={teacherID}
                setIsModalOpen={setIsModalOpen}
                refetch={refetch}
              />
            )}
          </Modal>
          <Modal
            title="Show Student"
            visible={isModalViewOpen}
            onCancel={handleViewCancel}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
            width={1000}
          >
            {teacherID && <TeacherView teacherID={teacherID} />}
          </Modal>
        </div>
      </section>
    </>
  );
}
