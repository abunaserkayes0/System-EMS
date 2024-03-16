import { FormInput } from "@/app/events/page";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function EventView({ eventID }: { eventID: string }) {
  const [data, setData] = useState<FormInput | null>(null);

  useEffect(() => {
    axios
      .get(`http://143.110.190.164:3001/teacher/event/find/${eventID}`)
      .then((res) => {
        const responseData = res.data.data;
        if (responseData) {
          setData(responseData);
        }
      })
      .catch((err) => console.log(err));
  }, [eventID]);

  if (!data) {
    return null;
  }

  const {
    eventTitle,
    eventDirectorTeacher,
    eventDirectorStudent,
    teacherContactNo,
    eventStartDate,
    eventEndDate,
    eventStartTime,
    description,
    visibility,
    createdBy,
    updatedBy,
  } = data;

  return (
    <>
      <div>
        <h1>Event View</h1>
        <div>
          <p>Event ID: {eventID}</p>
          <p>Event Title: {eventTitle}</p>
          <p>Event Director Teacher: {eventDirectorTeacher}</p>
          <p>Event Director Student: {eventDirectorStudent}</p>
          <p>Teacher Contact No: {teacherContactNo}</p>
          <p>Event Start Date: {eventStartDate}</p>
          <p>Event End Date: {eventEndDate}</p>
          <p>Event Start Time: {eventStartTime}</p>
          <p>Description: {description}</p>
          <p>Visibility: {visibility}</p>
          <p>Created By: {createdBy}</p>
          <p>Updated By: {updatedBy}</p>
        </div>
      </div>
    </>
  );
}
