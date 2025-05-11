import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import Loader from "@/app/components/Loader/Loader";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FaEnvelope, FaGraduationCap, FaPhoneAlt } from "react-icons/fa";
import Avatar from "../../../imgs/teachers/teacher1.png";
import { dataURLS } from "../../utils/dataUrls";

interface ParamsProps {
  id: string;
}

interface TeacherDetailsProps {
  params: Promise<ParamsProps>;
}

export const metadata: Metadata = {
  title: `Teacher Details`,
};

export default async function TeacherDetailsPage({
  params,
}: TeacherDetailsProps) {
  const { id } = await params;
  const cookiesData = await cookies();
  const token = cookiesData.get("CLIENT_JLOOMS_TOKEN")?.value;

  const fetchTeacher = await fetch(`${dataURLS.singleTeacher}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await fetchTeacher?.json();
  const teacher = response?.data?.teacher;

  const filterOptions = [
    {
      label: "Deactive",
      value: "Deactive",
      disabled: false,
      defaultValue: teacher?.status === "Deactive",
    },
    {
      label: "Active",
      value: "Active",
      disabled: false,
      defaultValue: teacher?.status === "Active",
    },
  ];

  return (
    <Suspense fallback={<Loader />}>
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
        <DashBoardPageHead
          teacherId={id}
          haveFilter={true}
          filterOptions={filterOptions}
          text={teacher?.name || ""}
          haveBtn={false}
        />
        <div className="px-6 pt-4 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4 flex flex-col items-center space-y-6">
            <div className="w-44 h-44 rounded-full overflow-hidden border">
              <Image
                src={teacher?.image || Avatar}
                alt={teacher?.name || "Teacher Profile Avatar"}
                width={175}
                height={175}
                className="object-cover"
              />
            </div>
            <div className="flex space-x-4">
              {/* <div className="flex items-center flex-col w-16 h-16 gap-2">
                            <h5 className="font-bold">Age</h5>
                            <p>{teacher?.age}</p>
                        </div> */}
              <div className="flex items-center flex-col w-16 h-16 gap-2">
                <h5 className="font-bold">Gender</h5>
                <p>{teacher?.gender}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center justify-center w-10 h-10 cursor-pointer bg-[#EBECFA] rounded-lg">
                <Link href={`tel:${teacher?.phone}`}>
                  <FaPhoneAlt size={20} className="text-[#8A8A8A]" />
                </Link>
              </div>
              <div className="flex items-center justify-center w-10 cursor-pointer h-10 bg-[#EBECFA] rounded-lg">
                <Link href={`mailto:${teacher?.email}`}>
                  <FaEnvelope size={20} className="text-[#8A8A8A]" />
                </Link>
              </div>
            </div>
          </div>
          {teacher?.class && (
            <div className="lg:col-span-8 mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                <span className="flex items-center justify-center w-14 h-14 bg-[#EBECFA] rounded-lg">
                  <FaGraduationCap size={32} className="text-[#8A8A8A]" />
                </span>
              </h3>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}
