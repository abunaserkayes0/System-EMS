import { FormInput } from "@/app/notice_message/page";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function MessageView({ messageID }: { messageID: string }) {
  const [data, setData] = useState<FormInput | null>(null);

  useEffect(() => {
    axios
      .get(`http://143.110.190.164:3001/teacher/message/find/${messageID}`)
      .then((res) => {
        const responseData = res.data.data;
        if (responseData) {
          setData(responseData);
        }
      })
      .catch((err) => console.log(err));
  }, [messageID]);

  if (!data) {
    return null;
  }

  const { title, sendTo, message, date } = data;
  const recipientArray = sendTo?.split(",");

  return (
    <>
      <div>
        <h2>{title}</h2>
        <h2>{message}</h2>
        {recipientArray?.map((recipient) => (
          <h2 key={recipient}>{recipient}</h2>
        ))}
        <h2>{date}</h2>
      </div>
    </>
  );
}
