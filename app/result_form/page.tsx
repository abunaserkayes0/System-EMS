"use client";
import React, { useEffect, useState } from "react";
import { Button, Table, Form, Input, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { Tabs } from "antd";
import { CloseSquareOutlined } from "@ant-design/icons";
import HeaderDiv from "@/components/header";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";

export type FormInput = {
  courseName: string;
  classID: string;
  studentID: string;
  examType: string;
  year: string;
  marks: string;
};

const ResultForm: React.FC = () => {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [extension, setExtension] = useState([]);

  const { data } = useFetch(
    `http://143.110.190.164:3001/admin/classroom/find/all`
  );
  const handleClassIdChange = (selectedClassId: string) => {
    const classStudents = data
      .find((item: any) => item.classID === selectedClassId)
      ?.courses?.map((course: any) => ({
        value: course.courseName,
        label: course.courseName,
      }));
    setFilteredStudents(classStudents);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm<FormInput>();

  const handelSearch = () => {
    const { classID } = getValues();
    axios
      .get(`http://143.110.190.164:3001/admin/classroom/find/${classID}`)
      .then((res) => {
        const value = res.data.data.studentIDs;
        setExtension(value);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = async (data: FormInput) => {
    const resultsData = extension.map((item: any, index) => ({
      studentID: item,
      marks: data.marks[index + 1],
    }));

    const newData = {
      classID: data.classID,
      courseName: data.courseName,
      examName: data.examType,
      year: data.year,
      results: resultsData,
    };
    console.log(newData);
    axios
      .post(`http://143.110.190.164:3001/admin/result/create`, newData)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            title: "Success",
            text: "Result Added Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            title: "Error",
            text: "Result Already Added",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      });
    reset();
  };

  return (
    <section className="bg-[#ecf0f1]">
      <div className="flex flex-col container px-6 py-6">
        <HeaderDiv />

        <div className="bg-white flex flex-row justify-between  mt-8 px-4 py-2">
          <h1 className="text-lg" style={{ color: "#263238" }}>
            Result Form
          </h1>
          <Link href="/result_view">
            <button>
              <CloseSquareOutlined />
            </button>
          </Link>
        </div>
        <Form onFinish={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-5 gap-x-3 py-5">
            <Controller
              name="classID"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  showSearch
                  placeholder="Select a classID"
                  optionFilterProp="children"
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
                  }}
                />
              )}
            />
            <Controller
              name="courseName"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  showSearch
                  placeholder="Select a Course Name"
                  optionFilterProp="children"
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  /* filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                } */
                  options={filteredStudents}
                />
              )}
            />
            <Controller
              name="examType"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Exam Type"
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              )}
            />
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Year"
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              )}
            />
            <div className="flex">
              <Button onClick={handelSearch} htmlType="button">
                Search
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {extension.map((item: any, index: any) => (
              <div key={index} className="flex flex-col gap-5">
                <h1 className="text-lg" style={{ color: "#263238" }}>
                  {item}
                </h1>
                <Controller
                  // name="marks"
                  name={`marks[${index + 1}]`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Your Marks"
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </div>
            ))}
          </div>
          <div className="flex mt-5">
            <Button className="w-20" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default ResultForm;
