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
import EventView from "@/components/EventView";
import UpdateEvent from "@/components/UpdateEvent";

type TableData = {
  eventID: string;
  eventTitle: string;
  eventDirectorTeacher: string;
  eventDirectorStudent: string;
  teacherContactNo: number;
  eventStartDate: number;
  eventEndDate: number;
  eventStartTime: number;
  description: string;
  visibility: string;
  createdBy: string;
  updatedBy: string;
};
interface FormInput {
  eventTitle: string;
  eventDirectorTeacher: string;
  eventDirectorStudent: string;
  eventStartDate: number;
}

export default function EventsView() {
  const { data, loading, refetch } = useFetch(
    `http://143.110.190.164:3001/teacher/event/find/all`
  );
  const [eventID, setEventID] = useState<string | null>(null);
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
    { key: "2", title: "Event Title", dataIndex: "eventTitle" },
    { key: "3", title: "E.D.Teacher", dataIndex: "eventDirectorTeacher" },
    { key: "4", title: "E.D.Student", dataIndex: "eventDirectorStudent" },
    { key: "5", title: "Start Date", dataIndex: "eventStartDate" },
    {
      key: "5",
      title: "Actions",
      render: (record: TableData) => {
        return (
          <>
            <FileOutlined
              className="mr-3"
              onClick={() => onViewExpense(record.eventID)}
            />
            <EditOutlined onClick={() => onEditExpense(record.eventID)} />
            <DeleteOutlined
              onClick={() => onDeleteExpense(record.eventID)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onViewExpense = (eventID: string) => {
    setEventID(eventID);
    showViewModal();
  };

  const onEditExpense = (eventID: string) => {
    setEventID(eventID);
    showModal();
    refetch();
  };

  const onDeleteExpense = (eventID: string) => {
    axios
      .delete(`http://143.110.190.164:3001/teacher/event/delete/${eventID}`)
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
              All Event View
            </h1>
            <Link href="/events">
              <Button type="default" className="flex items-center">
                Add Event
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
              rowKey={(record) => record.eventID}
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
            {eventID && (
              <UpdateEvent
                eventID={eventID}
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
            {eventID && <EventView eventID={eventID} />}
          </Modal>
        </div>
      </section>
    </>
  );
}
