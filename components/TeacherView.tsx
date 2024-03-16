import axios from "axios";
import React, { useEffect, useState } from "react";

interface TableData {
  name: string;
  email: string;
  mobileNumber: string;
  joiningDate: string;
  religion: string;
  nationality: string;
  gender: string;
  adminExperienceYear: string;
  NID: string;
  picture: string;
  address: string;
  adminDesignation: string;
  educationInfo: {
    instituteName: string;
    completeYear: string;
    resultPoint: string;
  };
  username: string;
  password: string;
}

export default function TeacherView({ teacherID }: { teacherID: string }) {
  const [data, setData] = useState<TableData | null>(null);

  useEffect(() => {
    axios
      .get(
        `http://143.110.190.164:3001/admin/teacher/profile/find/${teacherID}`
      )
      .then((res) => {
        const responseData = res.data.data;
        if (responseData) {
          setData(responseData);
        }
      })
      .catch((err) => console.log(err));
  }, [teacherID]);

  if (!data) {
    return null;
  }

  const {
    name,
    email,
    mobileNumber,
    joiningDate,
    religion,
    nationality,
    gender,
    adminExperienceYear,
    NID,
    picture,
    address,
    adminDesignation,
    educationInfo: { instituteName, completeYear, resultPoint } = {},
    username,
    password,
  } = data;

  return (
    <>
      <div>
        <h2>{name}</h2>
        <h2>{email}</h2>
        <h2>{adminDesignation}</h2>
        <h2>{mobileNumber}</h2>
        <h2>{joiningDate}</h2>
        <h2>{religion}</h2>
        <h2>{nationality}</h2>
        <h2>{gender}</h2>
        <h2>{adminExperienceYear}</h2>
        <h2>{NID}</h2>
        <h2>{picture}</h2>
        <h2>{address}</h2>
        <h2>{instituteName}</h2>
        <h2>{completeYear}</h2>
        <h2>{resultPoint}</h2>
        <h2>{username}</h2>
        <h2>{password}</h2>
      </div>
    </>
  );
}
