import axios from "axios";
import React, { useEffect, useState } from "react";

interface TableData {
  taskTitle: string;
  taskDescription: string;
  taskDueDate: string;
  classID: string;
  courseName: string;
}

export default function ViewTask({ taskID }: { taskID: string }) {
  const [data, setData] = useState<TableData | null>(null);

  useEffect(() => {
    axios
      .get(`http://143.110.190.164:3001/teacher/task/find/${taskID}`)
      .then((res) => {
        const responseData = res.data.data;
        if (responseData) {
          setData(responseData);
        }
      })
      .catch((err) => console.log(err));
  }, [taskID]);

  if (!data) {
    return null;
  }

  const { taskTitle, taskDescription, taskDueDate, classID, courseName } = data;

  return (
    <>
      <div>
        <h2>{taskTitle}</h2>
        <h2>{taskDescription}</h2>
        <h2>{taskDueDate}</h2>
        <h2>{classID}</h2>
        <h2>{courseName}</h2>
      </div>
    </>
  );
}
