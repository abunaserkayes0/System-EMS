import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function SingleEvent({ singleData }: any) {
  const { eventID, name } = singleData;
  const router = useRouter();

  const [isActive, setIsActive] = useState(() => {
    const storedValue = localStorage.getItem(`activeState_${eventID}`);
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const handleClick = () => {
    router.push(`/events_view/${eventID}`);
    setIsActive(true);
  };

  useEffect(() => {
    localStorage.setItem(`activeState_${eventID}`, JSON.stringify(isActive));
  }, [eventID, isActive]);
  localStorage.removeItem(`activeState_${eventID}`);

  return (
    <div
      onClick={handleClick}
      className={`${
        isActive ? "text-blue-500 bg-blue-200" : "text-black bg-white"
      } my-0.5 p-3 rounded-md cursor-pointer`}
    >
      <h2 className="text-sm font-semibold">{name}</h2>
      <h3 className="text-sm">{eventID}</h3>
    </div>
  );
}
