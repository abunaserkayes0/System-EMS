import React, { useEffect, useState } from "react";
import { expenseProps } from "./UpdateExpense";
import axios from "axios";

interface TableData {
  expenseID: string;
  itemName: string;
  itemQuantity: number;
  itemCategory: string;
  purchaseDate: string;
  amount: number;
  description: string;
  createdBy: string;
}

export default function ViewExpense({ expenseID }: expenseProps) {
  const [data, setData] = useState<TableData | null>(null);

  useEffect(() => {
    axios
      .get(`http://143.110.190.164:3001/accounts/expense/find/${expenseID}`)
      .then((res) => {
        const responseData = res.data.data;
        if (responseData) {
          setData(responseData);
        }
      })
      .catch((err) => console.log(err));
  }, [expenseID]);

  if (!data) {
    return null;
  }

  const {
    itemName,
    itemQuantity,
    itemCategory,
    purchaseDate,
    amount,
    description,
    createdBy,
  } = data;

  return (
    <>
      <div>
        <h2>{itemName}</h2>
        <p>{itemQuantity}</p>
        <p>{itemCategory}</p>
        <p>{purchaseDate}</p>
        <p>{amount}</p>
        <p>{description}</p>
        <p>{createdBy}</p>
      </div>
    </>
  );
}
