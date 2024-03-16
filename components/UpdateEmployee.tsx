"use client";
import { FormInput } from "@/app/employee_form/page";
import { Button, Form, Input, Select, DatePicker } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
const { Option } = Select;
type EmployeeId = {
  employeeId: string;
  refetch: () => void;
  setIsModalOpen: (value: boolean) => void;
};

export default function UpdateEmployee({
  employeeId,
  setIsModalOpen,
  refetch,
}: EmployeeId) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const [employeeID, setEmployeeID] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [joiningDate, setJoiningDate] = useState<string>("");
  const [religion, setReligion] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [employeeExperienceYear, setEmployeeExperienceYear] =
    useState<string>("");
  const [NID, setNID] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [employeeDesignation, setEmployeeDesignation] = useState<string>("");
  const [experienceSubject, setExperienceSubject] = useState<string>("");
  const [salaryAmount, setSalaryAmount] = useState<string>("");
  const [instituteName, setInstituteName] = useState<string>("");
  const [completeYear, setCompleteYear] = useState<string>("");
  const [resultPoint, setResultPoint] = useState<string>("");

  useEffect(() => {
    axios
      .get(
        `http://143.110.190.164:3001/admin/employee/profile/find/${employeeId}`
      )
      .then((res) => {
        const data = res.data.data;
        if (data) {
          setEmployeeID(data.employeeID);
          setName(data.name);
          setEmail(data.email);
          setMobileNumber(data.mobileNumber);
          setJoiningDate(data.joiningDate);
          setReligion(data.religion);
          setNationality(data.nationality);
          setEmployeeExperienceYear(data.employeeExperienceYear);
          setNID(data.NID);
          setGender(data.gender);
          setAddress(data.address);
          setEmployeeDesignation(data.employeeDesignation);
          setExperienceSubject(data.experienceSubject);
          setSalaryAmount(data.salaryAmount);
          setInstituteName(data.educationInfo.instituteName);
          setCompleteYear(data.educationInfo.completeYear);
          setResultPoint(data.educationInfo.resultPoint);
        }
      })

      .catch((err) => console.log(err));
  }, [employeeId]);

  const onSubmit = () => {
    const employeeInfo = {
      employeeID,
      name,
      email,
      mobileNumber,
      joiningDate,
      religion,
      nationality,
      gender,
      employeeExperienceYear,
      NID,
      experienceSubject,
      address,
      employeeDesignation,
      salaryAmount,
      educationInfo: {
        instituteName,
        completeYear,
        resultPoint,
      },
    };

    axios
      .put(
        `http://143.110.190.164:3001/admin/employee/profile/update/${employeeId}`,
        employeeInfo
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
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full mb-12  items-center  mt-6  bg-white px-9 py-5 rounded-lg">
      <Form className="px-4" onFinish={handleSubmit(onSubmit)}>
        <h2 className="text-[23px] font-semibold mb-5">Basic Information</h2>
        <div className="grid grid-cols-3 gap-x-20">
          <Controller
            name="employeeID"
            control={control}
            render={({ field }) => (
              <Form.Item
                validateStatus={errors.employeeID ? "error" : undefined}
                help={errors?.employeeID?.message}
              >
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Employee Id"
                  onChange={(e) => setEmployeeID(e.target.value)}
                  value={employeeID}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="name"
            control={control}
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
                  onChange={(e) => setName(e.target.value)}
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
              <Form.Item
                validateStatus={errors.email ? "error" : undefined}
                help={errors.email?.message}
              >
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Email"
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
              <Form.Item
                validateStatus={errors.mobileNumber ? "error" : undefined}
                help={errors.mobileNumber?.message}
              >
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
            name="religion"
            control={control}
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
                  onChange={(e) => setReligion(e.target.value)}
                  value={religion}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="nationality"
            control={control}
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
                  onChange={(e) => setNationality(e.target.value)}
                  value={nationality}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="employeeExperienceYear"
            control={control}
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
              <Form.Item
                validateStatus={errors.NID ? "error" : undefined}
                help={errors.NID?.message}
              >
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
                  onChange={(e) => {
                    setGender(e);
                    field.onChange(e);
                  }}
                  value={gender}
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
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="employeeDesignation"
            control={control}
            render={({ field }) => (
              <Form.Item
                validateStatus={
                  errors.employeeDesignation ? "error" : undefined
                }
                help={errors.employeeDesignation?.message}
              >
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="employeeDesignation"
                  onChange={(e) => setEmployeeDesignation(e.target.value)}
                  value={employeeDesignation}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="experienceSubject"
            control={control}
            render={({ field }) => (
              <Form.Item
                validateStatus={errors.experienceSubject ? "error" : undefined}
                help={errors.experienceSubject?.message}
              >
                <Input
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  {...field}
                  placeholder="Employee Experience Year"
                  onChange={(e) => setExperienceSubject(e.target.value)}
                  value={experienceSubject}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="salaryAmount"
            control={control}
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
                  onChange={(e) => {
                    setSalaryAmount(e);
                    field.onChange(e);
                  }}
                  value={salaryAmount}
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
            name="educationInfo.resultPoint"
            control={control}
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
                  onChange={(e) => setResultPoint(e.target.value)}
                  value={resultPoint}
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
