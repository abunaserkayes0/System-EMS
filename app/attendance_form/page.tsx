"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, Select } from "antd";
import SearchComponent from "@/components/search";
import { CloseSquareOutlined } from "@ant-design/icons";
import HeaderDiv from "@/components/header";
import Link from "next/link";

const { Option } = Select;

type FormInput = {
  date: string;
  id: string;
};
interface NameProps {
  params: {
    name: string;
  };
}

const AttendanceForm: React.FC<NameProps> = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();

  const onSubmit = async (data: FormInput) => {
    // try {
    //   startLoading();
    //   const date = new Date(data.date);
    //   // Prepare the data to send to the createInventory function
    //   const expenseObj = {
    //     amount: data.amount,
    //     status: data.status,
    //     type: data.type,
    //     date,
    //     description: data.description,
    //   };
    //   // Call the createInventory function to send the data to the server
    //   const createdExpense = await createExpense(expenseObj);
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   reset();
    //   stopLoading();
    // } catch (error) {
    //   console.error("Error creating expense:", error);
    //   stopLoading();
    // }
  };

  return (
    <section className="bg-[#ecf0f1]">
      <div className="flex flex-col container px-6 py-6">
        <HeaderDiv />
        <div className="bg-white flex flex-row justify-between  mt-8 px-4 py-2">
          <h1 className="text-lg" style={{ color: "#263238" }}>
            Attendance Form
          </h1>
          <Link href="/attendance_view">
            <button>
              <CloseSquareOutlined />
            </button>
          </Link>
        </div>

        <div className="w-full mb-12 flex justify-around items-center bg-white mt-6 py-24">
          <Form className="w-96 mt-12">
            <div className="flex flex-row space-x-12">
              <Controller
                name="id"
                control={control}
                rules={{ required: "ID is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.id ? "error" : undefined}
                    help={errors.id?.message}
                  >
                    <Input
                      className="ml-6"
                      {...field}
                      placeholder="Admission ID"
                    />
                  </Form.Item>
                )}
              />
              <Controller
                name="date"
                control={control}
                rules={{ required: "Please Enter a Valid Date" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.date ? "error" : undefined}
                    help={errors.date?.message}
                  >
                    <Input {...field} type="date" placeholder="Date" />
                  </Form.Item>
                )}
              />
            </div>
            <div className="flex flex-row justify-center">
              <Button
                className="px-8 mr-6 text-white font-bold rounded bg-[#2c5ff7] hover:bg-[#ecf0f1] hover:text-black"
                // type="primary"
                htmlType="submit"
              >
                Save
              </Button>
              <Button
                className="px-8 hover:text-white font-bold rounded hover:bg-[#2c5ff7] bg-[#ecf0f1] text-black"
                // type="primary"
                htmlType="submit"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default AttendanceForm;
