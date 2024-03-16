"use client";
import React, { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { Button, Modal, Table } from "antd";
import { useForm } from "react-hook-form";
import {
  EditOutlined,
  DeleteOutlined,
  CloseSquareOutlined,
  FileOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { CiViewList } from "react-icons/ci";
import UpdateTask from "@/components/UpdateTask";
import { FormInput } from "../expense_form/page";
import UpdateExpense from "@/components/UpdateExpense";
import { stringify } from "querystring";
import ViewExpense from "@/components/ViewExpense";
import HeaderDiv from "@/components/header";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import Swal from "sweetalert2";
export default function ExpenseView() {
  const { data, loading, refetch } = useFetch(
    `http://143.110.190.164:3001/accounts/expense/find/all`
  );

  interface TableData {
    expenseID: string;
    itemName: string;
    itemQuantity: number;
    itemCategory: string;
    purchaseDate: string;
    amount: number;
    description: string;
    createdBy: string;
  }

  const [dataSource, setDataSource] = useState<TableData[]>([]);
  const [expenseID, setExpenseID] = useState<string | null>(null);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);

  const showUpdateModal = () => {
    setIsModalUpdateOpen(true);
  };

  const handleUpdateOk = () => {
    setIsModalUpdateOpen(false);
  };

  const handleUpdateCancel = () => {
    setIsModalUpdateOpen(false);
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
    { key: "1", title: "expense ID", dataIndex: "expenseID", align: "center" },
    { key: "2", title: "Items Name", dataIndex: "itemName", align: "center" },
    {
      key: "3",
      title: "Item Quantity",
      dataIndex: "itemQuantity",
      align: "center",
    },
    {
      key: "4",
      title: "PurchaseDate",
      dataIndex: "purchaseDate",
      align: "center",
    },
    { key: "5", title: "Amount", dataIndex: "amount", align: "center" },
    { key: "6", title: "Created By", dataIndex: "createdBy", align: "center" },
    {
      key: "7",
      title: "Actions",
      render: (record: FormInput) => {
        return (
          <>
            <FileOutlined
              className="mr-3"
              onClick={() => onViewExpense(record.expenseID)}
            />
            <EditOutlined onClick={() => onEditExpense(record.expenseID)} />
            <DeleteOutlined
              onClick={() => onDeleteExpense(record.expenseID)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onViewExpense = (expenseID: string) => {
    setExpenseID(expenseID);
    showViewModal();
  };

  const onEditExpense = (expenseID: string) => {
    setExpenseID(expenseID);
    showUpdateModal();
  };

  const onDeleteExpense = (expenseID: string) => {
    axios
      .delete(
        `http://143.110.190.164:3001/accounts/expense/delete/${expenseID}`
      )
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Expense Deleted Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Failed to Delete Expense",
            showConfirmButton: false,
            timer: 1500,
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
              Expense Form
            </h1>
            <Link href="/expense_form">
              <Button className="flex items-center" type="default">
                Add Expense
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
              rowKey={(record) => record.expenseID}
              className="w-full"
            />
          )}
          <Modal
            title="Edit Student"
            visible={isModalUpdateOpen}
            onCancel={handleUpdateCancel}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
            width={1000}
          >
            {expenseID && <UpdateExpense expenseID={expenseID} setIsModalUpdateOpen={setIsModalUpdateOpen} refetch={refetch}/>}
          </Modal>
          <Modal
            title="Show Student"
            visible={isModalViewOpen}
            onCancel={handleViewCancel}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
            width={1000}
          >
            {expenseID && <ViewExpense expenseID={expenseID} />}
          </Modal>
        </div>
      </section>
    </>
  );
}
