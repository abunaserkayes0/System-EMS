// app.tsx
"use client";
import React, { useState } from "react";
import { Button, Table, Form, Input, Modal, Checkbox } from "antd";
import { useForm, Controller } from "react-hook-form";
import {
  EditOutlined,
  DeleteOutlined,
  CloseSquareOutlined,
  FileOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import HeaderDiv from "@/components/header";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import useFetch from "@/hooks/useFetch";
import { FormInput } from "../feeCollection_form/page";
import axios from "axios";
import FeeView from "@/components/FeeView";
import UpdateFee from "@/components/UpdateFee";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import Swal from "sweetalert2";

const FeeCollectionView: React.FC = () => {
  const { data, loading, refetch } = useFetch(
    `http://143.110.190.164:3001/accounts/fee/find/all`
  );

  type FormInput = {
    feeID: string;
    studentID: string;
    classID: string;
    date: string;
    amount: string;
    feeType: string;
    paymentDate: string;
    dueDate: string;
    paymentStatus: string;
  };
  interface TableData {
    feeID: string;
    studentID: string;
    classID: string;
    date: string;
    amount: string;
    feeType: string;
    paymentDate: string;
    dueDate: string;
    paymentStatus: string;
  }

  const [dataSource, setDataSource] = useState<TableData[]>([]);
  const [feeID, setFeeID] = useState<string | null>(null);
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
    { key: "1", title: "Fee ID", dataIndex: "feeID", align: "center" },
    { key: "2", title: "Fee Type", dataIndex: "feeType", align: "center" },
    {
      key: "3",
      title: "Date",
      dataIndex: "date",
      align: "center",
    },
    {
      key: "4",
      title: "PaymentStatus",
      dataIndex: "paymentStatus",
      align: "center",
    },
    { key: "4", title: "DueDate", dataIndex: "dueDate", align: "center" },
    {
      key: "5",
      title: "Actions",
      render: (record: FormInput) => {
        return (
          <>
            <FileOutlined
              className="mr-3"
              onClick={() => onViewExpense(record.feeID)}
            />
            <EditOutlined onClick={() => onEditExpense(record.feeID)} />
            <DeleteOutlined
              onClick={() => onDeleteExpense(record.feeID)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onViewExpense = (feeID: string) => {
    setFeeID(feeID);
    showViewModal();
  };

  const onEditExpense = (feeID: string) => {
    setFeeID(feeID);
    showModal();
  };

  const onDeleteExpense = (feeID: string) => {
    axios
      .delete(`http://143.110.190.164:3001/accounts/fee/delete/${feeID}`)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Fee Deleted Successfully",
          });
          refetch();
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      });
  };

  return (
    <>
      <section className="bg-[#ecf0f1]">
        <div className="flex flex-col container px-6 py-6">
          <HeaderDiv />
          <div className="bg-white flex flex-row justify-between mb-3 mt-8 px-4 py-2">
            <h1 className="text-lg" style={{ color: "#263238" }}>
              Fee Collection List
            </h1>
            <Link href="/feeCollection_form">
              <Button className="flex items-center" type="default">
                Add Fee
                <PlusOutlined />
              </Button>
            </Link>
          </div>
          {loading ? (
            <Spinner />
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
            {feeID && <UpdateFee feeID={feeID} setIsModalOpen={setIsModalOpen} refetch={refetch}/>}
          </Modal>
          <Modal
            title="Show Student"
            visible={isModalViewOpen}
            onCancel={handleViewCancel}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
            width={1000}
          >
            {feeID && <FeeView feeID={feeID} />}
          </Modal>
        </div>
      </section>
    </>
  );
};

export default FeeCollectionView;
