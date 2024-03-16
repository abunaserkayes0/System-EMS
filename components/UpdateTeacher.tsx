"use client";
import { FormInput } from "@/app/teacher_form/page";
import { Button, Form, Input, Select, DatePicker } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
const { Option } = Select;
type TeacherID = {
  teacherId: string;
  setIsModalOpen: (value: boolean) => void;
  refetch: () => void;
};

export default function UpdateTeacher({
  teacherId,
  setIsModalOpen,
  refetch,
}: TeacherID) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const [teacherID, setTeacherID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [religion, setReligion] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [employeeExperienceYear, setEmployeeExperienceYear] = useState("");
  const [NID, setNID] = useState("");
  const [picture, setPicture] = useState("");
  const [experienceSubject, setExperienceSubject] = useState("");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");
  const [salaryAmount, setSalaryAmount] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [completeYear, setCompleteYear] = useState("");
  const [resultPoint, setResultPoint] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://143.110.190.164:3001/admin/teacher/profile/find/${teacherId}`
      )
      .then((res) => {
        const data = res.data.data;
        setTeacherID(data.teacherID);
        setName(data.name);
        setEmail(data.email);
        setMobileNumber(data.mobileNumber);
        setJoiningDate(data.joiningDate);
        setReligion(data.religion);
        setNationality(data.nationality);
        setGender(data.gender);
        setEmployeeExperienceYear(data.employeeExperienceYear);
        setNID(data.NID);
        setExperienceSubject(data.experienceSubject);
        setAddress(data.address);
        setDesignation(data.designation);
        setSalaryAmount(data.salaryAmount);
        setInstituteName(data.educationInfo.instituteName);
        setCompleteYear(data.educationInfo.completeYear);
        setResultPoint(data.educationInfo.resultPoint);
      })
      .catch((err) => console.log(err));
  }, [teacherId]);

  const onSubmit = () => {
    const teacherInfo = {
      educationInfo: {
        instituteName,
        completeYear,
        resultPoint,
      },
      teacherID,
      name,
      email,
      mobileNumber,
      joiningDate,
      religion,
      nationality,
      gender,
      employeeExperienceYear,
      NID,
      picture: "pic.jpg",
      experienceSubject,
      address,
      designation,
      salaryAmount,
    };
    axios
      .put(
        `http://143.110.190.164:3001/admin/teacher/profile/update/${teacherId}`,
        teacherInfo
      )
      .then((res) => {
        if (res.data) {
          Swal.fire({
            icon: "success",
            title: "Teacher Updated Successfully",
          });
          refetch();
          setIsModalOpen(false);
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Teacher Updated Failed",
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
            name="teacherID"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Teacher ID"
                  onChange={(e) => {
                    setTeacherID(e.target.value);
                  }}
                  value={teacherID}
                />
              </Form.Item>
            )}
          />
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
            name="employeeExperienceYear"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Employee Experience Year"
                  onChange={(e) => setEmployeeExperienceYear(e.target.value)}
                  value={employeeExperienceYear}
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
            name="experienceSubject"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder=" Experience Subject"
                  onChange={(e) => setExperienceSubject(e.target.value)}
                  value={experienceSubject}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="designation"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Designation"
                  onChange={(e) => setDesignation(e.target.value)}
                  value={designation}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="salaryAmount"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="salaryAmount"
                  onChange={(e) => setSalaryAmount(e.target.value)}
                  value={salaryAmount}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="instituteName"
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
            name="completeYear"
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
        <h2 className="text-[23px] font-semibold mb-5">
          Educational Information
        </h2>
        <div className="grid grid-cols-3 gap-x-20">
          <Controller
            name="resultPoint"
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
