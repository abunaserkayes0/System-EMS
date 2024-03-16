"use client";
import React, { useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  MenuOutlined,
  CloseCircleOutlined,
  FolderOpenOutlined,
  UserOutlined,
  FileTextOutlined,
  ProfileOutlined,
  CalculatorOutlined,
  LineChartOutlined,
  CheckOutlined,
  FieldTimeOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import type { MenuProps } from "antd";
import Image from "next/image";
const { SubMenu } = Menu;
type propsType = {
  isOwner?: boolean;
  menuMode: any;
  setMenuMode: any;
};
const items: MenuProps["items"] = [
  {
    label: (
      <Link href="/mail" target="_blank" rel="noopener noreferrer">
        Mail
      </Link>
    ),
    key: "mail",
    icon: <MailOutlined />,
  },
  {
    label: (
      <Link href="/dashboard/${email}" rel="noopener noreferrer">
        Dashboard
      </Link>
    ),
    key: "app",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Profile",
    key: "profileMenu",
    icon: <UserOutlined />,
    children: [
      {
        label: (
          <Link href="/admin_list" rel="noopener noreferrer">
            Admin List
          </Link>
        ),

        key: "adminList",
      },
      {
        label: (
          <Link href="/student_list" rel="noopener noreferrer">
            Student's List
          </Link>
        ),

        key: "profile",
      },
      {
        label: (
          <Link href="teacher_list" rel="noopener noreferrer">
            Teacher's List
          </Link>
        ),
        key: "teacherList",
      },
    ],
  },
  {
    label: (
      <Link href="/employee_list" rel="noopener noreferrer">
        Employee
      </Link>
    ),
    key: "employeeMenu",
    icon: <UserOutlined />,
  },
  {
    label: (
      <Link href="/admission_view" rel="noopener noreferrer">
        Admission
      </Link>
    ),
    key: "admissionMenu",
    icon: <FileTextOutlined />,
  },

  {
    label: "Noticeboard",
    key: "NoticeMenu",
    icon: <ProfileOutlined />,
    children: [
      {
        label: (
          <Link href="/notice_view" rel="noopener noreferrer">
            Notice
          </Link>
        ),
        key: "noticeView",
      },
      {
        label: (
          <Link href="/noticeMessage_view" rel="noopener noreferrer">
            NoticeMessage
          </Link>
        ),
        key: "noticeMessage",
      },

      {
        label: (
          <Link href="/task_view" rel="noopener noreferrer">
            Task
          </Link>
        ),
        key: "taskView",
      },
    ],
  },
  {
    label: "Account",
    key: "accountMenu",
    icon: <CalculatorOutlined />,
    children: [
      {
        label: (
          <Link href="/feeCollection_view" rel="noopener noreferrer">
            Fee Collection
          </Link>
        ),
        key: "feeView",
      },

      {
        label: (
          <Link href="/expense_view" rel="noopener noreferrer">
            Expense
          </Link>
        ),
        key: "expenseView",
      },
    ],
  },
  {
    label: (
      <Link href="/result_view" rel="noopener noreferrer">
        Result
      </Link>
    ),
    key: "resultMenu",
    icon: <LineChartOutlined />,
  },
  {
    label: (
      <Link href="/attendance_view" rel="noopener noreferrer">
        Attendance
      </Link>
    ),
    key: "attendanceMenu",
    icon: <CheckOutlined />,
  },

  {
    label: (
      <Link href="/classroom_view" rel="noopener noreferrer">
        Classroom
      </Link>
    ),
    key: "ClassroomView",
    icon: <LineChartOutlined />,
  },
  {
    label: (
      <Link href="routine_entry" rel="noopener noreferrer">
        Class Routine
      </Link>
    ),
    key: "scheduleMenu",
    icon: <FieldTimeOutlined />,
  },

  {
    label: (
      <Link href="/paymentData_view" rel="noopener noreferrer">
        Payment
      </Link>
    ),
    key: "paymentMenu",
    icon: <MoneyCollectOutlined />,
  },

  {
    label: (
      <Link href="/events_view" rel="noopener noreferrer">
        Events
      </Link>
    ),
    key: "eventMenu",
    icon: <FolderOpenOutlined />,
  },
];
const Navbar = ({ isOwner, menuMode, setMenuMode }: propsType) => {
  const [current, setCurrent] = useState("mail");
  const toggleMenuMode = () => {
    setMenuMode((prevMode: any) =>
      prevMode === "inline" ? "horizontal" : "inline"
    );
  };

  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    console.log(collapsed);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <div>
      <div
        className={
          collapsed === true
            ? "xl:hidden lg:hidden md:hidden sm:block sm:absolute xs:absolute z-20"
            : "xl:hidden lg:hidden md:hidden sm:block sm:absolute xs:absolute z-20 right-0"
        }
      >
        <div
          className="px-3 py-2.5 rounded m-2 border-2"
          onClick={toggleCollapsed}
        >
          {collapsed ? (
            <MenuOutlined style={{ fontSize: "25px", height: "0px" }} />
          ) : (
            <CloseCircleOutlined style={{ fontSize: "25px", height: "0px" }} />
          )}
        </div>
      </div>

      <div
        className={`w-[239px] h-screen overflow-hidden fixed top-0 left-0 z-50 ${
          collapsed === true
            ? "md:block xl:block lg:block sm:hidden xs:hidden"
            : ""
        }`}
      >
        <div className="w-full bg-white">
          <Image width={1000} height={1000} src="/logo.png" alt="a" />
        </div>
        <div
          className={
            menuMode === "inline"
              ? "w-[220px]  bg-[#001529] xl:relative lg:relative md:relative sm:absolute xs:absolute sm:left-0 sm:z-10 xs:left-0 xs:z-10"
              : "w-full"
          }
        >
          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            items={items}
            mode={menuMode}
            className="w-60 overflow-y-scroll h-screen no-scrollbar pb-28 pt-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
