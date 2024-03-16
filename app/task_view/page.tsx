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
import UpdateTask from "@/components/UpdateTask";
import ViewTask from "@/components/TaskView";
import HeaderDiv from "@/components/header";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import Swal from "sweetalert2";
export default function TaskView() {
  const { data, loading, refetch } = useFetch(
    `http://143.110.190.164:3001/teacher/task/find/all`
  );
  type FormInput = {
    taskID: string;
    taskTitle: string;
    taskDescription: string;
    taskDueDate: string;
    classID: string;
    courseName: string;
  };
  interface TableData {
    taskID: string;
    taskTitle: string;
    taskDescription: string;
    taskDueDate: string;
    classID: string;
    courseName: string;
  }

  const [dataSource, setDataSource] = useState<TableData[]>([]);
  const [taskID, setTaskID] = useState<string | null>(null);
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
    { key: "1", title: "Task ID", dataIndex: "taskID", align: "center" },
    { key: "2", title: "Task Title", dataIndex: "taskTitle", align: "center" },
    {
      key: "3",
      title: "TaskDue Date",
      dataIndex: "taskDueDate",
      align: "center",
    },
    { key: "4", title: "CourseName", dataIndex: "courseName", align: "center" },
    {
      key: "5",
      title: "Actions",
      render: (record: FormInput) => {
        return (
          <>
            <FileOutlined
              className="mr-3"
              onClick={() => onViewExpense(record.taskID)}
            />
            <EditOutlined onClick={() => onEditExpense(record.taskID)} />
            <DeleteOutlined
              onClick={() => onDeleteExpense(record.taskID)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onViewExpense = (taskID: string) => {
    setTaskID(taskID);
    showViewModal();
  };

  const onEditExpense = (taskID: string) => {
    setTaskID(taskID);
    showModal();
  };

  const onDeleteExpense = (taskID: string) => {
    axios
      .delete(`http://143.110.190.164:3001/teacher/task/delete/${taskID}`)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Task Deleted Successfully",
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
          <div className="bg-white flex flex-row justify-between mb-5 mt-8 px-4 py-2">
            <h1 className="text-lg" style={{ color: "#263238" }}>
              Task Form
            </h1>
            <Link href="/task_form">
              <Button className="flex items-center" type="default">
                Add Task
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
            {taskID && <UpdateTask taskID={taskID} setIsModalOpen={setIsModalOpen} refetch={refetch}/>}
          </Modal>
          <Modal
            title="Show Student"
            visible={isModalViewOpen}
            onCancel={handleViewCancel}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
            width={1000}
          >
            {taskID && <ViewTask taskID={taskID} />}
          </Modal>
        </div>
      </section>
    </>
  );
}
