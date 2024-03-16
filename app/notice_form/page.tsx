// app.tsx
"use client";
import React from "react";
import { Button, Form, Input, Select, DatePicker } from "antd";
import { useForm, Controller } from "react-hook-form";
import { CloseSquareOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import HeaderDiv from "@/components/header";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
type FormInput = {
  title: string;
  date: string;
  description: string;
  noticeFor: string;
};

interface NameProps {
  params: {
    name: string;
  };
}
const NoticeVew: React.FC<NameProps> = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();

  const { data } = useFetch(
    `http://143.110.190.164:3001/admin/classroom/find/all`
  );

  const onSubmit = async (data: FormInput) => {
    const newNotice = {
      title: data.title,
      date: data.date,
      description: data.description,
      noticeFor: data.noticeFor,
    };
    try {
      const res = await axios.post(
        `http://143.110.190.164:3001/teacher/notice/create`,
        newNotice
      );
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Notice Created Successfully",
        });
        reset();
      }
    } catch (err) {
      if (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };

  return (
    <section className="bg-[#ecf0f1]">
      <div className=" container px-6 py-6">
        <HeaderDiv />
        <div className="bg-white flex flex-row justify-between  mt-8 px-4 py-2">
          <h1 className="text-lg" style={{ color: "#263238" }}>
            Notice Board Form
          </h1>
          <Link href="/notice_view">
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
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr	",
                gap: "1rem",
              }}
            >
              <Controller
                name="title"
                control={control}
                rules={{ required: "Title required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.title ? "error" : undefined}
                    help={errors.title?.message}
                  >
                    <Input
                      style={{ boxShadow: "none" }}
                      className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-l-0 hover:border-t-0 hover:border-r-0 hover:border-solid hover:border-blue-400"
                      bordered={false}
                      {...field}
                      placeholder="Title"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="date"
                control={control}
                rules={{ required: "Date is required" }}
                render={({ field, fieldState }) => (
                  <Form.Item
                    validateStatus={fieldState.invalid ? "error" : undefined}
                    help={fieldState.invalid ? fieldState?.error?.message : ""}
                  >
                    <DatePicker
                      {...field}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      style={{ width: "100%", boxShadow: "none" }}
                      placeholder="Date"
                      format="YYYY-MM-DD"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="noticeFor"
                control={control}
                rules={{ required: "Class ID is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.noticeFor ? "error" : undefined}
                    help={errors.noticeFor?.message}
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
            </div>
            <div className=" grid grid-cols-1">
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
                      style={{ boxShadow: "none" }}
                      className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-l-0 hover:border-t-0 hover:border-r-0 hover:border-solid hover:border-blue-400"
                      bordered={false}
                      {...field}
                      placeholder="Description"
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
};

export default NoticeVew;
