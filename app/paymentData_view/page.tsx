"use client";
import React, { useState } from "react";
import { Button, Table, Form, Input, Modal, Checkbox } from "antd";
import {
  FileOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import HeaderDiv from "@/components/header";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import PayrollId from "@/components/PayrollView";
import UpdatePayroll from "@/components/UpdatePayroll";
import Link from "next/link";
import Swal from "sweetalert2";

interface FormInput {
  payrollID: string;
  paidTo: string;
  date: string;
  amount: string;
  status: string;
  details: string;
}

const PaymentDataView: React.FC = () => {
  const [payrollID, setPayrollID] = useState<string | null>(null);
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
  const { data, loading, refetch } = useFetch(
    `http://143.110.190.164:3001/accounts/payment/find/all`
  );
  const columns = [
    { key: "1", title: "Paid To", dataIndex: "paidTo", align: "center" },
    { key: "2", title: "date", dataIndex: "date", align: "center" },
    { key: "3", title: "Amount", dataIndex: "amount", align: "center" },

    { key: "4", title: "Status", dataIndex: "status", align: "center" },
    { key: "5", title: "Details", dataIndex: "details", align: "center" },

    {
      key: "6",
      title: "Actions",
      render: (record: FormInput) => {
        return (
          <>
            <FileOutlined
              className="mr-3"
              onClick={() => onViewExpense(record.payrollID)}
            />
            <EditOutlined onClick={() => onEditExpense(record.payrollID)} />
            <DeleteOutlined
              onClick={() => onDeleteExpense(record.payrollID)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onViewExpense = (payrollID: string) => {
    setPayrollID(payrollID);
    showViewModal();
  };

  const onEditExpense = (payrollID: string) => {
    setPayrollID(payrollID);
    showModal();
  };

  const onDeleteExpense = (payrollID: string) => {
    axios
      .delete(
        `http://143.110.190.164:3001/accounts/payment/delete/${payrollID}`
      )
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Notice Deleted Successfully",
            showConfirmButton: true,
            timer: 1500,
          });
          refetch();
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong",
          });
        }
      });
  };

  return (
    <section className="bg-[#ecf0f1]">
      <div className="flex flex-col container px-6 py-6">
        <HeaderDiv />
        <div className="bg-white flex flex-row justify-between items-center  mt-8 px-4 py-2">
          <h1 className="text-lg" style={{ color: "#263238" }}>
            Payment View
          </h1>
          <Link href="/paymentData_entry">
            <Button className="flex items-center" type="default">
              Add Payment
              <PlusOutlined />
            </Button>
          </Link>
        </div>
        <div className="w-full mt-12 mb-12 ">
          <Table columns={columns} dataSource={data} pagination={false} />
          <Modal
            title="Edit Student"
            visible={isModalOpen}
            onCancel={handleCancel}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
            width={1000}
          >
            {payrollID && (
              <UpdatePayroll
                payrollID={payrollID}
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
            {payrollID && <PayrollId payrollID={payrollID} />}
          </Modal>
        </div>
      </div>
    </section>
  );
};

export default PaymentDataView;
