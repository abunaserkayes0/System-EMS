import React, { useState } from "react";
import { singleData } from "@/app/notice_view/page";
import { MdOutlineDelete, MdOutlineUpdate } from "react-icons/md";
import { Modal } from "antd";
import UpdateNotice from "./UpdateNotice";
import axios from "axios";
import Swal from "sweetalert2";

interface SingleNoticeViewProps {
  singleData: singleData;
  refetch: () => void;
  data: singleData[];
}

export default function SingleNoticeView({
  singleData,
  refetch,
  data
}: SingleNoticeViewProps) {
  const { noticeID, title, date, description, createdBy } = singleData;

  const handelDelete = (noticeID: string) => {
    axios
      .delete(`http://143.110.190.164:3001/teacher/notice/delete/${noticeID}`)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Notice Deleted Successfully",
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

  return (
    <section className="border-orange-400 border-b-4 p-5">
      <div className="flex justify-between">
        <div>
          <div>
            <h2 className="font-semibold uppercase">{createdBy}</h2>
            <span>{date}</span>
          </div>
        </div>
        <div className="flex gap-x-2">
          <MdOutlineDelete
            onClick={() => handelDelete(noticeID)}
            className="cursor-pointer"
            size={20}
          />
          <MdOutlineUpdate
            onClick={() => showModal()}
            className="cursor-pointer"
            size={20}
          />
          <Modal
            title="Edit Notice"
            visible={isModalOpen}
            onCancel={handleCancel}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
            width={1000}
          >
            {noticeID && (
              <UpdateNotice
                noticeID={noticeID}
                setIsModalOpen={setIsModalOpen}
                refetch={refetch}
                data={data}
              />
            )}
          </Modal>
        </div>
      </div>
      <div className="my-3">
        <h2 className="font-bold">{title}</h2>
        <p className="text-base text-slate-500">{description}</p>
      </div>
    </section>
  );
}
