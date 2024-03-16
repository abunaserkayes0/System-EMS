"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, Select, DatePicker, Upload } from "antd";
import HeaderDiv from "@/components/header";
import { CloseSquareOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
const { Option } = Select;

export type FormInput = {
  adminID: string;
  name: string;
  email: string;
  mobileNumber: string;
  joiningDate: string;
  religion: string;
  nationality: string;
  gender: string;
  adminExperienceYear: string;
  NID: string;
  picture: FileList;
  address: string;
  adminDesignation: string;
  educationInfo: {
    instituteName: string;
    completeYear: string;
    resultPoint: string;
  };
  username: string;
  password: string;
};

const AdminForm: React.FC = () => {
  const [items, setItems] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormInput>();

  const onSubmit = async (data: FormInput) => {
    // e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("mobileNumber", data.mobileNumber);
      formData.append("joiningDate", data.joiningDate);
      formData.append("religion", data.religion);
      formData.append("nationality", data.nationality);
      formData.append("gender", data.gender);
      formData.append("adminExperienceYear", data.adminExperienceYear);
      formData.append("NID", data.NID);
      formData.append("address", data.address);
      formData.append("adminDesignation", data.adminDesignation);
      formData.append(
        "educationInfo.instituteName",
        data.educationInfo.instituteName
      );
      formData.append(
        "educationInfo.completeYear",
        data.educationInfo.completeYear
      );
      formData.append(
        "educationInfo.resultPoint",
        data.educationInfo.resultPoint
      );
      formData.append("username", data.username);
      formData.append("password", data.password);
      formData.append("picture", data.picture[0]);
      console.log("FormData:", formData);

      const response = await axios.post(
        "http://143.110.190.164:3001/admin/profile/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        console.log("Expense created successfully:", response.data);
      } else {
        console.error("Error creating expense:", response.data);
      }
    } catch (error) {
      console.error("Internal Server Error:", error);
    }
  };

  /*  const onSubmit = async (data: FormInput) => {
    const formData = new FormData();
    if (data.picture.length > 0) {
      formData.append("picture", data.picture[0]);
    } // Append the image file

    // Append other form data fields
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobileNumber", data.mobileNumber);
    formData.append("joiningDate", data.joiningDate);
    formData.append("religion", data.religion);
    formData.append("nationality", data.nationality);
    formData.append("gender", data.gender);
    formData.append("adminExperienceYear", data.adminExperienceYear);
    formData.append("NID", data.NID);
    formData.append("address", data.address);
    formData.append("adminDesignation", data.adminDesignation);
    formData.append(
      "educationInfo.instituteName",
      data.educationInfo.instituteName
    );
    formData.append(
      "educationInfo.completeYear",
      data.educationInfo.completeYear
    );
    formData.append(
      "educationInfo.resultPoint",
      data.educationInfo.resultPoint
    );
    formData.append("username", data.username);
    formData.append("password", data.password);
    // Append other form fields similarly

    try {
      const response = await fetch(
        "http://143.110.190.164:3002/admin/papers/create",
        {
          method: "POST",
          body: formData,
        }
      );

      console.log("FormData:", formData);
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }

    const newAdmin = {
      name: data.name,
      email: data.email,
      mobileNumber: data.mobileNumber,
      joiningDate: data.joiningDate,
      religion: data.religion,
      nationality: data.nationality,
      gender: data.gender,
      adminExperienceYear: Number(data.adminExperienceYear),
      NID: data.NID,
      picture: "picture.jpg",
      address: data.address,
      adminDesignation: data.adminDesignation,
      educationInfo: {
        instituteName: data.educationInfo.instituteName,
        completeYear: Number(data.educationInfo.completeYear),
        resultPoint: Number(data.educationInfo.resultPoint),
      },
      username: data.username,
      password: data.password,
    };
    axios
      .post(`http://143.110.190.164:3001/admin/profile/create`, newAdmin)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            title: "Success",
            text: "Admin Added Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          reset();
        }
      })
      .catch((error) => {
        if (error.response.data.message) {
          Swal.fire({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      });
  };
 */
  return (
    <section className="bg-[#ecf0f1]">
      <div className="flex flex-col container px-6 py-6">
        <HeaderDiv />
        <div className="bg-white flex flex-row justify-between  mt-8 px-4 py-2">
          <h1 className="text-lg" style={{ color: "#263238" }}>
            Admin Form
          </h1>
          <button>
            <Link href="/admin_list">
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
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Username"
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
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Password"
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
                      placeholder="mobileNumber string"
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
                name="adminExperienceYear"
                control={control}
                rules={{ required: "Admin Experience Year is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={
                      errors.adminExperienceYear ? "error" : undefined
                    }
                    help={errors.adminExperienceYear?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Admin Experience Year"
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
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
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
                name="adminDesignation"
                control={control}
                rules={{ required: "adminDesignation is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={
                      errors.adminDesignation ? "error" : undefined
                    }
                    help={errors.adminDesignation?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="adminDesignation"
                    />
                  </Form.Item>
                )}
              />
              {/* <Controller
                name="picture"
                control={control}
                render={({ field }) => (
                  <Upload
                    maxCount={1}
                    customRequest={({ file }) => {
                      setValue("picture", [file]);
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Select Image</Button>
                  </Upload>
                )}
              /> */}
              <Controller
                name="picture"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    label="Picture"
                    validateStatus={errors.picture ? "error" : ""}
                    help={errors.picture && errors.picture.message}
                  >
                    <Upload
                      accept="image/*"
                      maxCount={1}
                      // fileList={field.value}
                      onChange={(info) => {
                        const fileList = [...info.fileList];
                        field.onChange(fileList);
                      }}
                      beforeUpload={(file) => {
                        field.onChange([file]);
                        return false;
                      }}
                    >
                      <Button icon={<UploadOutlined />}>Select Image</Button>
                    </Upload>
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
                      placeholder="CompleteYear"
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

export default AdminForm;
