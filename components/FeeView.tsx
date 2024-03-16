import axios from "axios";
import React, { useEffect, useState } from "react";

interface TableData {
  feeID: string;
  studentID: string;
  classID: string;
  date: string;
  amount: string;
  feeType: string;
  paymentDate: string;
  dueDate: string;
  paymentStatus: string;
}

type feeID = {
  feeID: string;
};

export default function FeeView({ feeID }: feeID) {
  const [data, setData] = useState<TableData | null>(null);

  useEffect(() => {
    axios
      .get(`http://143.110.190.164:3001/accounts/fee/find/${feeID}`)
      .then((res) => {
        const responseData = res.data.data;
        if (responseData) {
          setData(responseData);
        }
      })
      .catch((err) => console.log(err));
  }, [feeID]);

  if (!data) {
    return null;
  }

  const { date, amount, feeType, dueDate, paymentDate, paymentStatus } = data;

  return (
    <>
      <div>
        <h2>{date}</h2>
        <h2>{amount}</h2>
        <h2>{feeType}</h2>
        <h2>{dueDate}</h2>
        <h2>{paymentDate}</h2>
        <h2>{paymentStatus}</h2>
      </div>
    </>
  );
}
