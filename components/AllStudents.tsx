import React from "react";
import useFetch from "@/hooks/useFetch";
import SingleStudent from "./SingleStudent";
import Spinner from "./Spinner";
// import Spinner from "@/Components/Spinner/Spinner";

export default function AllStudents() {
  const { data, loading } = useFetch(
    "http://143.110.190.164:3001/admin/student/admission/find/all"
  );
  return (
    <>
      <div>
        {loading ? (
           <Spinner />
        ) : (
          data.map((singleData, index) => (
            <SingleStudent key={index} singleData={singleData} />
          ))
        )}
      </div>
    </>
  );
}
