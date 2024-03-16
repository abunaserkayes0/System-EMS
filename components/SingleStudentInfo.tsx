import axios from "axios";
import { Avatar, Modal } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { MdDelete, MdEdit, MdUpdate } from "react-icons/md";
import useFetch from "@/hooks/useFetch";
import UpdateAdmissionStudent from "./UpdateAdmissionStudent";
import { FormInput } from "@/app/admission_form/page";
import Spinner from "./Spinner";

export default function SingleStudentInfo() {
  const { admissionId } = useParams();
  const [result, setResult] = useState<FormInput>({} as FormInput);
  const [loading, setLoading] = useState(true);
  ``;
  const { data, setData } = useFetch(
    "http://143.110.190.164:3001/admin/student/admission/find/all"
  );
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const showUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };
  const handleUpdateCancel = () => {
    setIsUpdateModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(
        `http://143.110.190.164:3001/admin/student/admission/find/${admissionId}`
      )
      .then((response) => {
        setResult(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [admissionId, setResult]);

  const handelDelete = (studentId: string) => {
    axios
      .delete(
        `http://143.110.190.164:3001/admin/student/admission/delete/${studentId}`
      )
      .then((response) => {
        if (response.data.success == "Delete successful.") {
          const rest = data.filter(
            (item: any) => item.admissionId !== studentId
          );
          setResult(rest);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const {
    address,
    birthRegistrationNumber,
    bloodGroup,
    dateOfBirth,
    fatherNID,
    fatherName,
    gender,
    grade,
    motherNID,
    motherName,
    name,
    nationality,
    parentsMobileNumber,
    picture,
    qualifications,
    religion,
    section,
    admissionID,
    studentMobileNumber,
    testimonial,
    zipCode,
  } = result;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        data && (
          <>
            <section className="m">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-5">
                  <div>
                    <Avatar shape="square" size={64} icon={<UserOutlined />} />
                  </div>
                  <div className="flex-col">
                    <h2 className="font-bold text-xl">{name}</h2>
                    <h3>{admissionId}</h3>
                    <h4>{gender}</h4>
                  </div>
                </div>
                <div className="flex">
                  <div className="">
                    <MdEdit onClick={showUpdateModal} size={20} />
                    <Modal
                      open={isUpdateModalOpen}
                      okButtonProps={{ hidden: true }}
                      cancelButtonProps={{ hidden: true }}
                      onCancel={handleUpdateCancel}
                      width={1000}
                    >
                      <UpdateAdmissionStudent addmissionID={admissionID} />
                    </Modal>
                  </div>
                  <div>
                    <MdDelete
                      onClick={() => handelDelete(admissionID)}
                      size={20}
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="grid grid-cols-2 text-slate-600">
              <div className="">
                <h2>Name</h2>
                <h2>Birth Registration Number</h2>
                <h2>Blood Group</h2>
                <h2>Date of Birth</h2>
                <h2>Father NID</h2>
                <h2>Father Name</h2>
                <h2>Gender</h2>
                <h2>Grade</h2>
                <h2>Mother NID</h2>
                <h2>Mother Name</h2>
                <h2>Address</h2>
                <h2>Nationality</h2>
                <h2>Parents Mobile Number</h2>
                <h2>Picture</h2>
                <h2>Qualifications</h2>
                <h2>Religion</h2>
                <h2>Section</h2>
                <h2>Admission ID</h2>
                <h2>Student Mobile Number</h2>
                <h2>Testimonial</h2>
                <h2>Zip Code</h2>
              </div>
              <div>
                <p>{name}</p>
                <p>{birthRegistrationNumber}</p>
                <p>{bloodGroup}</p>
                <p>{dateOfBirth}</p>
                <p>{fatherNID}</p>
                <p>{fatherName}</p>
                <p>{gender}</p>
                <p>{grade}</p>
                <p>{motherNID}</p>
                <p>{motherName}</p>
                <p>{address}</p>
                <p>{nationality}</p>
                <p>{parentsMobileNumber}</p>
                <p>{picture}</p>
                <p>{qualifications}</p>
                <p>{religion}</p>
                <p>{section}</p>
                <p>{admissionId}</p>
                <p>{studentMobileNumber}</p>
                <p>{testimonial}</p>
                <p>{zipCode}</p>
              </div>
            </section>
          </>
        )
      )}
    </>
  );
}
