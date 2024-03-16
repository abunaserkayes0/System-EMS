"use client";
import HeaderDiv from "@/components/header";
import { Button, Card, Form, Input, Select } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { CloseSquareOutlined } from "@ant-design/icons";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";

export type FormInput = {
  studentID: string | string[];
  classID: string;
  className: string;
  section: string;
  shift: string;
  year: number;
  courses: [
    {
      courseCode: number;
      courseName: string;
      courseTeacherID: string;
    }
  ];
};

export default function ClassroomForm() {
  const { data, loading } = useFetch(
    "http://143.110.190.164:3001/admin/student/admission/find/all"
  );
  const { data: result } = useFetch(
    "http://143.110.190.164:3001/admin/teacher/profile/find/all"
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();
  const onSubmit = (data: FormInput) => {
    const newClassroom = {
      classID: data.classID,
      className: data.className,
      section: data.section,
      shift: data.shift,
      year: data.year,
      courses: data.courses,
      studentIDs: data.studentID,
    };
    axios
      .post(`http://143.110.190.164:3001/admin/classroom/create`, newClassroom)
      .then((res) => {
        if (res.data) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Classroom Created Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        }
      })
      .catch((err) => {
        if (err)
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Classroom Created Failed",
            showConfirmButton: false,
            timer: 1500,
          });
      });
  };
  return (
    <section className="bg-[#ecf0f1]">
      <div className="flex flex-col container px-6 py-6">
        <HeaderDiv />
        <div className="bg-white flex flex-row justify-between  mt-8 px-4 py-2">
          <h1 className="text-lg" style={{ color: "#263238" }}>
            ClassRoom Form
          </h1>
          <Link href="/classroom_view">
            <button>
              <CloseSquareOutlined />
            </button>
          </Link>
        </div>

        <div className="w-full mb-12  items-center  mt-6  bg-white px-9 py-5 rounded-lg">
          <Form className="px-4" onFinish={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-x-20">
              <Controller
                name="studentID"
                control={control}
                // defaultValue={[]}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.studentID ? "error" : undefined}
                    help={errors.studentID?.message}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Inserted are removed"
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-solid hover:border-blue-400"
                      bordered={false}
                      options={data.map((item: any) => ({
                        value: item.admissionID,
                        label: item.admissionID,
                      }))}
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="classID"
                control={control}
                rules={{ required: "Please Enter a Valid ID" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.classID ? "error" : undefined}
                    help={errors?.classID?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Enter Your classID"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="className"
                control={control}
                rules={{ required: "Please Enter Your Name" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.className ? "error" : undefined}
                    help={errors.className?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Enter Your ClassRoom Name"
                    />
                  </Form.Item>
                )}
              />
            </div>
            <div className="grid grid-cols-3 gap-x-20">
              <Controller
                name="section"
                control={control}
                rules={{ required: "Please enter section" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.section ? "error" : undefined}
                    help={errors?.section?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Enter Your section"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="shift"
                control={control}
                rules={{ required: "Please Enter Correct shift" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.shift ? "error" : undefined}
                    help={errors.shift?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Enter Your shift"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="year"
                control={control}
                rules={{ required: "Please Enter  year" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.year ? "error" : undefined}
                    help={errors.year?.message}
                  >
                    <Input
                      {...field}
                      style={{ boxShadow: "none" }}
                      className="shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none"
                      placeholder="Enter Your year"
                    />
                  </Form.Item>
                )}
              />
            </div>
            <div>
              <Form.List name="courses" initialValue={[{}]}>
                {(fields, { add, remove }) => (
                  <>
                    <div className="grid grid-cols-3 gap-4">
                      {fields.map((field) => (
                        <Card
                          title={`Item ${field.name + 1}`}
                          key={field.key}
                          extra={
                            fields.length > 1 && (
                              <CloseSquareOutlined
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            )
                          }
                        >
                          <Controller
                            name={`courses[${field.name}].courseCode`}
                            control={control}
                            render={({ field }) => (
                              <Form.Item>
                                <Input
                                  style={{ boxShadow: "none" }}
                                  className="p-3 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-l-0 hover:border-t-0 hover:border-r-0 hover:border-solid hover:border-blue-400"
                                  bordered={false}
                                  {...field}
                                  placeholder="Course Code"
                                />
                              </Form.Item>
                            )}
                          />
                          <Controller
                            name={`courses[${field.name}].courseName`}
                            control={control}
                            render={({ field }) => (
                              <Form.Item>
                                <Input
                                  {...field}
                                  style={{ boxShadow: "none" }}
                                  className="p-3 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-l-0 hover:border-t-0 hover:border-r-0 hover:border-solid hover:border-blue-400"
                                  bordered={false}
                                  placeholder="Course Name"
                                />
                              </Form.Item>
                            )}
                          />
                          {/* <Controller
                            name={`courses[${field.name}].courseTeacherID`}
                            control={control}
                            render={({ field }) => (
                              <Form.Item>
                                <Input
                                  {...field}
                                  placeholder="Course Teacher ID"
                                />
                              </Form.Item>
                            )}
                          /> */}
                          <Controller
                            name={`courses[${field.name}].courseTeacherID`}
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Form.Item
                                validateStatus={
                                  errors.studentID ? "error" : undefined
                                }
                                help={errors.studentID?.message}
                              >
                                <Select
                                  placeholder="Course Teacher ID"
                                  {...field}
                                  style={{ boxShadow: "none" }}
                                  className="p-0 shadow-none border-x-0 border-t-0 border-b border-solid border-slate-400 rounded-none focus:shadow-none hover:border-b hover:border-solid hover:border-blue-400"
                                  bordered={false}
                                  options={result.map((item: any) => ({
                                    value: item.teacherID,
                                    label: item.teacherID,
                                  }))}
                                />
                              </Form.Item>
                            )}
                          />
                        </Card>
                      ))}
                    </div>
                    <div className="my-3">
                      <Button onClick={() => add()} block>
                        + Add More Course
                      </Button>
                    </div>
                  </>
                )}
              </Form.List>
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
}
