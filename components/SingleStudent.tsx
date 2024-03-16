import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function SingleStudent({ singleData }: any) {
  const { admissionID, name } = singleData;
  const router = useRouter();

  const [isActive, setIsActive] = useState(() => {
    const storedValue = localStorage.getItem(`activeState_${admissionID}`);
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const handleClick = () => {
    router.push(`/admission_single/${admissionID}`);
    setIsActive(true);
  };

  useEffect(() => {
    localStorage.setItem(
      `activeState_${admissionID}`,
      JSON.stringify(isActive)
    );
  }, [admissionID, isActive]);
  localStorage.removeItem(`activeState_${admissionID}`);
  return (
    <div
      onClick={handleClick}
      className={`${
        isActive ? "text-blue-500 bg-blue-200" : "text-black bg-white"
      } my-0.5 p-3 rounded-md cursor-pointer`}
    >
      <h2 className="text-sm font-semibold">{name}</h2>
      <h3 className="text-sm">{admissionID}</h3>
    </div>
  );
}
