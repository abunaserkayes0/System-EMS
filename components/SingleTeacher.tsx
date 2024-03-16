import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function SingleTeacher({ singleData }: any) {
  const { teacherID, name } = singleData;
  const router = useRouter();

  const [isActive, setIsActive] = useState(() => {
    const storedValue = localStorage.getItem(`activeState_${teacherID}`);
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const handleClick = () => {
    router.push(`/teacher_list/${teacherID}`);
    setIsActive(true);
  };

  useEffect(() => {
    localStorage.setItem(`activeState_${teacherID}`, JSON.stringify(isActive));
  }, [teacherID, isActive]);
  localStorage.removeItem(`activeState_${teacherID}`);
  return (
    <div
      onClick={handleClick}
      className={`${
        isActive ? "text-blue-500 bg-blue-200" : "text-black bg-white"
      } my-0.5 p-3 rounded-md cursor-pointer`}
    >
      <h2 className="text-sm font-semibold">{name}</h2>
      <h3 className="text-sm">{teacherID}</h3>
    </div>
  );
}
