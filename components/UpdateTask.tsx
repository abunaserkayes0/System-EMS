"use client";
import { FormInput } from "@/app/task_form/page";
import useFetch from "@/hooks/useFetch";
import { Button, DatePicker, Form, Input, Select } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
type TaskProps = {
  taskID: string;
  setIsModalOpen: (value: boolean) => void;
  refetch: () => void;
};
export default function UpdateTask({
  taskID,
  setIsModalOpen,
  refetch,
}: TaskProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskDueDate, setTaskDueDate] = useState<string>("");
  const [classID, setClassID] = useState<string>("");
  const [courseName, setCourseName] = useState<string>("");
  const [selectedClassId, setSelectedClassId] = useState(classID);
  const [selectedCourseName, setSelectedCourseName] = useState(courseName);
  useEffect(() => {
    setSelectedClassId(classID);
  }, [classID]);

  useEffect(() => {
    setSelectedCourseName(courseName);
  }, [courseName]);

  const { data } = useFetch(
    `http://143.110.190.164:3001/teacher/task/find/all`
  );
  console.log(data);

  useEffect(() => {
    axios
      .get(`http://143.110.190.164:3001/teacher/task/find/${taskID}`)
      .then((res) => {
        const data = res.data.data;
        if (data) {
          setTaskTitle(data.taskTitle);
          setTaskDescription(data.taskDescription);
          setTaskDueDate(data.taskDueDate);
          setClassID(data.classID);
          setCourseName(data.courseName);
        }
      })
      .catch((err) => console.log(err));
  }, [taskID]);
  const onSubmit = () => {
    const updateTask = {
      taskTitle,
      taskDescription,
      taskDueDate,
      classID,
      courseName,
    };

    axios
      .put(
        `http://143.110.190.164:3001/teacher/task/update/${taskID}`,
        updateTask
      )
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Notice Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
          setIsModalOpen(false);
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
    <div className="w-full mb-12  items-center  mt-6  bg-white px-9 py-5 rounded-lg">
      <Form className="px-4" onFinish={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-x-20">
          <Controller
            name="taskTitle"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="notice ID"
                  onChange={(e) => {
                    setTaskTitle(e.target.value);
                  }}
                  value={taskTitle}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="taskDescription"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Enter Your taskDescription"
                  onChange={(e) => {
                    setTaskDescription(e.target.value);
                  }}
                  value={taskDescription}
                />
              </Form.Item>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-x-20">
          <Controller
            name="taskDueDate"
            control={control}
            render={({ field, fieldState }) => (
              <Form.Item>
                <DatePicker
                  {...field}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  style={{ width: "100%", boxShadow: "none" }}
                  placeholder="TaskDueDate Date"
                  format="YYYY-MM-DD"
                  onChange={(value) => {
                    const date = moment(value);
                    setTaskDescription(date.isValid() ? date : null);
                    field.onChange(date.isValid() ? date.toDate() : null);
                  }}
                  value={taskDueDate ? moment(taskDueDate) : null}
                />
              </Form.Item>
            )}
          />
        </div>
        <div className="grid grid-cols-3 gap-x-20">
          <Controller
            name="classID"
            control={control}
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
                  options={data?.map((item: any) => ({
                    value: item.classID,
                    label: item.classID,
                  }))}
                  onChange={(value) => {
                    field.onChange(value);
                    setSelectedClassId(value);
                  }}
                  value={selectedClassId}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="courseName"
            control={control}
            render={({ field }) => (
              <Form.Item
                validateStatus={errors.courseName ? "error" : undefined}
                help={errors.courseName?.message}
              >
                <Select
                  {...field}
                  style={{ boxShadow: "none" }}
                  placeholder="Class ID"
                  className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-l-0 hover:border-t-0 hover:border-r-0 hover:border-solid hover:border-blue-400"
                  bordered={false}
                  options={data?.map((item: any) => ({
                    value: item.courseName,
                    label: item.courseName,
                  }))}
                  onChange={(value) => {
                    field.onChange(value);
                    setSelectedCourseName(value);
                  }}
                  value={selectedCourseName}
                />
              </Form.Item>
            )}
          />
        </div>
        <Form.Item>
          <Button
            className="bg-blue-600 text-white px-10 font-semibold mt-10"
            type="default"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
