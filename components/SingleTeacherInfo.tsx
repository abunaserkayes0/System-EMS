import axios from "axios";
import { Avatar, Modal } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { MdDelete, MdEdit, MdUpdate } from "react-icons/md";
import useFetch from "@/hooks/useFetch";
import UpdateTeacher from "./UpdateTeacher";
import Spinner from "./Spinner";

type FromProps = {
  educationInfo: {
    instituteName: string;
    completeYear: string;
    resultPoint: string;
  };
  teacherID: string;
  name: string;
  email: string;
  mobileNumber: string;
  joiningDate: string;
  religion: string;
  nationality: string;
  gender: string;
  employeeExperienceYear: string;
  NID: string;
  picture: string;
  experienceSubject: string;
  address: string;
  designation: string;
  salaryAmount: string;
};

export default function SingleTeacherInfo() {
  const { teacherId } = useParams();
  const [data, setData] = useState<FromProps>({} as FromProps);
  const [loading, setLoading] = useState(true);
  ``;
  const { data: result, setData: setResult } = useFetch(
    "http://143.110.190.164:3001/admin/teacher/profile/find/all"
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
        `http://143.110.190.164:3001/admin/teacher/profile/find/${teacherId}`
      )
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [teacherId]);

  const handelDelete = (teacherId: string) => {
    axios
      .delete(
        `http://143.110.190.164:3001/admin/teacher/profile/delete/${teacherId}`
      )
      .then((response) => {
        if (response.data.success == "Delete successful.") {
          const rest = result.filter(
            (item: any) => item.teacherId !== teacherId
          );
          setResult(rest);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const {
    educationInfo: { completeYear, instituteName, resultPoint } = {},
    teacherID,
    name,
    email,
    mobileNumber,
    joiningDate,
    religion,
    nationality,
    gender,
    employeeExperienceYear,
    NID,
    picture,
    experienceSubject,
    address,
    designation,
    salaryAmount,
  } = data;

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
                    <h3>{teacherID}</h3>
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
                      <UpdateTeacher teacherId={teacherID} />
                    </Modal>
                  </div>
                  <div>
                    <MdDelete
                      onClick={() => handelDelete(teacherID)}
                      size={20}
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="grid grid-cols-2 text-slate-600">
              <div className="">
                <h2>Teacher Name:</h2>
                <h2>Institute Name:</h2>
                <h2>Complete Year</h2>
                <h2>ResultPoint</h2>
                <h2>Email:</h2>
                <h2>Mobile Number</h2>
                <h2>Joining Date:</h2>
                <h2>Employee Experience Year</h2>
                <h2>NID Number</h2>
                <h2>Experience Subject</h2>
                <h2>Address:</h2>
                <h2>Nationality:</h2>
                <h2>Designation</h2>
                <h2>Religion:</h2>
                <h2>Salary Amount:</h2>
              </div>
              <div>
                <p>{name}</p>
                <p>{instituteName}</p>
                <p>{completeYear}</p>
                <p>{resultPoint}</p>
                <p>{email}</p>
                <p>{mobileNumber}</p>
                <p>{joiningDate}</p>
                <p>{employeeExperienceYear}</p>
                <p>{NID}</p>
                <p>{experienceSubject}</p>
                <p>{address}</p>
                <p>{nationality}</p>
                <p>{designation}</p>
                <p>{religion}</p>
                <p>{salaryAmount}</p>
              </div>
            </section>
          </>
        )
      )}
    </>
  );
}
