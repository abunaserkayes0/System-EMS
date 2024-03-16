// app.tsx
"use client";
import { Table, Checkbox, Modal, Button } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import HeaderDiv from "@/components/header";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import useFetch from "@/hooks/useFetch";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormInput } from "../employee_form/page";
import axios from "axios";
import UpdateEmployee from "@/components/UpdateEmployee";
import Link from "next/link";
import Swal from "sweetalert2";

type FormData = {
  employeeID: string;
  name: string;
  employeeDesignation: string;
  experienceSubject: string;
  educationInfo: {
    instituteName: string;
  };
};

const AdmissionView: React.FC = () => {
  const [dataSource, setDataSource] = useState<FormInput[]>([]);
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data, loading,refetch} = useFetch(
    "http://143.110.190.164:3001/admin/employee/profile/find/all"
  );
  const onDeleteExpense = (employeeID: string) => {
    axios
      .delete(
        `http://143.110.190.164:3001/admin/employee/profile/delete/${employeeID}`
      )
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Admin Deleted Successfully",
          });
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  const onEditExpense = (employeeID: string) => {
    setEmployeeId(employeeID);
    showModal();
  };

  const columns = [
    { key: "2", title: "Employee ID", dataIndex: "employeeID" },
    { key: "name", title: "Employee Name", dataIndex: "name" },
    {
      key: "3",
      title: "Designation",
      dataIndex: "employeeDesignation",
    },
    {
      key: "4",
      title: "Experience Subject",
      dataIndex: "experienceSubject",
    },
    {
      key: "5",
      title: "Edu.Background",
      dataIndex: ["educationInfo", "instituteName"],
    },
    {
      key: "5",
      title: "Actions",
      render: (record: FormInput) => {
        return (
          <>
            <EditOutlined onClick={() => onEditExpense(record.employeeID)} />
            <DeleteOutlined
              onClick={() => onDeleteExpense(record.employeeID)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  return (
    <section className="bg-[#ecf0f1]">
      <div className="flex flex-col container px-6 py-6">
        <HeaderDiv />
        <div className="bg-white flex flex-row justify-between items-center  mt-8 px-4 py-2">
          <h1 className="text-lg" style={{ color: "#263238" }}>
            Employee List
          </h1>
          <Link href="/employee_form">
            <Button type="default" icon={<PlusOutlined />}>
              Add Employee
            </Button>
          </Link>
        </div>
        <div className="w-full mt-12 mb-12 ">
          <Table
            className="cursor-pointer"
            columns={columns}
            rowKey={(record) => record.employeeID}
            dataSource={data}
            pagination={false}
          />
          <Modal
            title="Edit Student"
            visible={isModalOpen}
            onCancel={handleCancel}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
            width={1000}
          >
            {employeeId && <UpdateEmployee employeeId={employeeId} setIsModalOpen={setIsModalOpen} refetch={refetch}/>}
          </Modal>
        </div>
      </div>
    </section>
  );
};

export default AdmissionView;
