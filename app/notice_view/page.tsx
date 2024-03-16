// app.tsx
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import HeaderDiv from "@/components/header";
import useFetch from "@/hooks/useFetch";
import SingleNoticeView from "@/components/SingleNoticeView";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { Button } from "antd";
export type singleData = {
  _id: string;
  noticeID: string;
  title: string;
  date: string;
  description: string;
  noticeFor: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  createdAt: string;
};

const NoticeVew: React.FC<NameProps> = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<singleData>();

  const { data,loading,refetch} = useFetch(
    "http://143.110.190.164:3001/teacher/notice/find/all"
  );

  if (!data) return  <Spinner />;
  

  return (
    <section className="bg-[#ecf0f1]">
      <div className="flex flex-col container px-6 py-6">
        <HeaderDiv />
        <div className="bg-white flex flex-row justify-between  mt-8 px-4 py-2">
          <h1 className="text-lg" style={{ color: "#263238" }}>
            All Notice
          </h1>
          <Link href="/notice_form">
            <Button className="flex items-center" type="default">
              Add Notice
              <PlusOutlined />
            </Button>
          </Link>
        </div>
        {data.map((singleData) => (
          <>
            <section className="bg-white my-5">
              <SingleNoticeView key={singleData.id} singleData={singleData} data={data} refetch={refetch}/>
            </section>
          </>
        ))}
      </div>
    </section>
  );
};

export default NoticeVew;
