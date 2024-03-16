"use client";
import { FormInput } from "@/app/notice_message/page";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface MessageProps {
  messageID: string;
  setIsModalOpen: (value: boolean) => void;
  refetch: () => void;
}

export default function UpdateMessage({
  messageID,
  setIsModalOpen,
  refetch,
}: MessageProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  //   const [sendTo, setSendTo] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    axios
      .get(`http://143.110.190.164:3001/teacher/message/find/${messageID}`)
      .then((res) => {
        console.log(res.data.data);
        const data = res.data.data;
        if (data) {
          const data = res.data.data;
          setTitle(data.title);
          setDate(data.date);
          //   setSendTo(data.sendTo);
          setMessage(data.message);
        }
      })
      .catch((err) => console.log(err));
  }, [messageID]);

  const onSubmit = () => {
    const updateMessage = {
      title,
      date,
      message,
    };

    axios
      .put(
        `http://143.110.190.164:3001/teacher/message/update/${messageID}`,
        updateMessage
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
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Title">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <Input
                {...field}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="Date">
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                {...field}
                value={moment(date, "YYYY-MM-DD")}
                onChange={(date, dateString) => setDate(dateString)}
              />
            )}
          />
        </Form.Item>
        {/* <Form.Item label="Send To">
          <Controller
            control={control}
            name="sendTo"
            render={({ field }) => (
              <Input
                {...field}
                value={sendTo.split(",").map((recipient: string) => recipient)}
                onChange={(e) => setSendTo(e.target.value)}
              />
            )}
          />
        </Form.Item> */}

        <Form.Item label="Message">
          <Controller
            control={control}
            name="message"
            render={({ field }) => (
              <Input.TextArea
                {...field}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type="default" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
