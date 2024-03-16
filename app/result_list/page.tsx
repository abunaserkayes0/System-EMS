// components/TabsPage.tsx
"use client";
import React, { useState } from "react";
import { Table, Form, Checkbox, Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import { Tabs } from "antd";
import {
  CloseSquareOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import HeaderDiv from "@/components/header";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

const { TabPane } = Tabs;

type FormInput = {
  subject: string;
  fTerm: string;
  sTerm: string;
  final: string;
  id: string;
};

interface TableData {
  [key: string]: string | number;
}

const demoData: FormInput[] = [
  {
    subject: "Science",
    id: "1",
    fTerm: "4",
    sTerm: "4",
    final: "4",
  },
  {
    subject: "Arts",
    id: "2",
    fTerm: "2",
    sTerm: "4",
    final: "4",
  },
  // Add more data as needed
];

const FormItem = ({
  name,
  control,
  rules,
  label,
  placeholder,
}: {
  name: string;
  control: any;
  rules: any;
  label: string;
  placeholder: string;
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field }) => (
      <Form.Item
        label={label}
        validateStatus={field ? "error" : undefined}
        help={field ? field?.message : undefined}
      >
        <Input {...field} placeholder={placeholder} />
      </Form.Item>
    )}
  />
);

const TabsPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();
  const [activeTab, setActiveTab] = useState("tab1");
  const [dataSource, setDataSource] = useState<FormInput[]>([]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const getTitle = () => {
    switch (activeTab) {
      case "tab1":
        return "Term result generator";
      case "tab2":
        return "General evaluation generator";
      case "tab3":
        return "Grading system generator";
      default:
        return "Attendance Form";
    }
  };

  const columns = [
    {
      key: "1",
      title: "Select",
      dataIndex: "date",
      render: (_text: any, record: FormInput) => (
        <Checkbox onChange={(e) => onChange(e, record)} />
      ),
    },
    { key: "2", title: "Subject", dataIndex: "subject" },
    { key: "3", title: "First Term", dataIndex: "fTerm" },
    { key: "4", title: "Second Term", dataIndex: "sTerm" },
    { key: "5", title: "Final", dataIndex: "final" },
    {
      key: "6",
      title: "Actions",
      render: (record: FormInput) => (
        <>
          <EditOutlined onClick={() => onEditExpense(record)} />
          <DeleteOutlined
            onClick={() => onDeleteExpense(record)}
            style={{ color: "red", marginLeft: 12 }}
          />
        </>
      ),
    },
  ];

  const onChange = (e: CheckboxChangeEvent, record: FormInput) => {
    console.log(`checked = ${e.target.checked} for student ID: ${record.id}`);
    // You can do something with the checked value and record data here
  };

  const onEditExpense = (record: FormInput) => {
    // Logic to edit the selected expense
  };

  const onDeleteExpense = (record: FormInput) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this expense?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => pre.filter((form) => form !== record));
      },
    });
  };
  const tabItems = [
    { key: "tab1", tab: "Term result generator" },
    { key: "tab2", tab: "General evaluation generator" },
    { key: "tab3", tab: "Grading system generator" },
  ];

  return (
    <section className="bg-[#ecf0f1]">
      <div className="flex flex-col container px-6 py-6">
        <HeaderDiv />

        <div className="bg-white flex flex-row justify-between  mt-8 px-4 py-2">
          <h1 className="text-lg" style={{ color: "#263238" }}>
            {getTitle()}
          </h1>
          <button className="bg-[#2c5ff7] rounded-md px-4 py-1">
            <PlusOutlined className="text-white font-semibold text-sm" />
            <span className="text-white font-semibold text-sm ml-1">New</span>
          </button>
        </div>
        <div>
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            {tabItems.map((item) => (
              <TabPane key={item.key} tab={item.tab}>
                <div className="w-full mt-12 mb-12 ">
                  <Table
                    columns={columns}
                    dataSource={demoData}
                    pagination={false}
                  />
                </div>
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default TabsPage;
