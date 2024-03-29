// pages/welcome.tsx
"use client";
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import SearchComponent from "@/components/search";
import { Tabs, Checkbox, Modal } from "antd";
import SettingsSvg from "../../../public/settings";
import NotificationSvg from "../../../public/notificationSvg";
import ProfileSvg from "../../../public/profileSvg";
import ScheduleSvg from "../../../public/scheduleSvg";
import PaymentSvg from "../../../public/paymentSvg";
import NoticeSvg from "../../../public/noticeSvg";
import ResultSvg from "../../../public/resultSvg";
import AttendanceSvg from "../../../public/attendanceSvg";
// Define the props interface
interface WelcomeProps {
  params: {
    name: string;
  };
}
const { TabPane } = Tabs;

const Dashboard: React.FC<WelcomeProps> = (props) => {
  const decodedName = decodeURIComponent(props.params.name);
  const [activeTab, setActiveTab] = useState("tab1");
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const getTitle = () => {
    {
      ` <div className="flex flex-row">
    switch (activeTab) {
      case "tab1":
        return (
          <div
            className="bg-white rounded-md px-4 py-4"
            style={{
              borderBottom: "3px solid #FFBF43",
              boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div className="flex flex-row justify-between">
              <svg
                className="mt-1 mr-2"
                width="24"
                height="20"
                viewBox="0 0 24 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6818 5.18853L4.00032 11.9683V19.2856C4.00032 19.4751 4.07055 19.6568 4.19556 19.7908C4.32058 19.9247 4.49013 20 4.66693 20L9.33574 19.9871C9.51196 19.9861 9.68066 19.9104 9.80495 19.7766C9.92925 19.6427 9.99902 19.4615 9.99902 19.2727V14.9994C9.99902 14.81 10.0693 14.6283 10.1943 14.4943C10.3193 14.3603 10.4888 14.2851 10.6656 14.2851H13.3321C13.5089 14.2851 13.6785 14.3603 13.8035 14.4943C13.9285 14.6283 13.9987 14.81 13.9987 14.9994V19.2696C13.9984 19.3636 14.0155 19.4567 14.0489 19.5436C14.0822 19.6306 14.1313 19.7096 14.1932 19.7761C14.2552 19.8427 14.3287 19.8955 14.4097 19.9316C14.4908 19.9676 14.5776 19.9862 14.6653 19.9862L19.3325 20C19.5093 20 19.6788 19.9247 19.8038 19.7908C19.9289 19.6568 19.9991 19.4751 19.9991 19.2856V11.9634L12.3193 5.18853C12.229 5.11054 12.1165 5.06801 12.0005 5.06801C11.8846 5.06801 11.7721 5.11054 11.6818 5.18853ZM23.8155 9.79663L20.3324 6.71995V0.535774C20.3324 0.393678 20.2797 0.257402 20.186 0.156925C20.0922 0.0564476 19.965 0 19.8324 0H17.4993C17.3667 0 17.2395 0.0564476 17.1458 0.156925C17.052 0.257402 16.9993 0.393678 16.9993 0.535774V3.77765L13.2692 0.488894C12.9112 0.173224 12.462 0.000631028 11.9985 0.000631028C11.5349 0.000631028 11.0857 0.173224 10.7277 0.488894L0.181444 9.79663C0.130818 9.84147 0.0889323 9.89656 0.0581813 9.95876C0.0274303 10.021 0.00841634 10.089 0.00222573 10.1591C-0.00396488 10.2292 0.00278923 10.2999 0.0221021 10.3671C0.0414151 10.4344 0.0729083 10.497 0.114782 10.5512L1.1772 11.9353C1.21896 11.9897 1.27033 12.0347 1.32835 12.0678C1.38638 12.101 1.44994 12.1215 1.51538 12.1282C1.58082 12.135 1.64686 12.1279 1.70973 12.1072C1.77259 12.0866 1.83104 12.0529 1.88173 12.008L11.6818 3.35796C11.7721 3.27998 11.8846 3.23745 12.0005 3.23745C12.1165 3.23745 12.229 3.27998 12.3193 3.35796L22.1198 12.008C22.1704 12.0529 22.2287 12.0867 22.2915 12.1074C22.3543 12.1281 22.4202 12.1353 22.4856 12.1287C22.551 12.122 22.6145 12.1016 22.6726 12.0687C22.7306 12.0357 22.782 11.9909 22.8239 11.9366L23.8863 10.5525C23.9281 10.498 23.9595 10.4351 23.9786 10.3675C23.9976 10.3 24.0041 10.229 23.9975 10.1588C23.9909 10.0886 23.9714 10.0204 23.9402 9.95824C23.909 9.89609 23.8666 9.84117 23.8155 9.79663Z"
                  fill="#263238"
                />
              </svg>
              <p className=" text-lg">Teacher's Dashboard</p>
            </div>
          </div>
        );
      case "tab2":
        return (
          <div
            className="bg-white rounded-md px-4 py-4"
            style={{
              borderBottom: "3px solid #FFBF43",
              boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div className="flex flex-row justify-between">
              <svg
                className="mt-1 mr-2"
                width="24"
                height="20"
                viewBox="0 0 24 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6818 5.18853L4.00032 11.9683V19.2856C4.00032 19.4751 4.07055 19.6568 4.19556 19.7908C4.32058 19.9247 4.49013 20 4.66693 20L9.33574 19.9871C9.51196 19.9861 9.68066 19.9104 9.80495 19.7766C9.92925 19.6427 9.99902 19.4615 9.99902 19.2727V14.9994C9.99902 14.81 10.0693 14.6283 10.1943 14.4943C10.3193 14.3603 10.4888 14.2851 10.6656 14.2851H13.3321C13.5089 14.2851 13.6785 14.3603 13.8035 14.4943C13.9285 14.6283 13.9987 14.81 13.9987 14.9994V19.2696C13.9984 19.3636 14.0155 19.4567 14.0489 19.5436C14.0822 19.6306 14.1313 19.7096 14.1932 19.7761C14.2552 19.8427 14.3287 19.8955 14.4097 19.9316C14.4908 19.9676 14.5776 19.9862 14.6653 19.9862L19.3325 20C19.5093 20 19.6788 19.9247 19.8038 19.7908C19.9289 19.6568 19.9991 19.4751 19.9991 19.2856V11.9634L12.3193 5.18853C12.229 5.11054 12.1165 5.06801 12.0005 5.06801C11.8846 5.06801 11.7721 5.11054 11.6818 5.18853ZM23.8155 9.79663L20.3324 6.71995V0.535774C20.3324 0.393678 20.2797 0.257402 20.186 0.156925C20.0922 0.0564476 19.965 0 19.8324 0H17.4993C17.3667 0 17.2395 0.0564476 17.1458 0.156925C17.052 0.257402 16.9993 0.393678 16.9993 0.535774V3.77765L13.2692 0.488894C12.9112 0.173224 12.462 0.000631028 11.9985 0.000631028C11.5349 0.000631028 11.0857 0.173224 10.7277 0.488894L0.181444 9.79663C0.130818 9.84147 0.0889323 9.89656 0.0581813 9.95876C0.0274303 10.021 0.00841634 10.089 0.00222573 10.1591C-0.00396488 10.2292 0.00278923 10.2999 0.0221021 10.3671C0.0414151 10.4344 0.0729083 10.497 0.114782 10.5512L1.1772 11.9353C1.21896 11.9897 1.27033 12.0347 1.32835 12.0678C1.38638 12.101 1.44994 12.1215 1.51538 12.1282C1.58082 12.135 1.64686 12.1279 1.70973 12.1072C1.77259 12.0866 1.83104 12.0529 1.88173 12.008L11.6818 3.35796C11.7721 3.27998 11.8846 3.23745 12.0005 3.23745C12.1165 3.23745 12.229 3.27998 12.3193 3.35796L22.1198 12.008C22.1704 12.0529 22.2287 12.0867 22.2915 12.1074C22.3543 12.1281 22.4202 12.1353 22.4856 12.1287C22.551 12.122 22.6145 12.1016 22.6726 12.0687C22.7306 12.0357 22.782 11.9909 22.8239 11.9366L23.8863 10.5525C23.9281 10.498 23.9595 10.4351 23.9786 10.3675C23.9976 10.3 24.0041 10.229 23.9975 10.1588C23.9909 10.0886 23.9714 10.0204 23.9402 9.95824C23.909 9.89609 23.8666 9.84117 23.8155 9.79663Z"
                  fill="#263238"
                />
              </svg>
              <p className=" text-lg">Student's Dashboard</p>
            </div>
          </div>
        );

      default:
        return "Teacher's Dashboard";
    }}
    </div>`;
    }
  };

  const items = [
    {
      key: "0",
      label: "Teacher's Dashboard",

      children: (
        <div className="grid lg:grid-cols-5 justify-items-center gap-6 mt-12 mb-32">
          <div
            className="px-4 py-4 rounded-md"
            style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.20)" }}
          >
            <div className="border-2 rounded-full h-20 w-20 px-4 py-4 flex flex-row justify-center">
              <div className="flex flex-col items-center">
                <ProfileSvg />
                <p className="mt-1 text-xs font-bold">Profile</p>
              </div>
            </div>
          </div>
          <div
            className="px-4 py-4 rounded-md"
            style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.20)" }}
          >
            <div className="border-2 rounded-full h-20 w-20 px-4 py-4 flex flex-row justify-items-center">
              <div className="flex flex-col items-center">
                <ScheduleSvg />

                <p className="mt-1 text-xs font-bold">Schedule</p>
              </div>
            </div>
          </div>
          <div
            className="px-4 py-4 rounded-md"
            style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.20)" }}
          >
            <div className="border-2 rounded-full h-20 w-20 px-4 py-4 flex flex-row justify-center">
              <div className="flex flex-col items-center">
                <PaymentSvg />
                <p className="mt-1 text-xs font-bold">Payment</p>
              </div>
            </div>
          </div>
          <div
            className="px-4 py-4 rounded-md"
            style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.20)" }}
          >
            <div className="border-2 rounded-full h-20 w-20 px-4 py-4 flex flex-row justify-center">
              <div className="flex flex-col items-center">
                <NoticeSvg />

                <p className="mt-1 text-xs font-bold">Noticeboard</p>
              </div>
            </div>
          </div>
          <div
            className="px-4 py-4 rounded-md"
            style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.20)" }}
          >
            <div className="border-2 rounded-full h-20 w-20 px-4 py-4 flex flex-row justify-center">
              <div className="flex flex-col items-center">
                <ResultSvg />

                <p className="mt-1 text-xs font-bold">Result</p>
              </div>
            </div>
          </div>
          <div
            className="px-4 py-4 rounded-md"
            style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.20)" }}
          >
            <div className="border-2 rounded-full h-20 w-20 px-4 py-4 flex flex-row justify-center">
              <div className="flex flex-col items-center">
                <AttendanceSvg />

                <p className="mt-1 text-xs font-bold">Attendance</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "1",
      label: "Student's Dashboard",
      children: (
        <div className="grid lg:grid-cols-5 justify-items-center gap-6 mt-12 mb-32">
          <div
            className="px-4 py-4 rounded-md"
            style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.20)" }}
          >
            <div className="border-2 rounded-full h-20 w-20 px-4 py-4 flex flex-row justify-center">
              <div className="flex flex-col items-center">
                <ProfileSvg />
                <p className="mt-1 text-xs font-bold">Profile</p>
              </div>
            </div>
          </div>
          <div
            className="px-4 py-4 rounded-md"
            style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.20)" }}
          >
            <div className="border-2 rounded-full h-20 w-20 px-4 py-4 flex flex-row justify-items-center">
              <div className="flex flex-col items-center">
                <ScheduleSvg />

                <p className="mt-1 text-xs font-bold">Schedule</p>
              </div>
            </div>
          </div>
          <div
            className="px-4 py-4 rounded-md"
            style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.20)" }}
          >
            <div className="border-2 rounded-full h-20 w-20 px-4 py-4 flex flex-row justify-center">
              <div className="flex flex-col items-center">
                <PaymentSvg />
                <p className="mt-1 text-xs font-bold">Payment</p>
              </div>
            </div>
          </div>
          <div
            className="px-4 py-4 rounded-md"
            style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.20)" }}
          >
            <div className="border-2 rounded-full h-20 w-20 px-4 py-4 flex flex-row justify-center">
              <div className="flex flex-col items-center">
                <NoticeSvg />

                <p className="mt-1 text-xs font-bold">Noticeboard</p>
              </div>
            </div>
          </div>
          <div
            className="px-4 py-4 rounded-md"
            style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.20)" }}
          >
            <div className="border-2 rounded-full h-20 w-20 px-4 py-4 flex flex-row justify-center">
              <div className="flex flex-col items-center">
                <ResultSvg />

                <p className="mt-1 text-xs font-bold">Result</p>
              </div>
            </div>
          </div>
          <div
            className="px-4 py-4 rounded-md"
            style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.20)" }}
          >
            <div className="border-2 rounded-full h-20 w-20 px-4 py-4 flex flex-row justify-center">
              <div className="flex flex-col items-center">
                <AttendanceSvg />

                <p className="mt-1 text-xs font-bold">Attendance</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];
  console.log("🚀 ~ file: page.tsx:12 ~ props:", props);
  return (
    <section className="bg-[#ecf0f1]">
      <div className="flex flex-col container px-6 py-6">
        <div className="flex flex-row justify-between ">
          <SearchComponent />
          <div className="flex flex-row">
            <div className="w-50 mr-6 rounded-full bg-white inline-block px-2 py-2 h-50">
              <SettingsSvg />
            </div>
            <div className="w-50 mr-4 rounded-full bg-white inline-block px-2 py-2 h-50">
              <NotificationSvg />
            </div>
            <div className="flex flex-row mt-1">
              <svg
                className="mt-1 mr-1"
                width="1"
                height="22"
                viewBox="0 0 1 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.5"
                  y1="-2.18557e-08"
                  x2="0.500001"
                  y2="22"
                  stroke="#C2C2C2"
                />
              </svg>
              <p className="mr-2">{decodedName}</p>
              <div className="w-50 mr-4 rounded-full bg-green-600 inline-block px-4 py-4 h-50"></div>
            </div>
          </div>
        </div>
        <div className="bg-white  mt-8 px-4 py-2">
          <h1 className="text-lg" style={{ color: "#263238" }}>
            Dashboard
          </h1>
        </div>
        <div className="bg-white px-4 py-2 mt-4">
          <div className="">
            <Tabs defaultActiveKey="1" items={items}></Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
