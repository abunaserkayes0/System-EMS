// app.tsx
"use client";
import React, { useState } from "react";
import { Button, Table, Form, Input } from "antd";
import { useForm, Controller } from "react-hook-form";

type FormInput = {
  date: Date;
  name: string;
  section: string;
  year: string;
  group: string;
};
interface TableData {
  [key: string]: string | number;
}
const ResultTableGenerator: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);

  const increaseRows = () => setRows(rows + 1);
  const decreaseRows = () => setRows(Math.max(1, rows - 1));
  const increaseColumns = () => setColumns(columns + 1);
  const decreaseColumns = () => setColumns(Math.max(1, columns - 1));

  const generateColumns = () => {
    const columnArray = Array.from({ length: columns }, (_, index) => ({
      title: `Column ${index + 1}`,
      dataIndex: `col${index + 1}`,
      key: `col${index + 1}`,
    }));
    return columnArray;
  };

  const generateData = () => {
    const data = Array.from({ length: rows }, (_, rowIndex) => {
      const row: TableData = {};
      Array.from({ length: columns }, (_, colIndex) => {
        const dataIndex = `col${colIndex + 1}`;
        row[dataIndex] = (
          <Input
            key={`${rowIndex}-${colIndex}`}
            defaultValue={`Row ${rowIndex + 1}, Col ${colIndex + 1}`}
            onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
          />
        );
      });
      return row;
    });
    return data;
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    const newData = [...generateData()];
    newData[rowIndex][`col${colIndex + 1}`] = e.target.value;
    // Handle the updated data as needed
    console.log(newData);
  };
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
    <div>
      <h2 style={{ color: "#354856" }} className="mt-12 text-center text-4xl">
        General Result Sheet
      </h2>
      <div className="w-full h-[90vh] flex justify-center items-center">
        <Form
          className="xl:w-[35%] lg:w-[50%] md:w-[70%] sm:w-[90%] xs:w-[96%] shadow-md rounded p-8"
          // onFinish={handleSubmit(onSubmit)}
        >
          <Controller
            name="date"
            control={control}
            rules={{ required: "Please Enter a Valid Date" }}
            render={({ field }) => (
              <Form.Item
                label="Date"
                validateStatus={errors.date ? "error" : undefined}
                help={errors.date?.message}
              >
                <Input {...field} type="date" />
              </Form.Item>
            )}
          />
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name required" }}
            render={({ field }) => (
              <Form.Item
                label="Name"
                validateStatus={errors.name ? "error" : undefined}
                help={errors.name?.message}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
          <Controller
            name="group"
            control={control}
            rules={{ required: "Group is required" }}
            render={({ field }) => (
              <Form.Item
                label="Group"
                validateStatus={errors.group ? "error" : undefined}
                help={errors.group?.message}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />
          <Controller
            name="year"
            control={control}
            rules={{ required: "Year is required" }}
            render={({ field }) => (
              <Form.Item
                label="Year"
                validateStatus={errors.year ? "error" : undefined}
                help={errors.year?.message}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />

          <Controller
            name="section"
            control={control}
            rules={{ required: "Section required" }}
            render={({ field }) => (
              <Form.Item
                label="Section"
                validateStatus={errors.section ? "error" : undefined}
                help={errors.section?.message}
              >
                <Input {...field} />
              </Form.Item>
            )}
          />

          <Button
            className="px-8 text-gray-800 rounded bg-primary hover:bg-gray-800 hover:text-primary"
            // type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
      <div className="flex flex-col">
        <h3 style={{ color: "#354856" }} className="mt-12 px-4 text-xl">
          Term Result Evaluation Generator
        </h3>
        <Table
          dataSource={generateData()}
          columns={generateColumns()}
          pagination={false}
        />
        <div className="mt-4 mb-4 justify-center flex">
          <Button
            className="mr-2 bg-primary text-gray-800 "
            onClick={increaseRows}
          >
            Add Row
          </Button>
          <Button
            className="mr-2 bg-primary text-gray-800"
            onClick={decreaseRows}
          >
            Reduce Row
          </Button>
          <Button
            className="mr-2 bg-primary text-gray-800"
            onClick={increaseColumns}
          >
            Add Column
          </Button>
          <Button
            className="mr-2 bg-primary text-gray-800"
            onClick={decreaseColumns}
          >
            Reduce Column
          </Button>
        </div>
        <h3 style={{ color: "#354856" }} className="mt-12 px-4 text-xl">
          General Evaluation Generator
        </h3>
        <Table
          dataSource={generateData()}
          columns={generateColumns()}
          pagination={false}
        />
        <div className="mt-4 mb-4 justify-center flex">
          <Button
            className="mr-2 bg-primary text-gray-800 "
            onClick={increaseRows}
          >
            Add Row
          </Button>
          <Button
            className="mr-2 bg-primary text-gray-800"
            onClick={decreaseRows}
          >
            Reduce Row
          </Button>
          <Button
            className="mr-2 bg-primary text-gray-800"
            onClick={increaseColumns}
          >
            Add Column
          </Button>
          <Button
            className="mr-2 bg-primary text-gray-800"
            onClick={decreaseColumns}
          >
            Reduce Column
          </Button>
        </div>
      </div>
      <h3 style={{ color: "#354856" }} className="mt-12 px-4 text-xl">
        Grading System Generator
      </h3>
      <Table
        dataSource={generateData()}
        columns={generateColumns()}
        pagination={false}
      />
      <div className="mt-4 mb-4 justify-center flex">
        <Button
          className="mr-2 bg-primary text-gray-800 "
          onClick={increaseRows}
        >
          Add Row
        </Button>
        <Button
          className="mr-2 bg-primary text-gray-800"
          onClick={decreaseRows}
        >
          Reduce Row
        </Button>
        <Button
          className="mr-2 bg-primary text-gray-800"
          onClick={increaseColumns}
        >
          Add Column
        </Button>
        <Button
          className="mr-2 bg-primary text-gray-800"
          onClick={decreaseColumns}
        >
          Reduce Column
        </Button>
      </div>
    </div>
  );
};

export default ResultTableGenerator;
