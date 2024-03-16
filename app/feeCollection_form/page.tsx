"use client";
import React, { useState } from "react";
import { Button, Form, Input, Select, DatePicker } from "antd";
import { useForm, Controller } from "react-hook-form";
import { CloseSquareOutlined } from "@ant-design/icons";
import HeaderDiv from "@/components/header";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import Swal from "sweetalert2";
import { Option } from "antd/es/mentions";
import Link from "next/link";

export type FormInput = {
  feeID: string;
  studentID: string;
  classID: string;
  date: string;
  amount: string;
  feeType: string;
  paymentDate: string;
  dueDate: string;
  paymentStatus: string;
};
interface NameProps {
  params: {
    name: string;
  };
}

const AttendanceForm: React.FC<NameProps> = () => {
  const { data } = useFetch(
    `http://143.110.190.164:3001/admin/classroom/find/all`
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();
  const [filteredStudents, setFilteredStudents] = useState([]);

  // Event handler for class ID selection
  const handleClassIdChange = (selectedClassId: string) => {
    const classStudents = data.find(
      (item: any) => item.classID === selectedClassId
    )?.studentIDs;
    setFilteredStudents(classStudents);
  };
  const onSubmit = (data: FormInput) => {
    const newFee = {
      // feeID: data.feeID,
      studentID: data.studentID,
      classID: data.classID,
      date: data.date,
      amount: data.amount,
      feeType: data.feeType,
      paymentDate: data.paymentDate,
      dueDate: data.dueDate,
      paymentStatus: data.paymentStatus,
    };
    axios
      .post(`http://143.110.190.164:3001/accounts/fee/create`, newFee)
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
        <div className="bg-white flex flex-row justify-between mb-3 mt-8 px-4 py-2">
          <h1 className="text-lg" style={{ color: "#263238" }}>
            Fee Collection Form
          </h1>
          <Link href="/feeCollection_view">
            <button>
              <CloseSquareOutlined />
            </button>
          </Link>
        </div>
        <div className="w-full mb-12 bg-white py-12">
          <Form
            layout="vertical"
            className=" rounded p-8 mx-12 mt-4"
            onFinish={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-3 gap-5">
              <Controller
                name="classID"
                control={control}
                // rules={{ required: "Class ID is required" }}
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
                      options={
                        data
                          ? data.map((item: any) => ({
                              value: item.classID,
                              label: item.classID,
                            }))
                          : []
                      }
                      onChange={(selectedClassId) => {
                        handleClassIdChange(selectedClassId);
                        field.onChange(selectedClassId);
                      }}
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="studentID"
                control={control}
                rules={{ required: "StudentId is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors?.studentID ? "error" : undefined}
                    help={errors?.studentID?.message}
                  >
                    <Select
                      {...field}
                      style={{ boxShadow: "none", padding: 0 }}
                      placeholder="StudentId"
                      className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-l-0 hover:border-t-0 hover:border-r-0 hover:border-solid hover:border-blue-400"
                      bordered={false}
                      options={filteredStudents?.map((item: any) => ({
                        value: item,
                        label: item,
                      }))}
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="date"
                control={control}
                rules={{ required: "date is required" }}
                render={({ field, fieldState }) => (
                  <Form.Item
                    validateStatus={fieldState.invalid ? "error" : undefined}
                    help={fieldState.invalid ? fieldState?.error?.message : ""}
                  >
                    <DatePicker
                      {...field}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      style={{ width: "100%", boxShadow: "none" }}
                      placeholder="date"
                      format="YYYY-MM-DD"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="amount"
                control={control}
                rules={{ required: "amount required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.amount ? "error" : undefined}
                    help={errors.amount?.message}
                  >
                    <Input
                      style={{ boxShadow: "none" }}
                      className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-l-0 hover:border-t-0 hover:border-r-0 hover:border-solid hover:border-blue-400"
                      bordered={false}
                      {...field}
                      placeholder="amount"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="feeType"
                control={control}
                rules={{ required: "feeType required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.feeType ? "error" : undefined}
                    help={errors.feeType?.message}
                  >
                    <Input
                      style={{ boxShadow: "none" }}
                      className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-l-0 hover:border-t-0 hover:border-r-0 hover:border-solid hover:border-blue-400"
                      bordered={false}
                      {...field}
                      placeholder="feeType"
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="paymentDate"
                control={control}
                rules={{ required: "paymentDate is required" }}
                render={({ field, fieldState }) => (
                  <Form.Item
                    validateStatus={fieldState.invalid ? "error" : undefined}
                    help={fieldState.invalid ? fieldState?.error?.message : ""}
                  >
                    <DatePicker
                      {...field}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      style={{ width: "100%", boxShadow: "none" }}
                      placeholder="paymentDate"
                      format="YYYY-MM-DD"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="dueDate"
                control={control}
                rules={{ required: "dueDate is required" }}
                render={({ field, fieldState }) => (
                  <Form.Item
                    validateStatus={fieldState.invalid ? "error" : undefined}
                    help={fieldState.invalid ? fieldState?.error?.message : ""}
                  >
                    <DatePicker
                      {...field}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      style={{ width: "100%", boxShadow: "none" }}
                      placeholder="dueDate"
                      format="YYYY-MM-DD"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="paymentStatus"
                control={control}
                rules={{ required: "paymentStatus required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.paymentStatus ? "error" : undefined}
                    help={errors.paymentStatus?.message}
                  >
                    <Select
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-l-0 hover:border-t-0 hover:border-r-0 hover:border-solid hover:border-blue-400"
                      bordered={false}
                      placeholder="paymentStatus"
                    >
                      <Option value="pending">pending</Option>
                    </Select>
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

export default AttendanceForm;
