import { Button, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function UpdateResult({
  resultId,
  setIsModalOpen,
  refetch,
}: {
  resultId: string;
  setIsModalOpen: (value: boolean) => void;
  refetch: () => void;
}) {
  const [courseName, setCourseName] = useState("");
  const [classID, setClassID] = useState("");
  const [examName, setExamName] = useState("");
  const [year, setYear] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(`http://143.110.190.164:3001/admin/result/find/${resultId}`)
      .then((res) => {
        const data = res.data.data;
        setCourseName(data.courseName);
        setClassID(data.classID);
        setExamName(data.examName);
        setYear(data.year);
        setResults(data.results);
      })
      .catch((err) => console.log(err));
  }, [resultId]);

  const updateResult = () => {
    const updatedData = {
      courseName: courseName,
      classID: classID,
      examName: examName,
      year: year,
      results: results.map((result) => ({
        studentID: result.studentID,
        marks: result.marks,
      })),
    };

    axios
      .put(
        `http://143.110.190.164:3001/admin/result/update/${resultId}`,
        updatedData
      )
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Updated",
            text: "Result has been updated",
          });
          refetch();
          setIsModalOpen(false);
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to update result",
          });
        }
      });
  };

  const handleResultChange = (index: number, field: string, value: string) => {
    const updatedResults = [...results];
    updatedResults[index][field] = value;
    setResults(updatedResults);
  };

  return (
    <div>
      <h2>Update Result</h2>
      <div>
        <Input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <Input
          type="text"
          value={classID}
          onChange={(e) => setClassID(e.target.value)}
        />
        <Input
          type="text"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
        />
        <Input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        {results.map((result, index) => (
          <div key={index}>
            <Input
              type="text"
              value={result.studentID}
              onChange={(e) =>
                handleResultChange(index, "studentID", e.target.value)
              }
            />
            <Input
              type="text"
              value={result.marks}
              onChange={(e) =>
                handleResultChange(index, "marks", e.target.value)
              }
            />
          </div>
        ))}
        <Button onClick={updateResult}>Update</Button>
      </div>
    </div>
  );
}
