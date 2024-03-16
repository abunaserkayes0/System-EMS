"use client";
import React, { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { Button, Modal, Table } from "antd";
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
import { FormInput } from "../admission_form/page";
import SingleAdmissionView from "@/components/SingleAdmissionView";
import UpdateAdmissionStudent from "@/components/UpdateAdmissionStudent";

export default function AdmissionView() {
  const { data, loading, refetch } = useFetch(
    "http://143.110.190.164:3001/admin/student/admission/find/all"
  );

  const [admissionID, setAdmissionID] = useState<string | null>(null);
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

  const columns = [
    {
      key: "1",
      title: "Admission ID",
      dataIndex: "admissionID",
      align: "center",
    },
    { key: "2", title: "Student Name", dataIndex: "name", align: "center" },
    {
      key: "3",
      title: "Father Name",
      dataIndex: "fatherName",
      align: "center",
    },
    {
      key: "4",
      title: "Contact No.",
      dataIndex: "studentMobileNumber",
      align: "center",
    },
    {
      key: "5",
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      render: (dateOfBirth: string) => dateOfBirth.slice(0, 10),
      align: "center",
    },

    {
      key: "6",
      title: "Approve",
      dataIndex: "approve",
      render: (approve: boolean, record: FormInput) => (
        <Button
          onClick={() => approvedStudent(record.admissionID)}
          type="default"
          disabled={record.isStudent}
        >
          Approve
        </Button>
      ),
      align: "center",
    },

    {
      key: "7",
      title: "Actions",
      render: (record: FormInput) => {
        return (
          <>
            <FileOutlined
              className="mr-3"
              onClick={() => onViewExpense(record.admissionID)}
            />
            <EditOutlined onClick={() => onEditExpense(record.admissionID)} />
            <DeleteOutlined
              onClick={() => onDeleteExpense(record.admissionID)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onViewExpense = (admissionID: string) => {
    setAdmissionID(admissionID);
    showViewModal();
  };

  const onEditExpense = (admissionID: string) => {
    setAdmissionID(admissionID);
    showModal();
    refetch();
  };

  const approvedStudent = (admissionID: string) => {
    axios
      .post(
        `http://143.110.190.164:3001/admin/student/admission/selected/${admissionID}`
      )
      .then((res) => {
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Student Approved Successfully",
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

  const onDeleteExpense = (admissionID: string) => {
    axios
      .delete(
        `http://143.110.190.164:3001/admin/student/admission/delete/${admissionID}`
      )
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
              Admission Students
            </h1>
            <Link href="/admission_form">
              <Button type="default" className="flex items-center">
                Add Student
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
              rowKey={(record) => record.admissionID}
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
            {admissionID && (
              <UpdateAdmissionStudent
                admissionID={admissionID}
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
            {admissionID && <SingleAdmissionView admissionID={admissionID} />}
          </Modal>
        </div>
      </section>
    </>
  );
}
