"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, Select, DatePicker, TimePicker } from "antd";
import { CloseSquareOutlined } from "@ant-design/icons";
import HeaderDiv from "@/components/header";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";

export type FormInput = {
  eventID: string;
  eventTitle: string;
  eventDirectorTeacher: string;
  eventDirectorStudent: string;
  teacherContactNo: string;
  eventStartDate: string;
  eventEndDate: string;
  eventStartTime: string;
  description: string;
  visibility: string;
  createdBy: string;
  updatedBy: string;
};

const EventsForm: React.FC<NameProps> = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();

  const onSubmit = async (data: FormInput) => {
    const newEvent = {
      eventID: "Eve11111",
      eventTitle: data.eventTitle,
      eventDirectorTeacher: data.eventDirectorTeacher,
      eventDirectorStudent: data.eventDirectorStudent,
      teacherContactNo: data.teacherContactNo,
      eventStartDate: data.eventStartDate,
      eventEndDate: data.eventEndDate,
      eventStartTime: Number(data.eventStartTime),
      description: data.description,
    };
    axios
      .post(`http://143.110.190.164:3001/teacher/event/create`, newEvent)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Event Created Successfully",
          });
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
    reset();
  };

  return (
    <section className="bg-[#ecf0f1]">
      <div className="flex flex-col container px-6 py-6">
        <HeaderDiv />
        <div className="bg-white flex flex-row justify-between  mt-8 px-4 py-2">
          <h1 className="text-lg" style={{ color: "#263238" }}>
            Events Form
          </h1>
          <Link href="/events_view">
            <button>
              <CloseSquareOutlined />
            </button>
          </Link>
        </div>

        <div className="w-full mb-12  items-center  mt-6  bg-white px-9 py-5 rounded-lg">
          <Form className="px-4" onFinish={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-x-20">
              <Controller
                name="eventTitle"
                control={control}
                rules={{ required: "eventTitle is required" }}
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
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="eventDirectorTeacher"
                control={control}
                rules={{ required: "eventDirectorTeacher is Required" }}
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
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="eventDirectorStudent"
                control={control}
                rules={{ required: "eventDirectorStudent is Required" }}
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
                    />
                  </Form.Item>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-x-20">
              <Controller
                name="teacherContactNo"
                control={control}
                rules={{ required: "teacherContactNo is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={
                      errors.teacherContactNo ? "error" : undefined
                    }
                    help={errors.teacherContactNo?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Teacher Contact No"
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="eventStartDate"
                control={control}
                rules={{ required: "eventStartDate is required" }}
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
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="eventEndDate"
                control={control}
                rules={{ required: "eventEndDate is Required" }}
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
                    />
                  </Form.Item>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-x-20">
              <Controller
                name="eventStartTime"
                control={control}
                rules={{ required: "Start Time is required" }}
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
                    />
                  </Form.Item>
                )}
              />
            </div>
            <div className="grid grid-cols-3 gap-x-20">
              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
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
      </div>
    </section>
  );
};

export default EventsForm;
