// app.tsx
"use client";
import React, { useState } from "react";
import { Button, DatePicker, Form, Input, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { CloseSquareOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import HeaderDiv from "@/components/header";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";

export type FormInput = {
  messageID: string;
  title: string;
  sendTo: string;
  message: string;
  date: string;
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

  const onSubmit = (data: FormInput) => {
    const newMessage = {
      title: data.title,
      date: data.date,
      sentTo: data.sendTo
        .split(",")
        .map((recipient: string) => recipient.trim()),
      message: data.message,
    };
    axios
      .post(`http://143.110.190.164:3001/teacher/message/create`, newMessage)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Message Sent",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Message not Sent",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <section className="bg-[#ecf0f1]">
      <div className="flex flex-col container px-6 py-6">
        <HeaderDiv />
        <div className="bg-white flex flex-row justify-between  mt-8 px-4 py-2">
          <h1 className="text-lg" style={{ color: "#263238" }}>
            Message Form
          </h1>
          <Link href="/noticeMessage_view">
            <button>
              <CloseSquareOutlined />
            </button>
          </Link>
        </div>
        <div className="w-full mt-12 mb-12 flex  bg-white py-12">
          <Form
            layout="vertical"
            className="xl:w-[65%] lg:w-[50%] md:w-[70%] sm:w-[90%] xs:w-[96%] rounded p-8 mx-12 mt-4"
            onFinish={handleSubmit(onSubmit)}
          >
            <div className="flex flex-row gap-x-3">
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
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
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
            </div>
            <Controller
              name="sendTo"
              control={control}
              rules={{ required: "Recepient required" }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.sendTo ? "error" : undefined}
                  help={errors.sendTo?.message}
                >
                  <Input
                    className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                    {...field}
                    placeholder="Send to"
                  />
                </Form.Item>
              )}
            />
            <Controller
              name="message"
              control={control}
              rules={{ required: "Message is required" }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.message ? "error" : undefined}
                  help={errors.message?.message}
                >
                  <TextArea
                    className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                    {...field}
                    placeholder="Message"
                  />
                </Form.Item>
              )}
            />

            <div className="flex flex-row justify-start">
              <Button
                className="px-8 mr-6 text-white font-bold rounded bg-[#2c5ff7] hover:bg-[#ecf0f1] hover:text-black"
                // type="primary"
                htmlType="submit"
              >
                Save
              </Button>
              <Button
                className="px-8 hover:text-white font-bold rounded hover:bg-[#2c5ff7] bg-[#ecf0f1] text-black"
                // type="primary"
                htmlType="submit"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default NoticeVew;
