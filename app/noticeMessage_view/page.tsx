"use client";
import React, { useState } from "react";
import { Table, Form, Input, Modal, Button } from "antd";
import {
  FileOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import HeaderDiv from "@/components/header";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import { FormInput } from "../notice_message/page";
import MessageView from "@/components/MessageView";
import UpdateMessage from "@/components/UpdateMessage";
import Link from "next/link";
import Swal from "sweetalert2";

const NoticeMessageView: React.FC = () => {
  const [messageID, setMessageId] = useState<string | null>(null);
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
    `http://143.110.190.164:3001/teacher/message/find/all`
  );

  const columns = [
    { key: "1", title: "MessageId", dataIndex: "messageID", align: "center" },
    { key: "2", title: "Title", dataIndex: "title", align: "center" },
    { key: "3", title: "Date", dataIndex: "date", align: "center" },

    {
      key: "4",
      title: "Actions",
      render: (record: FormInput) => {
        return (
          <>
            <FileOutlined
              className="mr-3"
              onClick={() => onViewExpense(record.messageID)}
            />
            <EditOutlined onClick={() => onEditExpense(record.messageID)} />
            <DeleteOutlined
              onClick={() => onDeleteExpense(record.messageID)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onViewExpense = (messageID: string) => {
    setMessageId(messageID);
    showViewModal();
  };

  const onEditExpense = (messageID: string) => {
    setMessageId(messageID);
    showModal();
  };

  const onDeleteExpense = (messageID: string) => {
    axios
      .delete(`http://143.110.190.164:3001/teacher/message/delete/${messageID}`)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Message Deleted Successfully",
            confirmButtonText: "Ok",
          });
          refetch();
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Message Not Deleted",
            confirmButtonText: "Ok",
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
            Notice Message
          </h1>
          <Link href="/notice_message">
            <Button className="flex items-center" type="default">
              Add Notice Message
              <PlusOutlined />
            </Button>
          </Link>
        </div>
        <div className="w-full mt-12 mb-12 ">
          <Table
            columns={columns}
            rowKey={(record) => record.messageID}
            dataSource={data}
            pagination={false}
          />
          <Modal
            title="Edit Student"
            visible={isModalOpen}
            onCancel={handleCancel}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
            width={1000}
          >
            {messageID && <UpdateMessage messageID={messageID} setIsModalOpen={setIsModalOpen} refetch={refetch}/>}
          </Modal>
          <Modal
            title="Show Student"
            visible={isModalViewOpen}
            onCancel={handleViewCancel}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
            width={1000}
          >
            {messageID && <MessageView messageID={messageID} />}
          </Modal>
        </div>
      </div>
    </section>
  );
};

export default NoticeMessageView;
