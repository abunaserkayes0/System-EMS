"use client";
import { singleData } from "@/app/notice_view/page";
import useFetch from "@/hooks/useFetch";
import { Button, DatePicker, Form, Input, Select } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
type noticeID = {
  noticeID: string;
  refetch: () => void;
  setIsModalOpen: (value: boolean) => void;
  data: singleData[];
};

export default function UpdateStudent({
  noticeID,
  refetch,
  setIsModalOpen,
  data,
}: noticeID) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<singleData>();

  const [noticeId, setNoticeId] = useState("");
  const [title, setTittle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [noticeFor, setNoticeFor] = useState("");
  const [selectedValue, setSelectedValue] = useState(noticeFor);

  useEffect(() => {
    setSelectedValue(noticeFor);
  }, [noticeFor]);

  useEffect(() => {
    axios
      .get(`http://143.110.190.164:3001/teacher/notice/find/${noticeID}`)
      .then((res) => {
        const data = res.data.data;
        if (data) {
          setNoticeId(data.noticeID);
          setTittle(data.title);
          setDate(data.date);
          setDescription(data.description);
          setNoticeFor(data.noticeFor);
        }
      })
      .catch((err) => console.log(err));
  }, [noticeID]);
  const onSubmit = () => {
    const updateNotice = {
      noticeID,
      title,
      date,
      description,
      noticeFor,
    };
    axios
      .put(
        `http://143.110.190.164:3001/teacher/notice/update/${noticeID}`,
        updateNotice
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
            name="noticeID"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="notice ID"
                  onChange={(e) => {
                    setNoticeId(e.target.value);
                  }}
                  value={noticeId}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Enter Your Title"
                  onChange={(e) => {
                    setTittle(e.target.value);
                  }}
                  value={title}
                />
              </Form.Item>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-x-20">
          <Controller
            name="date"
            control={control}
            render={({ field, fieldState }) => (
              <Form.Item>
                <DatePicker
                  {...field}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  style={{ width: "100%", boxShadow: "none" }}
                  placeholder="Joining Date"
                  format="YYYY-MM-DD"
                  onChange={(value) => {
                    const date = moment(value);
                    setDate(date.isValid() ? date : null);
                    field.onChange(date.isValid() ? date.toDate() : null);
                  }}
                  value={date ? moment(date) : null}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Section"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </Form.Item>
            )}
          />
        </div>
        <div className="grid grid-cols-3 gap-x-20">
          <Controller
            name="noticeFor"
            control={control}
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
                    value: item.noticeFor,
                    label: item.noticeFor,
                  }))}
                  onChange={(value) => {
                    field.onChange(value);
                    setSelectedValue(value);
                  }}
                  value={selectedValue}
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
