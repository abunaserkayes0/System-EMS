import axios from "axios";
import { Avatar, Modal } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { MdDelete, MdEdit, MdUpdate } from "react-icons/md";
import useFetch from "@/hooks/useFetch";
import UpdateEvent from "./UpdateEvent";
import Spinner from "./Spinner";

export type FromProps = {
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

export default function SingleEventInfo() {
  const { eventId } = useParams();
  const [data, setData] = useState<FromProps>({} as FromProps);
  const [loading, setLoading] = useState(true);
  ``;
  const { data: result, setData: setResult } = useFetch(
    "http://143.110.190.164:3001/teacher/event/find/all"
  );
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const showUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };
  const handleUpdateCancel = () => {
    setIsUpdateModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(`http://143.110.190.164:3001/teacher/event/find/${eventId}`)
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [eventId]);

  const handelDelete = (eventId: string) => {
    axios
      .delete(`http://143.110.190.164:3001/teacher/event/delete/${eventId}`)
      .then((response) => {
        if (response.data.success == "Delete successful.") {
          const rest = result.filter((item: any) => item.eventId !== eventId);
          setResult(rest);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const {
    eventID,
    eventTitle,
    eventDirectorTeacher,
    eventDirectorStudent,
    teacherContactNo,
    eventStartDate,
    eventEndDate,
    eventStartTime,
    description,
    visibility,
    createdBy,
    updatedBy,
  } = data;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        data && (
          <>
            <section className="m">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-5">
                  <div>
                    <Avatar shape="square" size={64} icon={<UserOutlined />} />
                  </div>
                  <div className="flex-col">
                    <h3>{eventId}</h3>
                    <h2 className="font-bold text-xl">
                      {eventDirectorTeacher}
                    </h2>
                  </div>
                </div>
                <div className="flex">
                  <div className="">
                    <MdEdit onClick={showUpdateModal} size={20} />
                    <Modal
                      open={isUpdateModalOpen}
                      okButtonProps={{ hidden: true }}
                      cancelButtonProps={{ hidden: true }}
                      onCancel={handleUpdateCancel}
                      width={1000}
                    >
                      <UpdateEvent eventId={eventID} />
                    </Modal>
                  </div>
                  <div>
                    <MdDelete onClick={() => handelDelete(eventID)} size={20} />
                  </div>
                </div>
              </div>
            </section>
            <section className="grid grid-cols-2 text-slate-600">
              <div className="">
                <h2>Event Title</h2>
                <h2>Event Director Teacher</h2>
                <h2>Event Director Student</h2>
                <h2>Teacher Contact No</h2>
                <h2>Event Start Date</h2>
                <h2>Event End Date</h2>
                <h2>Event Start Time</h2>
                <h2>Description</h2>
                <h2>Visibility</h2>
                <h2>Created By</h2>
                <h2>Updated By</h2>
              </div>
              <div>
                <p>{eventTitle}</p>
                <p>{eventDirectorTeacher}</p>
                <p>{eventDirectorStudent}</p>
                <p>{teacherContactNo}</p>
                <p>{eventStartDate}</p>
                <p>{eventEndDate}</p>
                <p>{eventStartTime}</p>
                <p>{description}</p>
                <p>{visibility}</p>
                <p>{createdBy}</p>
                <p>{updatedBy}</p>
              </div>
            </section>
          </>
        )
      )}
    </>
  );
}
