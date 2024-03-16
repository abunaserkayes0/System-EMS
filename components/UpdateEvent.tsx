"use client";
import { Button, Form, Input, Select, DatePicker, TimePicker } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FromProps } from "./SIngleEventInfo";
import TextArea from "antd/es/input/TextArea";
import Swal from "sweetalert2";
const { Option } = Select;
type eventProps = {
  eventID: string;
  setIsModalOpen: (value: boolean) => void;
  refetch: () => void;
};

export default function UpdateEvent({
  eventID,
  setIsModalOpen,
  refetch,
}: eventProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FromProps>();

  const [eventTitle, setEventTitle] = useState("");
  const [eventDirectorTeacher, setEventDirectorTeacher] = useState("");
  const [eventDirectorStudent, setEventDirectorStudent] = useState("");
  const [teacherContactNo, setTeacherContactNo] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://143.110.190.164:3001/teacher/event/find/${eventID}
        `
      )
      .then((res) => {
        const data = res.data.data;
        setEventTitle(data.eventTitle);
        setEventDirectorTeacher(data.eventDirectorTeacher);
        setEventDirectorStudent(data.eventDirectorStudent);
        setTeacherContactNo(data.teacherContactNo);
        setEventStartDate(data.eventStartDate);
        setEventEndDate(data.eventEndDate);
        setEventStartTime(data.eventStartTime);
        setDescription(data.description);
      })
      .catch((err) => console.log(err));
  }, [eventID]);

  const onSubmit = () => {
    const data = {
      eventTitle,
      eventDirectorTeacher,
      eventDirectorStudent,
      teacherContactNo,
      eventStartDate,
      eventEndDate,
      eventStartTime,
      description,
    };
    axios
      .put(`http://143.110.190.164:3001/teacher/event/update/${eventID}`, data)
      .then((res) => {
        if (res.data) {
          Swal.fire({
            icon: "success",
            title: "Event Updated Successfully",
          });
          refetch();
          setIsModalOpen(false);
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Event Updated Failed",
          });
        }
      });
  };
  return (
    <div className="w-full mb-12  items-center  mt-6  bg-white px-9 py-5 rounded-lg">
      <Form className="px-4" onFinish={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-x-20">
          <Controller
            name="eventTitle"
            control={control}
            render={({ field }) => (
              <Form.Item
                validateStatus={errors.eventTitle ? "error" : undefined}
                help={errors.eventTitle?.message}
              >
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Event Title"
                  onChange={(e) => setEventTitle(e.target.value)}
                  value={eventTitle}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="eventDirectorTeacher"
            control={control}
            render={({ field }) => (
              <Form.Item
                validateStatus={
                  errors.eventDirectorTeacher ? "error" : undefined
                }
                help={errors.eventDirectorTeacher?.message}
              >
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="E.Director Name(Teacher)"
                  onChange={(e) => setEventDirectorTeacher(e.target.value)}
                  value={eventDirectorTeacher}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="eventDirectorStudent"
            control={control}
            render={({ field }) => (
              <Form.Item
                validateStatus={
                  errors.eventDirectorStudent ? "error" : undefined
                }
                help={errors.eventDirectorStudent?.message}
              >
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="E.Director Name(Student)"
                  onChange={(e) => setEventDirectorStudent(e.target.value)}
                  value={eventDirectorStudent}
                />
              </Form.Item>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-x-20">
          <Controller
            name="teacherContactNo"
            control={control}
            render={({ field }) => (
              <Form.Item
                validateStatus={errors.teacherContactNo ? "error" : undefined}
                help={errors.teacherContactNo?.message}
              >
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Teacher Contact No"
                  onChange={(e) => setTeacherContactNo(e.target.value)}
                  value={teacherContactNo}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="eventStartDate"
            control={control}
            render={({ field }) => (
              <Form.Item
                name="Name"
                validateStatus={errors.eventStartDate ? "error" : undefined}
                help={errors.eventStartDate?.message}
              >
                {" "}
                <DatePicker
                  {...field}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  style={{ width: "100%", boxShadow: "none" }}
                  placeholder="Event Start Date"
                  format="YYYY-MM-DD"
                  onChange={(value) => {
                    setEventStartDate(date.isValid() ? date : null);
                    field.onChange(date.isValid() ? date.toDate() : null);
                  }}
                  value={eventStartDate ? moment(eventStartDate) : null}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="eventEndDate"
            control={control}
            render={({ field }) => (
              <Form.Item
                validateStatus={errors.eventEndDate ? "error" : undefined}
                help={errors.eventEndDate?.message}
              >
                <DatePicker
                  {...field}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  style={{ width: "100%", boxShadow: "none" }}
                  placeholder="Event End Date"
                  format="YYYY-MM-DD"
                  onChange={(value) => {
                    setEventEndDate(date.isValid() ? date : null);
                    field.onChange(date.isValid() ? date.toDate() : null);
                  }}
                  value={eventEndDate ? moment(eventEndDate) : null}
                />
              </Form.Item>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-x-20">
          <Controller
            name="eventStartTime"
            control={control}
            render={({ field, fieldState }) => (
              <Form.Item
                validateStatus={fieldState.invalid ? "error" : undefined}
                help={fieldState.invalid ? fieldState?.error?.message : ""}
              >
                <TimePicker
                  {...field}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  style={{ width: "50%", boxShadow: "none" }}
                  placeholder="start Time"
                  format="HH:mm"
                  onChange={(value) => {
                    const time = moment(value);
                    setEventStartTime(time.isValid() ? time : null);
                    field.onChange(time.isValid() ? time.toDate() : null);
                  }}
                  value={eventStartTime ? moment(eventStartTime) : null}
                />
              </Form.Item>
            )}
          />
        </div>
        <div className="grid grid-cols-3 gap-x-20">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Form.Item
                validateStatus={errors.description ? "error" : undefined}
                help={errors.description?.message}
              >
                <TextArea
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </Form.Item>
            )}
          />
        </div>
        <Button
          className="bg-blue-600 text-white px-10 font-semibold mt-10"
          type="default"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
