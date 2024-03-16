"use client";
import { FormInput } from "@/app/expense_form/page";
import useFetch from "@/hooks/useFetch";
import { Button, DatePicker, Form, Input, Select } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import Swal from "sweetalert2";
export type expenseProps = {
  expenseID: string;
  setIsModalUpdateOpen: (value: boolean) => void;
  refetch: () => void;
};
export default function UpdateExpense({
  expenseID,
  setIsModalUpdateOpen,
  refetch,
}: expenseProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const [itemName, setItemName] = useState<string>("");
  const [itemQuantity, setItemQuantity] = useState<string>("");
  const [itemCategory, setItemCategory] = useState<string>("");
  const [purchaseDate, setPurchaseDate] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [createdBy, setCreatedBy] = useState<string>("");

  useEffect(() => {
    axios
      .get(`http://143.110.190.164:3001/accounts/expense/find/${expenseID}`)
      .then((res) => {
        const data = res.data.data;
        if (data) {
          setItemName(data.itemName);
          setItemQuantity(data.itemQuantity);
          setItemCategory(data.itemCategory);
          setPurchaseDate(data.purchaseDate);
          setAmount(data.amount);
          setDescription(data.description);
          setCreatedBy(data.createdBy);
        }
      })
      .catch((err) => console.log(err));
  }, [expenseID]);
  const onSubmit = () => {
    const updateExpense = {
      itemName,
      itemQuantity,
      itemCategory,
      purchaseDate,
      amount,
      description,
      createdBy,
    };

    axios
      .put(
        `http://143.110.190.164:3001/accounts/expense/update/${expenseID}`,
        updateExpense
      )
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Notice Updated Successfully",
            showConfirmButton: true,
            timer: 1500,
          });
          refetch();
          setIsModalUpdateOpen(false);
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
            name="itemName"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="notice ID"
                  onChange={(e) => {
                    setItemName(e.target.value);
                  }}
                  value={itemName}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="itemQuantity"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Enter Your itemQuantity"
                  onChange={(e) => {
                    setItemQuantity(e.target.value);
                  }}
                  value={itemQuantity}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="itemCategory"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Enter Your itemCategory"
                  onChange={(e) => {
                    setItemCategory(e.target.value);
                  }}
                  value={itemCategory}
                />
              </Form.Item>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-x-20">
          <Controller
            name="purchaseDate"
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
                    setPurchaseDate(date.isValid() ? date : null);
                    field.onChange(date.isValid() ? date.toDate() : null);
                  }}
                  value={purchaseDate ? moment(purchaseDate) : null}
                />
              </Form.Item>
            )}
          />
        </div>
        <div className="grid grid-cols-3 gap-x-20">
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Enter Your amount"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  value={amount}
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
                  placeholder="Enter Your description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="createdBy"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Enter Your createdBy"
                  onChange={(e) => {
                    setCreatedBy(e.target.value);
                  }}
                  value={createdBy}
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
