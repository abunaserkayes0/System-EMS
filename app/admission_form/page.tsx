"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, Select, DatePicker } from "antd";
import HeaderDiv from "@/components/header";
import { CloseSquareOutlined } from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
const { Option } = Select;

export type FormInput = {
  admissionID: string;
  name: string;
  email: string;
  grade: string;
  section: string;
  dateOfBirth: string;
  isStudent: boolean;
  fatherName: string;
  fatherNID: string;
  motherName: string;
  motherNID: string;
  gender: string;
  address: string;
  zipCode: string;
  bloodGroup: string;
  nationality: string;
  religion: string;
  birthRegistrationNumber: string;
  picture: string;
  qualifications: string;
  testimonial: string;
  studentMobileNumber: string;
  parentsMobileNumber: string;
  username: string;
  password: string;
};

const AdmissionForm: React.FC = () => {
  /* const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>(); */
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();

  /*  const onSubmit = async (data: FormInput) => {
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
  const onSubmit = (values: any) => {
    const newStudent = {
      admissionID: values.admissionID,
      name: values.name,
      email: values.email,
      username: values.username,
      password: values.password,
      dateOfBirth: values.dateOfBirth,
      gender: values.gender,
      bloodGroup: values.bloodGroup,
      nationality: values.nationality,
      religion: values.religion,
      picture: "picture.jpg",
      birthRegistrationNumber: values.birthRegistrationNumber,
      address: values.address,
      zipCode: values.zipCode,
      grade: values.grade,
      section: values.section,
      qualifications: values.qualifications,
      testimonial: values.testimonial,
      fatherName: values.fatherName,
      fatherNID: values.fatherNID,
      motherName: values.motherName,
      motherNID: values.motherNID,
      studentMobileNumber: values.studentMobileNumber,
      parentsMobileNumber: values.parentsMobileNumber,
    };

    axios
      .post(
        `http://143.110.190.164:3001/public/student/admission/create`,

        newStudent
      )
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            title: "Success",
            text: "Student Added Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          reset();
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            title: "Error",
            text: "Student Added Failed",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      });
  };

  return (
    <section className="bg-[#ecf0f1]">
      <div className="flex flex-col container px-6 py-6">
        <div className="">
          <HeaderDiv />
        </div>
        <div className="bg-white flex flex-row justify-between h-full mt-3 px-4 py-4 rounded-lg">
          <h1 className="text-lg">Admission Form</h1>
          <Link href="/admission_view">
            <button>
              <CloseSquareOutlined />
            </button>
          </Link>
        </div>

        <div className="w-full max-h-full h-[560px] overflow-hidden overflow-y-scroll no-scrollbar mb-12 items-center mt-2 bg-white px-9 py-5 rounded-lg">
          <Form className="px-4" onFinish={handleSubmit(onSubmit)}>
            <h2 className="text-[23px] font-semibold mb-5">
              Basic Information
            </h2>
            <div className="grid grid-cols-3 gap-x-20 gap-y-8">
              <Controller
                name="admissionID"
                control={control}
                rules={{ required: "Please Enter a Valid ID" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.admissionID ? "error" : undefined}
                    help={errors.admissionID?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Admission ID"
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
              <Controller
                name="email"
                control={control}
                rules={{ required: "Please Enter Your Email" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.email ? "error" : undefined}
                    help={errors.email?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Enter Your Email"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="username"
                control={control}
                rules={{ required: "Please Enter Your Username" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.username ? "error" : undefined}
                    help={errors.username?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-blue-400 rounded-none focus:shadow-none"
                      placeholder="Enter Your Username"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{ required: "Please Enter Your Password" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.password ? "error" : undefined}
                    help={errors.password?.message}
                  >
                    <Input.Password
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-blue-400 rounded-none focus:shadow-none"
                      placeholder="Enter Your Password"
                    />
                  </Form.Item>
                )}
              />
            </div>
            <h2 className="text-[23px] font-semibold mb-5 mt-10">
              Institute Information
            </h2>
            <div className="grid grid-cols-3 gap-x-20">
              <Controller
                name="grade"
                control={control}
                rules={{ required: "grade is Required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.grade ? "error" : undefined}
                    help={errors.grade?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Grade"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="section"
                control={control}
                rules={{ required: "Section is Required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.section ? "error" : undefined}
                    help={errors.section?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Section"
                    />
                  </Form.Item>
                )}
              />
            </div>
            <h2 className="text-[23px] font-semibold mb-5 mt-10">
              Personal Information
            </h2>
            <div className="grid grid-cols-3 gap-x-20 gap-y-8">
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{ required: "Date Of Birth is required" }}
                render={({ field, fieldState }) => (
                  <Form.Item
                    validateStatus={fieldState.invalid ? "error" : undefined}
                    help={fieldState.invalid ? fieldState?.error?.message : ""}
                  >
                    <DatePicker
                      {...field}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      style={{ width: "100%", boxShadow: "none" }}
                      placeholder="Date of Birth"
                      format="YYYY-MM-DD"
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="fatherName"
                control={control}
                rules={{ required: "Father's Name is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.fatherName ? "error" : undefined}
                    help={errors.fatherName?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Father's Name"
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="motherName"
                control={control}
                rules={{ required: "Student's Number is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.motherName ? "error" : undefined}
                    help={errors.motherName?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Mother's Name"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="fatherNID"
                control={control}
                rules={{ required: "Father's NID is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.fatherNID ? "error" : undefined}
                    help={errors.fatherNID?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Father's NID"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="motherNID"
                control={control}
                rules={{ required: "Mother's Number is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.motherNID ? "error" : undefined}
                    help={errors.motherNID?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Mother's NID"
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
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Custom">Custom</Option>
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
                name="parentsMobileNumber"
                control={control}
                rules={{ required: "parentsMobileNumber is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={
                      errors.parentsMobileNumber ? "error" : undefined
                    }
                    help={errors.parentsMobileNumber?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Parents Mobile"
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="religion"
                control={control}
                rules={{ required: "Present religion is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.religion ? "error" : undefined}
                    help={errors.religion?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Present religion"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="nationality"
                control={control}
                rules={{ required: "nationality is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.nationality ? "error" : undefined}
                    help={errors.nationality?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="nationality"
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="zipCode"
                control={control}
                rules={{ required: "zipCode is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.zipCode ? "error" : undefined}
                    help={errors.zipCode?.message}
                  >
                    <Input
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      {...field}
                      placeholder="zipCode"
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="bloodGroup"
                control={control}
                rules={{ required: "Blood Group is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.bloodGroup ? "error" : undefined}
                    help={errors.bloodGroup?.message}
                  >
                    <Select
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-solid hover:border-blue-400"
                      bordered={false}
                      placeholder="Blood Group"
                    >
                      <Option value="A+">A+</Option>
                      <Option value="B+">B+</Option>
                      <Option value="AB+">AB+</Option>
                      <Option value="O+">O+</Option>
                      <Option value="A-">A-</Option>
                      <Option value="B-">B-</Option>
                      <Option value="AB-">AB-</Option>
                      <Option value="O-">O-</Option>
                    </Select>
                  </Form.Item>
                )}
              />
              <Controller
                name="studentMobileNumber"
                control={control}
                rules={{ required: "Parent's NID is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={
                      errors.studentMobileNumber ? "error" : undefined
                    }
                    help={errors.studentMobileNumber?.message}
                  >
                    <Input
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      {...field}
                      placeholder="Student's Mobile"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="birthRegistrationNumber"
                control={control}
                rules={{ required: "Birth Reg. Card is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={
                      errors.birthRegistrationNumber ? "error" : undefined
                    }
                    help={errors.birthRegistrationNumber?.message}
                  >
                    <Input
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      {...field}
                      placeholder="Birth Reg Card"
                    />
                  </Form.Item>
                )}
              />
            </div>
            <h2 className="text-[23px] font-semibold mb-5 mt-10">
              Educational Information
            </h2>
            <div className="grid grid-cols-3 gap-x-20 gap-y-8">
              <Controller
                name="qualifications"
                control={control}
                rules={{ required: "Educational Qualification is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.qualifications ? "error" : undefined}
                    help={errors.qualifications?.message}
                  >
                    <Input
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      {...field}
                      placeholder="Educational Qualification"
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="testimonial"
                control={control}
                rules={{ required: "Testimonial is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.testimonial ? "error" : undefined}
                    help={errors.testimonial?.message}
                  >
                    <Input
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      {...field}
                      placeholder="Testimonial"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="picture"
                control={control}
                rules={{ required: "Passport picture  is required" }}
                render={({ field }) => (
                  <Form.Item
                    label="Picture"
                    validateStatus={errors.picture ? "error" : undefined}
                    help={errors.picture?.message}
                  >
                    <Input
                      type="file"
                      {...field}
                      placeholder="Passport Photo"
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
