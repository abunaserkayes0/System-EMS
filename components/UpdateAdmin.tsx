"use client";
import { FormInput } from "@/app/admin_form/page";
import useFetch from "@/hooks/useFetch";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function UpdateAdmin({
  adminID,
  setIsModalOpen,
  refetch,
}: {
  adminID: string;
  setIsModalOpen: (value: boolean) => void;
  refetch: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const [adminId, setAdminId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [religion, setReligion] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [adminExperienceYear, setAdminExperienceYear] = useState("");
  const [NID, setNID] = useState("");
  const [picture, setPicture] = useState("");
  const [address, setAddress] = useState("");
  const [adminDesignation, setAdminDesignation] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [completeYear, setCompleteYear] = useState("");
  const [resultPoint, setResultPoint] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .get(`http://143.110.190.164:3001/admin/profile/find/${adminID}`)
      .then((res) => {
        const data = res.data.data;
        if (data) {
          const data = res.data.data;
          setAdminId(data.adminID);
          setName(data.name);
          setEmail(data.email);
          setMobileNumber(data.mobileNumber);
          setJoiningDate(data.joiningDate);
          setReligion(data.religion);
          setNationality(data.nationality);
          setGender(data.gender);
          setAdminExperienceYear(data.adminExperienceYear);
          setNID(data.NID);
          setAddress(data.address);
          setAdminDesignation(data.adminDesignation);
          setInstituteName(data.educationInfo.instituteName);
          setCompleteYear(data.educationInfo.completeYear);
          setResultPoint(data.educationInfo.resultPoint);
        }
      })
      .catch((err) => console.log(err));
  }, [adminID]);
  const onSubmit = () => {
    const updateAdmin = {
      adminID,
      name,
      email,
      mobileNumber,
      joiningDate,
      religion,
      nationality,
      gender,
      adminExperienceYear,
      NID,
      picture: "pic.jpg",
      address,
      adminDesignation,
      educationInfo: {
        instituteName,
        completeYear,
        resultPoint,
      },
    };

    axios
      .put(
        `http://143.110.190.164:3001/admin/profile/update/${adminID}`,
        updateAdmin
      )
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Notice Updated Successfully",
            timer: 1500,
            showConfirmButton: false,
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
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Enter Your Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
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
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="mobileNumber"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Mobile Number"
                  onChange={(e) => setMobileNumber(e.target.value)}
                  value={mobileNumber}
                />
              </Form.Item>
            )}
          />
        </div>
        <h2 className="text-[23px] font-semibold mb-5">Personal Information</h2>
        <div className="grid grid-cols-3 gap-x-20">
          <Controller
            name="joiningDate"
            control={control}
            render={({ field, fieldState }) => (
              <Form.Item>
                <DatePicker
                  {...field}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  style={{ width: "100%", boxShadow: "none" }}
                  placeholder="Joining Date"
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    const date = moment(value);
                    setJoiningDate(date.isValid() ? date : null);
                    field.onChange(date.isValid() ? date.toDate() : null);
                  }}
                  value={joiningDate ? moment(joiningDate) : null}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="nationality"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Nationality"
                  onChange={(e) => setNationality(e.target.value)}
                  value={nationality}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="religion"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="religion"
                  onChange={(e) => setReligion(e.target.value)}
                  value={religion}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="adminExperienceYear"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Employee Experience Year"
                  onChange={(e) => setAdminExperienceYear(e.target.value)}
                  value={adminExperienceYear}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="NID"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="NID"
                  onChange={(e) => setNID(e.target.value)}
                  value={NID}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Select
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-solid hover:border-blue-400"
                  bordered={false}
                  placeholder="Gender"
                  onChange={(e) => {
                    setGender(e);
                    field.onChange(e);
                  }}
                  value={gender}
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
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="adminDesignation"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="adminDesignation"
                  onChange={(e) => setAdminDesignation(e.target.value)}
                  value={adminDesignation}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="picture"
            control={control}
            render={({ field }) => (
              <Form.Item label="Passport picture">
                <Input
                  type="file"
                  {...field}
                  placeholder="Passport Photo"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setPicture(file);
                    field.onChange(file);
                  }}
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
            render={({ field }) => (
              <Form.Item>
                <Input
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  {...field}
                  placeholder="result Point"
                  onChange={(e) => setResultPoint(e.target.value)}
                  value={resultPoint}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="educationInfo.instituteName"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  {...field}
                  placeholder="institution Name"
                  onChange={(e) => setInstituteName(e.target.value)}
                  value={instituteName}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="educationInfo.completeYear"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  {...field}
                  placeholder="complete Year"
                  onChange={(e) => setCompleteYear(e.target.value)}
                  value={completeYear}
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
