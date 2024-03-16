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
import UpdateAdmin from "@/components/UpdateAdmin";
import AdminView from "@/components/AdminView";
import { FormInput } from "../admin_form/page";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import Swal from "sweetalert2";
export default function AdminList() {
  const { data, loading, refetch } = useFetch(
    `http://143.110.190.164:3001/admin/profile/find/all`
  );

  interface TableData {
    adminID: string;
    name: string;
    email: string;
    adminDesignation: string;
  }

  const [adminID, setAdminID] = useState<string | null>(null);
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
  } = useForm<FormInput>();

  const columns = [
    { key: "1", title: "Admin Id", dataIndex: "adminID", align: "center" },
    { key: "2", title: "Name", dataIndex: "name", align: "center" },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
      key: "4",
      title: "AdminDesignation",
      dataIndex: "adminDesignation",
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
              onClick={() => onViewExpense(record.adminID)}
            />
            <EditOutlined onClick={() => onEditExpense(record.adminID)} />
            <DeleteOutlined
              onClick={() => onDeleteExpense(record.adminID)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onViewExpense = (adminID: string) => {
    setAdminID(adminID);
    showViewModal();
  };

  const onEditExpense = (adminID: string) => {
    setAdminID(adminID);
    showModal();
    refetch();
  };

  const onDeleteExpense = (adminID: string) => {
    axios
      .delete(`http://143.110.190.164:3001/admin/profile/delete/${adminID}`)
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
              Admin List
            </h1>
            <Link href="/admin_form">
              <Button type="default" className="flex items-center">
                Add Admin
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
              rowKey={(record) => record.adminID}
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
            {adminID && (
              <UpdateAdmin adminID={adminID} setIsModalOpen={setIsModalOpen} refetch={refetch}/>
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
            {adminID && <AdminView adminID={adminID} />}
          </Modal>
        </div>
      </section>
    </>
  );
}
