"use client";
import React, { useState } from "react";
import { Form, Select, Button, Input, Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import HeaderDiv from "@/components/header";
import { FormInput } from "../result_form/page";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import UpdateResult from "@/components/UpdateResult";
import Link from "next/link";

interface ResultViewProps {
  resultID: string;
}

const ResultView: React.FC = () => {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [resultId, setResultId] = useState("" as string);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [extension, setExtension] = useState([]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data, loading, refetch } = useFetch(
    `http://143.110.190.164:3001/admin/result/find/all`
  );
  // console.log(data);
  const handleClassIdChange = (selectedClassId: any) => {
    /*  const classStudents = data
      .find(
        (item: any) => item.classID + " " + item.courseName === selectedClassId
      )
      ?.results?.map((student: any) => ({
        value: student.studentID,
        label: student.studentID,
      })); */

    const classStudents = data.find(
      (item: any) => item.classID + " " + item.courseName === selectedClassId
    );

    setFilteredStudents(classStudents ? [classStudents.year] : []);
  };

  const { control, handleSubmit, getValues, reset } = useForm<FormInput>();

  const handelSearch = () => {
    const id = data.find(
      (item: any) =>
        item.classID + " " + item.courseName === getValues("classID")
    );
    const { resultID } = id;
    setResultId(resultID);
    axios
      .get(`http://143.110.190.164:3001/admin/result/find/${resultID}`)
      .then((res) => {
        const value = res.data.data.results;
        setExtension(value);
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelDelete = (resultId: string) => {
    axios
      .delete(`http://143.110.190.164:3001/admin/result/delete/${resultId}`)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Result Deleted Successfully",
            confirmButtonText: "Ok",
          });
          refetch();
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            confirmButtonText: "Ok",
          });
        }
      });
  };
  const handelUpdate = (resultId: string) => {
    setIsModalOpen(true);
  };
  return (
    <section className="bg-[#ecf0f1]">
      <div className="flex flex-col container px-6 py-6">
        <HeaderDiv />
        <div className="bg-white flex flex-row justify-between items-center  mt-8 px-4 py-2">
          <h1 className="text-lg" style={{ color: "#263238" }}>
            All Results View
          </h1>
          <Link href="/result_form">
            <Button className="flex items-center" type="default">
              Add Result
              <PlusOutlined />
            </Button>
          </Link>
        </div>
        <Form /*  onFinish={handleSubmit(onSubmit)} */>
          <div className="grid grid-cols-5 gap-x-3 py-5">
            <Controller
              name="classID"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  showSearch
                  placeholder="Select a classID"
                  onChange={(value) => {
                    field.onChange(value);
                    handleClassIdChange(value);
                  }}
                  options={data.map((item: any, index: any) => ({
                    value: item.classID + " " + item.courseName,
                    label: item.classID + " " + item.courseName,
                    key: index,
                  }))}
                />
              )}
            />

            {/* <Controller
              name="studentID"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  showSearch
                  placeholder="Select a Student ID"
                  optionFilterProp="children"
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  options={filteredStudents}
                />
              )}
            /> */}
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  showSearch
                  placeholder="Select a Year"
                  optionFilterProp="children"
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  // options={filteredStudents}

                  options={filteredStudents?.map((year: string) => ({
                    value: year,
                    label: year,
                  }))}
                  /* options={data.map((item: any, index: any) => ({
                    value: item.year,
                    label: item.year,
                    key: index,
                  }))} */
                />
              )}
            />
            <div className="flex">
              <Button onClick={handelSearch} htmlType="button">
                Search
              </Button>
            </div>
          </div>
          {extension.length > 0 ? (
            <div>
              <EditOutlined
                onClick={() => handelUpdate(resultId)}
                className="text-2xl"
              />
              <DeleteOutlined
                onClick={() => handelDelete(resultId)}
                className="text-2xl"
              />
            </div>
          ) : null}
          <div className="grid grid-cols-4 gap-5">
            {extension.map((item: any, index: any) => (
              <div key={index} className="flex flex-col gap-5">
                <h1 className="text-lg" style={{ color: "#263238" }}>
                  {item.studentID}
                </h1>
                <h2 style={{ color: "#263238" }}>Marks: {item.marks}</h2>
              </div>
            ))}
          </div>
        </Form>
        <Modal
          title="Edit Student"
          open={isModalOpen}
          onCancel={handleCancel}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
          width={1000}
        >
          {resultId && <UpdateResult resultId={resultId} setIsModalOpen={setIsModalOpen} refetch={refetch}/>}
        </Modal>
      </div>
    </section>
  );
};

export default ResultView;
