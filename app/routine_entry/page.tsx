"use client";
import React, { useState } from "react";
import { Button, Table, Form, Input, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { CloseSquareOutlined } from "@ant-design/icons";
import HeaderDiv from "@/components/header";
import useFetch from "@/hooks/useFetch";

type FormInput = {
  classID: string;
  name: string;
  section: string;
  year: string;
  group: string;
};
interface TableData {
  [key: string]: string | number;
}
const TabsPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();
  const [rows, setRows] = useState(4);
  const [columns, setColumns] = useState(3);
  const increaseRows = () => setRows(rows + 1);
  const decreaseRows = () => setRows(Math.max(1, rows - 1));
  const increaseColumns = () => setColumns(columns + 1);
  const decreaseColumns = () => setColumns(Math.max(1, columns - 1));

  const [filteredStudents, setFilteredStudents] = useState([]);

  const [startTimes, setStartTimes] = useState<string[]>([]);
  const [endTimes, setEndTimes] = useState<string[]>([]);

  const data = useFetch(`http://143.110.190.164:3001/admin/classroom/find/all`);
  const generateColumns = () => {
    const handleStartTimeChange = (index: number, value: string) => {
      const newStartTimes = [...startTimes];
      newStartTimes[index] = value;
      setStartTimes(newStartTimes);
    };

    const handleEndTimeChange = (index: number, value: string) => {
      const newEndTimes = [...endTimes];
      newEndTimes[index] = value;
      setEndTimes(newEndTimes);
    };

    const dayTimeColumn = {
      title: "Day & Time",
      dataIndex: "dayTime",
      key: "dayTime",
    };

    const otherColumns = Array.from({ length: columns }, (_, index) => {
      const startTime = startTimes[index] || "00:00";
      const endTime = endTimes[index] || "00:00";

      return {
        title: (
          <div>
            <div>Start Time</div>
            <Input
              defaultValue={startTime}
              style={{ marginBottom: 5 }}
              onChange={(e) => handleStartTimeChange(index, e.target.value)}
            />
            <div>End Time</div>
            <Input
              defaultValue={endTime}
              style={{ marginBottom: 5 }}
              onChange={(e) => handleEndTimeChange(index, e.target.value)}
            />
          </div>
        ),
        dataIndex: `col${index + 1}`,
        key: `col${index + 1}`,
        startTime: startTime,
        endTime: endTime,
      };
    });

    return [dayTimeColumn, ...otherColumns];
  };

  const generateData = () => {
    const daysOfWeek = [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
    ];

    const columnsData = generateColumns(); // Call generateColumns once to get column data

    const data = daysOfWeek.map((day, rowIndex) => {
      const row: TableData = {};

      // First column for Day and Time
      row["dayTime"] = day;

      columnsData.forEach((column, colIndex) => {
        const dataIndex = `col${colIndex + 1}`;
        row[dataIndex] = (
          <Select
            key={`${rowIndex}-${colIndex}`}
            style={{ width: "100%" }}
            onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
            options={filteredStudents?.map((course: any) => ({
              value: course?.courseName,
              label: course?.courseName,
            }))}
          />
        );
      });
      return row;
    });

    return data;
  };

  const [inputData, setInputData] = useState(generateData());

  const handleClassIdChange = (selectedClassId: string) => {
    const classStudents = data.data
      .find((item: any) => item.classID === selectedClassId)
      ?.courses?.map((course: any) => course);
    setFilteredStudents(classStudents);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number
  ) => {

    const newData = inputData.map((row, rIndex) => {
      if (rIndex === rowIndex) {
        row[`col${colIndex + 1}`] = e?.target?.value;
      }
      return row;
    });
    setInputData(newData);
  };

  /* const onSubmit = async (data: FormInput) => {
    // Prepare the schedule data to be sent
    const scheduleData = inputData.map((row) => {
      const day = row["dayTime"];
      const entries = Object.keys(row)
        .filter((key) => key !== "dayTime")
        .map((key) => {
          const columnIndex = parseInt(key.replace("col", ""), 10) + 1;
          const startTime = generateColumns()[columnIndex - 1]?.startTime || "";
          const endTime = generateColumns()[columnIndex - 1]?.endTime || "";
          const courseName = filteredStudents.find(
            (course: any) => course.courseName
          );
          return {
            courseName: courseName?.courseName,
            startTime,
            endTime,
          };
        });

      return { day, entries };
    });

    console.log(scheduleData[0].entries);

    // Prepare the payload to be sent
    const payload = {
      classID: data.classID,
      schedule: scheduleData,
    };

    // console.log(payload.schedule);
  }; */

  const onSubmit = async (data: FormInput) => {
    // Prepare the schedule data to be sent
    const scheduleData = inputData.map((row) => {
      const day = row["dayTime"];
      const entries = Object.keys(row)
        .filter((key) => key !== "dayTime")
        .map((key) => {
          const columnIndex = parseInt(key.replace("col", ""), 10) + 1;
          const startTime = generateColumns()[columnIndex - 1]?.startTime || "";
          const endTime = generateColumns()[columnIndex - 1]?.endTime || "";
          const courseName = filteredStudents.find(
            (course: any) => course.courseName
          );

          // Construct entry object
          return {
            courseCode: courseName?.courseCode || "",
            courseName: courseName?.courseName || "",
            teacher: courseName?.teacher || "",
            startTime,
            endTime,
            _id: Math.random().toString(36).substr(2, 9), // Generate unique ID
          };
        });

      return { day, entries };
    });

    console.log(scheduleData[0].entries);

    // Prepare the payload to be sent
    const payload = {
      classID: data.classID,
      schedule: scheduleData,
    };

    console.log(payload);
  };

  return (
    <section className="bg-[#ecf0f1]">
      <div className="flex flex-col container px-6 py-6">
        <HeaderDiv />
        <Form className=" p-8" onFinish={handleSubmit(onSubmit)}>
          <div className="bg-white flex flex-row justify-between  mt-8 px-4 py-2">
            <h1 className="text-lg" style={{ color: "#263238" }}>
              Schedule Form
            </h1>
            <button>
              <CloseSquareOutlined />
            </button>
          </div>
          <div>
            <div>
              <div className="w-full flex justify-center items-center">
                <div className="grid grid-cols-3 gap-6">
                  <Controller
                    name="classID"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        showSearch
                        placeholder="Select a classID"
                        optionFilterProp="children"
                        options={
                          data
                            ? data.data.map((item: any) => ({
                                value: item.classID,
                                label: item.classID,
                              }))
                            : []
                        }
                        onChange={(selectedClassId) => {
                          handleClassIdChange(selectedClassId);
                          field.onChange(selectedClassId);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <Table
                  dataSource={generateData()}
                  columns={generateColumns()}
                  pagination={false}
                />
                <div className="mt-4 mb-4 justify-center flex">
                  <Button
                    className="mr-2 bg-primary font-semibold text-gray-800 "
                    onClick={increaseRows}
                  >
                    Add Row
                  </Button>
                  <Button
                    className="mr-2 bg-primary font-semibold text-gray-800"
                    onClick={decreaseRows}
                  >
                    Reduce Row
                  </Button>
                  <Button
                    className="mr-2 bg-primary font-semibold text-gray-800"
                    onClick={increaseColumns}
                  >
                    Add Column
                  </Button>
                  <Button
                    className="mr-2 bg-primary font-semibold text-gray-800"
                    onClick={decreaseColumns}
                  >
                    Reduce Column
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-row ">
              <Button
                className="px-8 mr-6 text-white font-bold rounded bg-[#2c5ff7] hover:bg-[#ecf0f1] hover:text-black"
                htmlType="submit"
              >
                Save
              </Button>
              <Button
                className="px-8 hover:text-white font-bold rounded hover:bg-[#2c2d31] bg-[#ecf0f1] text-black"
                htmlType="submit"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default TabsPage;
