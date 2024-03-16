import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { FormInput } from "@/app/feeCollection_form/page";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import { Option } from "antd/es/mentions";
import Swal from "sweetalert2";
import moment from "moment";

export default function UpdateFee({
  feeID,
  setIsModalOpen,
  refetch,
}: {
  feeID: string;
  setIsModalOpen: (value: boolean) => void;
  refetch: () => void;
}) {
  const [studentID, setStudentID] = useState("");
  const [classID, setClassID] = useState("");
  const [date, setData] = useState("");
  const [amount, setAmount] = useState("");
  const [feeType, setFeeType] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [selectedClassId, setSelectedClassId] = useState(classID);
  const [selectedStudentId, setSelectedStudentId] = useState(studentID);
  useEffect(() => {
    setSelectedClassId(classID);
  }, [classID]);

  useEffect(() => {
    setSelectedStudentId(studentID);
  }, [studentID]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();
  const { data } = useFetch(
    `http://143.110.190.164:3001/admin/classroom/find/all`
  );
  useEffect(() => {
    axios
      .get(`http://143.110.190.164:3001/accounts/fee/find/${feeID}`)
      .then((res) => {
        const data = res.data.data;
        if (data) {
          setStudentID(data.studentID);
          setClassID(data.classID);
          setData(data.date);
          setAmount(data.amount);
          setFeeType(data.feeType);
          setPaymentDate(data.paymentDate);
          setDueDate(data.dueDate);
          setPaymentStatus(data.paymentStatus);
        }
      })
      .catch((err) => console.log(err));
  }, [feeID]);
  const onSubmit = () => {
    const updateTask = {
      studentID,
      classID,
      date,
      amount,
      feeType,
      paymentDate,
      dueDate,
      paymentStatus,
    };

    axios
      .put(
        `http://143.110.190.164:3001/accounts/fee/update/${feeID}`,
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
  const [filteredStudents, setFilteredStudents] = useState([]);

  // Event handler for class ID selection
  const handleClassIdChange = (selectedClassId: string) => {
    const classStudents = data.find(
      (item: any) => item.classID === selectedClassId
    )?.studentIDs;
    setFilteredStudents(classStudents);
  };
  // console.log(selectedClassId);
  // console.log(selectedStudentId);
  return (
    <div>
      <section className="bg-[#ecf0f1]">
        <div className="w-full mt-12 mb-12 bg-white py-12">
          <Form
            layout="vertical"
            className=" rounded p-8 mx-12 mt-4"
            onFinish={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-3 gap-5">
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
                        setSelectedClassId(selectedClassId);
                      }}
                      value={selectedClassId}
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="studentID"
                control={control}
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
                      onChange={(selectedStudentId) => {
                        field.onChange(selectedStudentId);
                        setSelectedStudentId(selectedStudentId);
                      }}
                      value={selectedStudentId}
                    />
                    {filteredStudents?.map((item: any) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Form.Item>
                )}
              />
              <Controller
                name="date"
                control={control}
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
                      onChange={(value) => {
                        const date = moment(value);
                        setData(date.isValid() ? date : null);
                        field.onChange(date.isValid() ? date.toDate() : null);
                      }}
                      value={date ? moment(date) : null}
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="amount"
                control={control}
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
                      onChange={(e) => setAmount(e.target.value)}
                      value={amount}
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="feeType"
                control={control}
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
                      onChange={(e) => setFeeType(e.target.value)}
                      value={feeType}
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="paymentDate"
                control={control}
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
                      onChange={(value) => {
                        const date = moment(value);
                        setPaymentDate(date.isValid() ? date : null);
                        field.onChange(date.isValid() ? date.toDate() : null);
                      }}
                      value={paymentDate ? moment(paymentDate) : null}
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="dueDate"
                control={control}
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
                      onChange={(value) => {
                        const date = moment(value);
                        setDueDate(date.isValid() ? date : null);
                        field.onChange(date.isValid() ? date.toDate() : null);
                      }}
                      value={dueDate ? moment(dueDate) : null}
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="paymentStatus"
                control={control}
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
                      onChange={(e) => {
                        setPaymentStatus(e);
                        field.onChange(e);
                      }}
                      value={paymentStatus}
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
      </section>
    </div>
  );
}
