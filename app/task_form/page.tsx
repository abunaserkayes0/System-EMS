// app.tsx
"use client";
import React, { useState } from "react";
import { Button, Form, Input, Select, DatePicker } from "antd";
import { useForm, Controller } from "react-hook-form";
import { CloseSquareOutlined } from "@ant-design/icons";
import HeaderDiv from "@/components/header";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";

export type FormInput = {
  taskTitle: string;
  taskDescription: string;
  taskDueDate: string;
  classID: string;
  courseName: string;
};

export default function TaskForm() {
  const { data } = useFetch(
    `http://143.110.190.164:3001/admin/classroom/find/all`
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();
  const onSubmit = (data: FormInput) => {
    const newTask = {
      taskID: "TSK1122",
      taskTitle: data.taskTitle,
      taskDescription: data.taskDescription,
      taskDueDate: data.taskDueDate,
      classID: data.classID,
      courseName: data.courseName,
    };
    axios
      .post(`http://143.110.190.164:3001/teacher/task/create`, newTask)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Task Created Successfully",
          });
          reset();
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
    <section className="bg-[#ecf0f1]">
      <div className=" container px-6 py-6">
        <HeaderDiv />
        <div className="bg-white flex flex-row justify-between  mt-8 px-4 py-2">
          <h1 className="text-lg" style={{ color: "#263238" }}>
            Task Form
          </h1>
          <Link href="/task_view">
            <button>
              <CloseSquareOutlined />
            </button>
          </Link>
        </div>
        <div className="w-full mt-12 mb-12 bg-white py-12">
          <Form
            layout="vertical"
            className=" rounded p-8 mx-12 mt-4"
            onFinish={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-3 gap-5">
              <Controller
                name="taskTitle"
                control={control}
                rules={{ required: "taskTitle required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.taskTitle ? "error" : undefined}
                    help={errors.taskTitle?.message}
                  >
                    <Input
                      style={{ boxShadow: "none" }}
                      className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-l-0 hover:border-t-0 hover:border-r-0 hover:border-solid hover:border-blue-400"
                      bordered={false}
                      {...field}
                      placeholder="taskTitle"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="taskDescription"
                control={control}
                rules={{ required: "taskDescription required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={
                      errors.taskDescription ? "error" : undefined
                    }
                    help={errors.taskDescription?.message}
                  >
                    <Input
                      style={{ boxShadow: "none" }}
                      className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-l-0 hover:border-t-0 hover:border-r-0 hover:border-solid hover:border-blue-400"
                      bordered={false}
                      {...field}
                      placeholder="taskDescription"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="taskDueDate"
                control={control}
                rules={{ required: "taskDueDate is required" }}
                render={({ field, fieldState }) => (
                  <Form.Item
                    validateStatus={fieldState.invalid ? "error" : undefined}
                    help={fieldState.invalid ? fieldState?.error?.message : ""}
                  >
                    <DatePicker
                      {...field}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      style={{ width: "100%", boxShadow: "none" }}
                      placeholder="taskDueDate"
                      format="YYYY-MM-DD"
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="classID"
                control={control}
                rules={{ required: "Class ID is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.classID ? "error" : undefined}
                    help={errors.classID?.message}
                  >
                    <Select
                      {...field}
                      style={{ boxShadow: "none" }}
                      placeholder="Class ID"
                      className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-l-0 hover:border-t-0 hover:border-r-0 hover:border-solid hover:border-blue-400"
                      bordered={false}
                      options={data.map((item: any) => ({
                        value: item.classID,
                        label: item.classID,
                      }))}
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="courseName"
                control={control}
                rules={{ required: "CourseName is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors?.courseName ? "error" : undefined}
                    help={errors?.courseName?.message}
                  >
                    <Select
                      {...field}
                      style={{ boxShadow: "none", padding: 0 }}
                      placeholder="Course Name"
                      className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-l-0 hover:border-t-0 hover:border-r-0 hover:border-solid hover:border-blue-400"
                      bordered={false}
                      options={data?.flatMap((item: any) =>
                        item?.courses?.map((course: any) => ({
                          value: course.courseName,
                          label: course.courseName,
                        }))
                      )}
                    />
                  </Form.Item>
                )}
              />
            </div>
            <div className="flex flex-row justify-start">
              <Button
                className="px-8 mr-6 text-white font-bold rounded bg-[#2c5ff7] hover:bg-[#ecf0f1] hover:text-black"
                htmlType="submit"
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
}
