import { Spin } from "antd";
import React from "react";

export default function Spinner() {
  return (
    <div className="h-screen flex items-center justify-center ">
      <Spin size="large" />
    </div>
  );
}
