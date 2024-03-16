"use client";
import { Button, DatePicker, Form, Input, Select } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface FormInput {
  payrollID: string;
  paidTo: string;
  date: string;
  amount: string;
  status: string;
  details: string;
}

export default function UpdatePayroll({
  payrollID,
  setIsModalOpen,
  refetch,
}: {
  payrollID: string;
  setIsModalOpen: (value: boolean) => void;
  refetch: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const [paidTo, setPaidTo] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  useEffect(() => {
    axios
      .get(`http://143.110.190.164:3001/accounts/payment/find/${payrollID}`)
      .then((res) => {
        const data = res.data.data;
        if (data) {
          const data = res.data.data;
          setPaidTo(data.paidTo);
          setDate(data.date);
          setAmount(data.amount);
          setStatus(data.status);
          setDetails(data.details);
        }
      })
      .catch((err) => console.log(err));
  }, [payrollID]);
  const onSubmit = () => {
    const updatePayroll = {
      paidTo,
      date,
      amount,
      status,
      details,
    };

    axios
      .put(
        `http://143.110.190.164:3001/accounts/payment/update/${payrollID}`,
        updatePayroll
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
        <h2 className="text-[23px] font-semibold mb-5">Basic Information</h2>
        <div className="grid grid-cols-3 gap-x-20">
          <div className="col-span-3">
            <label className="text-lg">Paid To</label>
            <Controller
              name="paidTo"
              control={control}
              render={({ field }) => (
                <Input
                  className="w-full"
                  placeholder="Paid To"
                  {...field}
                  onChange={(e) => setPaidTo(e.target.value)}
                  value={paidTo}
                />
              )}
            />
          </div>
          <div className="col-span-3">
            <label className="text-lg">Date</label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  className="w-full"
                  placeholder="Date"
                  {...field}
                  onChange={(value) => {
                    const date = moment(value);
                    setDate(date.isValid() ? date : null);
                    field.onChange(date.isValid() ? date.toDate() : null);
                  }}
                  value={date ? moment(date) : null}
                />
              )}
            />
          </div>
          <div className="col-span-3">
            <label className="text-lg">Amount</label>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <Input
                  className="w-full"
                  placeholder="Amount"
                  {...field}
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                />
              )}
            />
          </div>
          <div className="col-span-3">
            <label className="text-lg">Status</label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  placeholder="Status"
                  {...field}
                  onChange={(value) => setStatus(value)}
                  value={status}
                >
                  <Select.Option value="Paid">Paid</Select.Option>
                  <Select.Option value="Unpaid">Unpaid</Select.Option>
                </Select>
              )}
            />
          </div>
          <div className="col-span-3">
            <label className="text-lg">Details</label>
            <Controller
              name="details"
              control={control}
              render={({ field }) => (
                <Input
                  className="w-full"
                  placeholder="Details"
                  {...field}
                  onChange={(e) => setDetails(e.target.value)}
                  value={details}
                />
              )}
            />
          </div>
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
