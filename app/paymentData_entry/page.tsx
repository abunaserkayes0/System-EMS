"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, Select, DatePicker } from "antd";
import { CloseSquareOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import HeaderDiv from "@/components/header";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";

const { Option } = Select;

export type FormInput = {
  paidTo: string;
  date: string;
  amount: string;
  status: string;
  details: string;
};
interface NameProps {
  params: {
    name: string;
  };
}

const PaymentForm: React.FC<NameProps> = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();
  const onSubmit = (data: FormInput) => {
    const newPayment = {
      paidTo: data.paidTo,
      date: data.date,
      amount: data.amount,
      status: data.status,
      details: data.details,
    };
    axios
      .post(`http://143.110.190.164:3001/accounts/Payment/create`, newPayment)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Payment Added Successfully",
            showConfirmButton: false,
            timer: 1500,
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
            Payment Transaction Form
          </h1>
          <Link href="/paymentData_view">
            <button>
              <CloseSquareOutlined />
            </button>
          </Link>
        </div>

        <div className="w-full mb-12 flex justify-around items-center bg-white mt-6 py-24">
          <Form className="w-96 mt-12" onFinish={handleSubmit(onSubmit)}>
            <Controller
              name="paidTo"
              control={control}
              rules={{ required: "Paid Id required" }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.paidTo ? "error" : undefined}
                  help={errors.paidTo?.message}
                >
                  <Input
                    className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                    style={{ width: "100%", boxShadow: "none" }}
                    {...field}
                    placeholder="Paid ID"
                  />
                </Form.Item>
              )}
            />
            <Controller
              name="amount"
              control={control}
              rules={{ required: "Amount is required" }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.amount ? "error" : undefined}
                  help={errors.amount?.message}
                >
                  <Input
                    className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                    style={{ width: "100%", boxShadow: "none" }}
                    {...field}
                    placeholder="Amount Id Required"
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
              name="status"
              control={control}
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.status ? "error" : undefined}
                  help={errors.status?.message}
                >
                  <Select
                    {...field}
                    style={{
                      width: "100%",
                      boxShadow: "none",
                    }}
                    placeholder="Status"
                  >
                    <Option value="paid">Paid</Option>
                    <Option value="unpaid">Unpaid</Option>
                  </Select>
                </Form.Item>
              )}
            />

            <Controller
              name="details"
              control={control}
              rules={{ required: "Details is required" }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.details ? "error" : undefined}
                  help={errors.details?.message}
                >
                  <TextArea
                    {...field}
                    className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                    style={{ width: "100%", boxShadow: "none" }}
                    placeholder="Description"
                  />
                </Form.Item>
              )}
            />

            <div className="flex flex-row justify-center">
              <Button
                className="px-8 mr-6 text-white font-bold rounded bg-[#2c5ff7] hover:bg-[#ecf0f1] hover:text-black"
                type="primary"
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

export default PaymentForm;
