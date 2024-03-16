"use client";
import { FormInput } from "@/app/admission_form/page";
import { Button, Form, Input, Select, DatePicker } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
const { Option } = Select;
type AdmissionProps = {
  admissionID: string;
  setIsModalOpen: (value: boolean) => void;
  refetch: () => void;
};

export default function UpdateAdmissionStudent({
  admissionID,
  setIsModalOpen,
  refetch,
}: AdmissionProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  // const [admissionID, setAdmissionID] = useState("");
  const [studentName, setStudentName] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [fatherNID, setFatherNID] = useState("");
  const [motherNID, setMotherNID] = useState("");
  const [address, setAddress] = useState("");
  const [parentsMobileNumber, setParentsMobileNumber] = useState("");
  const [studentMobileNumber, setStudentMobileNumber] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [nationality, setNationality] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [birthRegistrationNumber, setBirthRegistrationNumber] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [qualification, setQualification] = useState("");
  const [picture, setPicture] = useState(null);
  const [testimonial, setTestimonial] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://143.110.190.164:3001/admin/student/admission/find/${admissionID}`
      )
      .then((res) => {
        const data = res.data.data;
        // console.log(data);

        if (data) {
          // setAdmissionID(data.studentID);
          setStudentName(data.name);
          setGrade(data.grade);
          setSection(data.section);
          setDateOfBirth(data.dateOfBirth);
          setFatherName(data.fatherName);
          setMotherName(data.motherName);
          setFatherNID(data.fatherNID);
          setMotherNID(data.motherNID);
          setAddress(data.address);
          setGender(data.gender);
          setParentsMobileNumber(data.parentsMobileNumber);
          setReligion(data.religion);
          setBloodGroup(data.bloodGroup);
          setNationality(data.nationality);
          setZipCode(data.zipCode);
          setBirthRegistrationNumber(data.birthRegistrationNumber);
          setQualification(data.qualifications);
          setTestimonial(data.testimonial);
          setStudentMobileNumber(data.studentMobileNumber);
        }
      })
      .catch((err) => console.log(err));
  }, [admissionID]);

  const onSubmit = () => {
    const StudentInfo = {
      studentID: admissionID,
      name: studentName,
      dateOfBirth: dateOfBirth,
      gender: gender,
      bloodGroup: bloodGroup,
      nationality: nationality,
      religion: religion,
      picture: "profile_picture.jpg",
      birthRegistrationNumber: birthRegistrationNumber,
      address: address,
      zipCode: zipCode,
      grade: grade,
      section: section,
      qualifications: qualification,
      testimonial: testimonial,
      fatherName: fatherName,
      fatherNID: fatherNID,
      motherName: motherName,
      motherNID: motherNID,
      studentMobileNumber: studentMobileNumber,
      parentsMobileNumber: parentsMobileNumber,
    };

    axios
      .put(
        `http://143.110.190.164:3001/admin/student/admission/update/${admissionID}`,
        StudentInfo
      )
      .then((res) => {
        if (res.data) {
          Swal.fire({
            title: "Success",
            text: "Student Admission Updated Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          refetch();
          setIsModalOpen(false);
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Oops...",
          text: "Something went wrong!",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  return (
    <div className="w-full mb-12  items-center  mt-6  bg-white px-9 py-5 rounded-lg">
      <Form className="px-4" onFinish={handleSubmit(onSubmit)}>
        <h2 className="text-[23px] font-semibold mb-5">Basic Information</h2>
        <div className="grid grid-cols-3 gap-x-20">
          {/* <Controller
            name="admissionID"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Admission ID"
                  onChange={(e) => {
                    setAdmissionID(e.target.value);
                  }}
                  value={admissionID}
                />
              </Form.Item>
            )}
          /> */}
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
                    setStudentName(e.target.value);
                  }}
                  value={studentName}
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
            name="grade"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Grade"
                  onChange={(e) => setGrade(e.target.value)}
                  value={grade}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="section"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Section"
                  onChange={(e) => setSection(e.target.value)}
                  value={section}
                />
              </Form.Item>
            )}
          />
        </div>
        <h2 className="text-[23px] font-semibold mb-5">Personal Information</h2>
        <div className="grid grid-cols-3 gap-x-20">
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field, fieldState }) => (
              <Form.Item>
                <DatePicker
                  {...field}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  style={{ width: "100%", boxShadow: "none" }}
                  placeholder="Date of Birth"
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    const date = moment(value);
                    setDateOfBirth(date.isValid() ? date : null);
                    field.onChange(date.isValid() ? date.toDate() : null);
                  }}
                  value={dateOfBirth ? moment(dateOfBirth) : null}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="fatherName"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Father's Name"
                  onChange={(e) => setFatherName(e.target.value)}
                  value={fatherName}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="motherName"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Student's Mobile Number"
                  onChange={(e) => setMotherName(e.target.value)}
                  value={motherName}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="fatherNID"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Father's NID"
                  onChange={(e) => setFatherNID(e.target.value)}
                  value={fatherNID}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="motherNID"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Mother's NID"
                  onChange={(e) => setMotherNID(e.target.value)}
                  value={motherNID}
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
            name="parentsMobileNumber"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Parents Mobile"
                  onChange={(e) => setParentsMobileNumber(e.target.value)}
                  value={parentsMobileNumber}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="studentMobileNumber"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="Parents Mobile"
                  onChange={(e) => setParentsMobileNumber(e.target.value)}
                  value={studentMobileNumber}
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
                  placeholder="Present religion"
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
              <Form.Item>
                <Input
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  placeholder="nationality"
                  onChange={(e) => setNationality(e.target.value)}
                  value={nationality}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="zipCode"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  {...field}
                  placeholder="zipCode"
                  onChange={(e) => setZipCode(e.target.value)}
                  value={zipCode}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="bloodGroup"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Select
                  {...field}
                  style={{ boxShadow: "none" }}
                  className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-solid hover:border-blue-400"
                  bordered={false}
                  placeholder="Blood Group"
                  onChange={(e) => {
                    setBloodGroup(e);
                    field.onChange(e);
                  }}
                  value={bloodGroup}
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
            name="parentsMobileNumber"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  {...field}
                  placeholder="Parent's NID"
                  onChange={(e) => setParentsMobileNumber(e.target.value)}
                  value={parentsMobileNumber}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="birthRegistrationNumber"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  {...field}
                  placeholder="Birth Reg Card"
                  onChange={(e) => setBirthRegistrationNumber(e.target.value)}
                  value={birthRegistrationNumber}
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
            name="qualifications"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  {...field}
                  placeholder="Educational Qualification"
                  onChange={(e) => setQualification(e.target.value)}
                  value={qualification}
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
          <Controller
            name="testimonial"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <Input
                  style={{ boxShadow: "none" }}
                  className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                  {...field}
                  placeholder="Testimonial"
                  onChange={(e) => setTestimonial(e.target.value)}
                  value={testimonial}
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
