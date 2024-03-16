import axios from "axios";
import React, { useEffect, useState } from "react";

interface FormInput {
  payrollID: string;
  paidTo: string;
  date: string;
  amount: string;
  status: string;
  details: string;
}

export default function PayrollId({ payrollID }: { payrollID: string }) {
  const [data, setData] = useState<FormInput | null>(null);

  useEffect(() => {
    axios
      .get(`http://143.110.190.164:3001/accounts/payment/find/${payrollID}`)
      .then((res) => {
        const responseData = res.data.data;
        if (responseData) {
          setData(responseData);
        }
      })
      .catch((err) => console.log(err));
  }, [payrollID]);

  if (!data) {
    return null;
  }

  const { paidTo, date, amount, status, details } = data;

  return (
    <>
      <div>
        <h2>{paidTo}</h2>
        <h2>{date}</h2>
        <h2>{amount}</h2>
        <h2>{status}</h2>
        <h2>{details}</h2>
      </div>
    </>
  );
}
