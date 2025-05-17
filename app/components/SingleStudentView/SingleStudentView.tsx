"use client";

import { getTokenFromServerCookies } from "@/app/auth/utils/storeTokenOnServer";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import { useClassesStore } from "@/app/store/getAllClasses";
import { useLoginnedUserStore } from "@/app/store/useCurrLoginnedUser";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEnvelope, FaGraduationCap } from "react-icons/fa";
import { toast } from "react-toastify";
import Avatar from "../../imgs/teachers/teacher1.png";

interface SingleStudent {
  id: number | string;
  image: string;
  name: string;
  email: string;
  phone: string;
  class_name: string;
  birth_date: string;
  gender: string;
  blood_type: string;
  class_id: string;
  parent: [];
}

export default function SingleStudentView({
  student,
}: {
  student: SingleStudent;
}) {
  const [currClassId, setCurrClassId] = useState<string | number>();
  const { userLoginned, userLoginnedType } = useLoginnedUserStore();
  const [status, setStatus] = useState<string>(
    student?.class_name === "N/A" ? "update" : "assigned"
  );
  const { classes } = useClassesStore();

  const handleAssignToClass = async () => {
    if (currClassId) {
      const data = {
        class_id: `${currClassId}`,
        student_id: `${student?.id}`,
      };
      const loadingToastId = toast.loading("Loading...");
      const token = await getTokenFromServerCookies();
      try {
        const response = await axios.post(dataURLS.assignStudentToClass, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.update(loadingToastId, {
          render: response?.data?.message || "Request succeeded!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
        setStatus("assigned");
        window.location.reload();
      } catch (error) {
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.message || "Something went wrong!"
          : "An unexpected error occurred.";
        toast.update(loadingToastId, {
          render: errorMessage,
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <div className="px-6 pt-4 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-4 flex flex-col items-center space-y-6">
        <div className="w-44 h-44 rounded-full overflow-hidden border">
          <Image
            src={student?.image || Avatar}
            alt={student?.name || "student Profile Avatar"}
            width={175}
            height={175}
            className="object-cover"
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center flex-col w-16 h-16 gap-2">
            <h5 className="font-bold">Blood</h5>
            <p>{student?.blood_type}</p>
          </div>
          <div className="flex items-center flex-col w-16 h-16 gap-2">
            <h5 className="font-bold">Gender</h5>
            <p>{student?.gender}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center justify-center w-10 cursor-pointer h-10 bg-[#EBECFA] rounded-lg">
            <Link href={`mailto:${student?.email}`}>
              <FaEnvelope size={20} className="text-[#8A8A8A]" />
            </Link>
          </div>
        </div>
        {userLoginnedType === "Admin" ? (
          <div className="flex space-x-4">
            <Link
              className="text-indigo-500 underline hover:text-indigo-600 transition-all duration-300"
              onClick={() => {
                Cookies.set("student_id", `${student?.id}`);
              }}
              href={`/dashboard/students/${student?.id}/assign-parent`}
            >
              Assign Parents
            </Link>
          </div>
        ) : (
          userLoginned?.permissions?.includes("Un Assign Parents") && (
            <div className="flex space-x-4">
              <Link
                className="text-indigo-500 underline hover:text-indigo-600 transition-all duration-300"
                onClick={() => {
                  Cookies.set("student_id", `${student?.id}`);
                }}
                href={`/dashboard/students/${student?.id}/assign-parent`}
              >
                Assign Parents
              </Link>
            </div>
          )
        )}
      </div>
      <div className="lg:col-span-8 mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
          <span className="flex items-center justify-center w-14 h-14 bg-[#EBECFA] rounded-lg">
            <FaGraduationCap size={32} className="text-[#8A8A8A]" />
          </span>
          {student?.name}
        </h3>
        <h4 className="text-lg font-semibold text-gray-800 mb-3">
          Student Details:
        </h4>
        <ul className="space-y-4 text-gray-700">
          {
            <>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">Class Name:</span>
                {status === "update" ? (
                  userLoginnedType === "Admin" ? (
                    <select
                      defaultValue={
                        student?.class_name !== "N/A"
                          ? classes?.find(
                              (el) => el?.name === student?.class_name
                            )?.id
                          : ""
                      }
                      onChange={(e) => setCurrClassId(e.target.value)}
                      className={`w-4/12 px-4 py-2 border rounded-md focus:outline-none`}
                    >
                      <option value="" disabled>
                        Assign a Class
                      </option>
                      {classes?.map((el) => (
                        <option key={el?.id} value={el?.id}>
                          {el?.name}
                        </option>
                      ))}
                    </select>
                  ) : userLoginned?.permissions?.includes("Assign Students") ? (
                    <select
                      defaultValue={
                        student?.class_name !== "N/A"
                          ? classes?.find(
                              (el) => el?.name === student?.class_name
                            )?.id
                          : ""
                      }
                      onChange={(e) => setCurrClassId(e.target.value)}
                      className={`w-4/12 px-4 py-2 border rounded-md focus:outline-none`}
                    >
                      <option value="" disabled>
                        Assign a Class
                      </option>
                      {classes?.map((el) => (
                        <option key={el?.id} value={el?.id}>
                          {el?.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span>{student?.class_name}</span>
                  )
                ) : (
                  <span>{student?.class_name}</span>
                )}
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">Class ID:</span>
                <span>{student?.class_id}</span>
              </li>
            </>
          }
          {student?.birth_date && (
            <li className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">Birth Date:</span>
              <span>{new Date(student?.birth_date)?.toLocaleDateString()}</span>
            </li>
          )}
        </ul>
        {status === "update" ? (
          userLoginnedType === "Admin" ? (
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={handleAssignToClass}
                className="px-6 py-2 border rounded-md text-white bg-[#10B981]"
              >
                Assign to Class
              </button>
            </div>
          ) : (
            userLoginned?.permissions?.includes("Assign Students") && (
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={handleAssignToClass}
                  className="px-6 py-2 border rounded-md text-white bg-[#10B981]"
                >
                  Assign to Class
                </button>
              </div>
            )
          )
        ) : userLoginnedType === "Admin" ? (
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setStatus("update")}
              className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 text-white font-medium py-2 px-4 rounded"
            >
              Update Class
            </button>
          </div>
        ) : (
          userLoginned?.permissions?.includes("Assign Students") && (
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => setStatus("update")}
                className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 text-white font-medium py-2 px-4 rounded"
              >
                Update Class
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
