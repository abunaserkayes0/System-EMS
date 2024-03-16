"use client";
import AllStudents from "@/components/AllStudents";
import SingleInfo from "@/components/SingleStudentInfo";
import HeaderDiv from "@/components/header";
import React from "react";

export default function page() {
  return (
    <>
    <section className="bg-[#ecf0f1] flex flex-col container px-6 py-6">
      <HeaderDiv />
    </section>
      <section className="grid grid-cols-4 gap-x-10 relative">
        <article>
          <AllStudents />
        </article>
        <article className="col-span-3 bg-white p-3 rounded">
          <SingleInfo />
        </article>
      </section>
    </>
  );
}
