"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, Select, DatePicker } from "antd";
import HeaderDiv from "@/components/header";
import { CloseSquareOutlined } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";
const { Option } = Select;

export type FormInput = {
  teacherID: string;
  name: string;
  email: string;
  mobileNumber: string;
  joiningDate: string;
  religion: string;
  nationality: string;
  gender: string;
  employeeExperienceYear: number;
  NID: string;
  picture: string;
  experienceSubject: string;
  address: string;
  designation: string;
  salaryAmount: number;
  educationInfo: {
    instituteName: string;
    completeYear: number;
    resultPoint: number;
  };
};

const AdmissionForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();

  const onSubmit = (data: FormInput) => {
    const newTeacher = {
      teacherID: data.teacherID,
      name: data.name,
      email: data.email,
      mobileNumber: data.mobileNumber,
      joiningDate: data.joiningDate,
      religion: data.religion,
      nationality: data.nationality,
      gender: data.gender,
      employeeExperienceYear: Number(data.employeeExperienceYear),
      NID: data.NID,
      picture: "picture.jpg",
      experienceSubject: data.experienceSubject,
      address: data.address,
      designation: data.designation,
      salaryAmount: data.salaryAmount,
      educationInfo: {
        instituteName: data.educationInfo.instituteName,
        completeYear: Number(data.educationInfo.completeYear),
        resultPoint: Number(data.educationInfo.resultPoint),
      },
    };
    axios
      .post(
        `http://143.110.190.164:3001/admin/teacher/profile/create`,
        newTeacher
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  /*   const onSubmit = async (data: FormInput) => {
    // try {
    //   startLoading();
    //   const date = new Date(data.date);
    //   // Prepare the data to send to the createInventory function
    //   const expenseObj = {
    //     amount: data.amount,
    //     status: data.status,
    //     type: data.type,
    //     date,
    //     description: data.description,
    //   };
    //   // Call the createInventory function to send the data to the server
    //   const createdExpense = await createExpense(expenseObj);
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   reset();
    //   stopLoading();
    // } catch (error) {
    //   console.error("Error creating expense:", error);
    //   stopLoading();
    // }
  }; */

  return (
    <section className="bg-[#ecf0f1]">
      <div className="flex flex-col container px-6 py-6">
        <HeaderDiv />
        <div className="bg-white flex flex-row justify-between  mt-8 px-4 py-2">
          <h1 className="text-lg" style={{ color: "#263238" }}>
            Teachers Form
          </h1>
          <button>
            <Link href="/teacher_list">
              <CloseSquareOutlined />
            </Link>
          </button>
        </div>

        <div className="w-full mb-12  items-center  mt-6  bg-white px-9 py-5 rounded-lg">
          <Form className="px-4" onFinish={handleSubmit(onSubmit)}>
            <h2 className="text-[23px] font-semibold mb-5">
              Basic Information
            </h2>
            <div className="grid grid-cols-3 gap-x-20">
              <Controller
                name="teacherID"
                control={control}
                rules={{ required: "Please Enter a Valid ID" }}
                render={({ field }) => (
                  <Form.Item
                    name="Admission ID"
                    validateStatus={errors.teacherID ? "error" : undefined}
                    help={errors.teacherID?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Teacher Id"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="name"
                control={control}
                rules={{ required: "Please Enter Your Name" }}
                render={({ field }) => (
                  <Form.Item
                    name="Name"
                    validateStatus={errors.name ? "error" : undefined}
                    help={errors.name?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Enter Your Name"
                    />
                  </Form.Item>
                )}
              />
            </div>
            <h2 className="text-[23px] font-semibold mb-5">
              Institute Information
            </h2>
            <div className="grid grid-cols-3 gap-x-20">
              <Controller
                name="email"
                control={control}
                rules={{ required: "email is Required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.email ? "error" : undefined}
                    help={errors.email?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Email"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="mobileNumber"
                control={control}
                rules={{ required: "mobileNumber is Required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.mobileNumber ? "error" : undefined}
                    help={errors.mobileNumber?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Mobile Number"
                    />
                  </Form.Item>
                )}
              />
            </div>
            <h2 className="text-[23px] font-semibold mb-5">
              Personal Information
            </h2>
            <div className="grid grid-cols-3 gap-x-20">
              <Controller
                name="joiningDate"
                control={control}
                rules={{ required: "Joining Date is required" }}
                render={({ field, fieldState }) => (
                  <Form.Item
                    validateStatus={fieldState.invalid ? "error" : undefined}
                    help={fieldState.invalid ? fieldState?.error?.message : ""}
                  >
                    <DatePicker
                      {...field}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      style={{ width: "100%", boxShadow: "none" }}
                      placeholder="joiningDate"
                      format="YYYY-MM-DD"
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="religion"
                control={control}
                rules={{ required: "Religion is Required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.religion ? "error" : undefined}
                    help={errors.religion?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Religion"
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="nationality"
                control={control}
                rules={{ required: "Nationality is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.nationality ? "error" : undefined}
                    help={errors.nationality?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Nationality"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="employeeExperienceYear"
                control={control}
                rules={{ required: "Employee Experience Year is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={
                      errors.employeeExperienceYear ? "error" : undefined
                    }
                    help={errors.employeeExperienceYear?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Employee Experience Year"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="NID"
                control={control}
                rules={{ required: "Nid is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.NID ? "error" : undefined}
                    help={errors.NID?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="NID"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="gender"
                control={control}
                rules={{ required: "Please Enter Your Selected Gender" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.gender ? "error" : undefined}
                    help={errors.gender?.message}
                  >
                    <Select
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-solid hover:border-blue-400"
                      bordered={false}
                      placeholder="Gender"
                    >
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      <Option value="custom">Custom</Option>
                    </Select>
                  </Form.Item>
                )}
              />
              <Controller
                name="address"
                control={control}
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.address ? "error" : undefined}
                    help={errors.address?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Address"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="designation"
                control={control}
                rules={{ required: "designation is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.designation ? "error" : undefined}
                    help={errors.designation?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="designation"
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="experienceSubject"
                control={control}
                rules={{ required: "experienceSubject is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={
                      errors.experienceSubject ? "error" : undefined
                    }
                    help={errors.experienceSubject?.message}
                  >
                    <Input
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      {...field}
                      placeholder="Employee Experience Year"
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="salaryAmount"
                control={control}
                rules={{ required: "Blood Group is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.salaryAmount ? "error" : undefined}
                    help={errors.salaryAmount?.message}
                  >
                    <Select
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-solid hover:border-blue-400"
                      bordered={false}
                      placeholder="Salary Amount Range"
                    >
                      <Option value="15000">15000</Option>
                      <Option value="25000">25000</Option>
                      <Option value="35000">35000</Option>
                      <Option value="45000">45000</Option>
                      <Option value="55000">55000</Option>
                      <Option value="more than 55000">more than 55000</Option>
                    </Select>
                  </Form.Item>
                )}
              />
              <Controller
                name="educationInfo.instituteName"
                control={control}
                rules={{ required: "InstituteName is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={
                      errors.educationInfo?.instituteName ? "error" : undefined
                    }
                    help={errors.educationInfo?.instituteName?.message}
                  >
                    <Input
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      {...field}
                      placeholder="Institute Name"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="educationInfo.completeYear"
                control={control}
                rules={{ required: "CompleteYear  Card is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={
                      errors.educationInfo?.completeYear ? "error" : undefined
                    }
                    help={errors.educationInfo?.completeYear?.message}
                  >
                    <Input
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      {...field}
                      placeholder="CompleteYear Card"
                    />
                  </Form.Item>
                )}
              />
            </div>
            <h2 className="text-[23px] font-semibold mb-5">
              Educational Information
            </h2>
            <div className="grid grid-cols-3 gap-x-20">
              <Controller
                name="educationInfo.resultPoint"
                control={control}
                rules={{ required: "Result Point is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={
                      errors.educationInfo?.resultPoint ? "error" : undefined
                    }
                    help={errors.educationInfo?.resultPoint?.message}
                  >
                    <Input
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      {...field}
                      placeholder="Result Point"
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
      </div>
    </section>
  );
};

export default AdmissionForm;
