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
  expenseID: string;
  itemName: string;
  itemQuantity: string;
  itemCategory: string;
  purchaseDate: string;
  amount: string;
  description: string;
  createdBy: string;
};

export default function ExpenseForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();
  const onSubmit = (data: FormInput) => {
    const newExpense = {
      itemName: data.itemName,
      itemQuantity: data.itemQuantity,
      itemCategory: data.itemCategory,
      purchaseDate: data.purchaseDate,
      amount: data.amount,
      description: data.description,
      createdBy: data.createdBy,
    };
    axios
      .post(`http://143.110.190.164:3001/accounts/expense/create`, newExpense)
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
            Expense Form
          </h1>
          <Link href="/expense_view">
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
                name="itemName"
                control={control}
                rules={{ required: "itemName required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.itemName ? "error" : undefined}
                    help={errors.itemName?.message}
                  >
                    <Input
                      style={{ boxShadow: "none" }}
                      className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-l-0 hover:border-t-0 hover:border-r-0 hover:border-solid hover:border-blue-400"
                      bordered={false}
                      {...field}
                      placeholder="itemName"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="itemQuantity"
                control={control}
                rules={{ required: "itemQuantity required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.itemQuantity ? "error" : undefined}
                    help={errors.itemQuantity?.message}
                  >
                    <Input
                      style={{ boxShadow: "none" }}
                      className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-l-0 hover:border-t-0 hover:border-r-0 hover:border-solid hover:border-blue-400"
                      bordered={false}
                      {...field}
                      placeholder="itemQuantity"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="purchaseDate"
                control={control}
                rules={{ required: "PurchaseDate is required" }}
                render={({ field, fieldState }) => (
                  <Form.Item
                    validateStatus={fieldState.invalid ? "error" : undefined}
                    help={fieldState.invalid ? fieldState?.error?.message : ""}
                  >
                    <DatePicker
                      {...field}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      style={{ width: "100%", boxShadow: "none" }}
                      placeholder="purchaseDate"
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
                name="description"
                control={control}
                rules={{ required: "description required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.description ? "error" : undefined}
                    help={errors.description?.message}
                  >
                    <Input
                      style={{ boxShadow: "none" }}
                      className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-l-0 hover:border-t-0 hover:border-r-0 hover:border-solid hover:border-blue-400"
                      bordered={false}
                      {...field}
                      placeholder="description"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="createdBy"
                control={control}
                rules={{ required: "createdBy required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.createdBy ? "error" : undefined}
                    help={errors.createdBy?.message}
                  >
                    <Input
                      style={{ boxShadow: "none" }}
                      className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-l-0 hover:border-t-0 hover:border-r-0 hover:border-solid hover:border-blue-400"
                      bordered={false}
                      {...field}
                      placeholder="createdBy"
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
