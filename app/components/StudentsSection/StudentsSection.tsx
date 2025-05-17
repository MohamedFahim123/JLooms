"use client";

import { getTokenFromServerCookies } from "@/app/auth/utils/storeTokenOnServer";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import { Table } from "@/app/dashboard/utils/interfaces";
import { useLoginnedUserStore } from "@/app/store/useCurrLoginnedUser";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashBoardFilterations from "../DashBoardFilterations/DashBoardFilterations";
import DashBoardPageHead from "../DashBoardPageHead/DashBoardPageHead";
import DashBoardTable from "../DashBoardTable/DashBoardTable";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";

let loading: boolean = true;
async function fetchTeachersData(
  filters: Record<string, string | number> = {}
): Promise<{ data: Table[]; totalPages: number }> {
  loading = true;
  const token = await getTokenFromServerCookies();

  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, String(value));
    }
  });

  const apiUrl = filters.name
    ? `${dataURLS.filterStudents}?${queryParams}&t=${new Date().getTime()}`
    : `${dataURLS.allStudents}?t=${new Date().getTime()}`;

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return { data: [], totalPages: 0 };
  }

  const data = await response.json();
  loading = false;
  return {
    data: data?.data?.students || [],
    totalPages: data?.meta?.totalPages || 1,
  };
}
export default function StudentsSection() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  const [students, setStudents] = useState<Table[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const { userLoginned, userLoginnedType } = useLoginnedUserStore();

  useEffect(() => {
    const newFilters: Record<string, string | number> = {
      status: searchParams.get("status") || "",
      name: searchParams.get("name") || "",
      page: searchParams.get("page") || 1,
    };
    setFilters(newFilters);
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      const { data, totalPages } = await fetchTeachersData(filters);
      setStudents(data);
      setTotalPages(totalPages);
    }
    fetchData();
  }, [filters]);

  const tableCells: string[] =
    userLoginnedType === "Admin"
      ? ["name", "class name", "parent", "action"]
      : userLoginned?.permissions?.includes("Delete Students")
      ? ["name", "class name", "parent", "action"]
      : ["name", "class name", "parent"];

  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <DashBoardPageHead
        text="Students"
        btnText="Add Student"
        haveBtn={
          userLoginnedType === "Admin"
            ? true
            : userLoginned?.permissions?.includes("Create Students")
            ? true
            : false
        }
        btnLink="/dashboard/students/add-new-student"
      />
      <DashBoardFilterations
        doesNotHaveFilterStatus={true}
        page="students"
        placeHolder="Find a Student"
      />
      <div className="overflow-x-auto">
        {loading ? (
          <Loader />
        ) : students.length > 0 ? (
          <>
            <DashBoardTable
              tableData={students}
              tableCells={tableCells}
              currPage={"students"}
            />
            <Pagination
              totalPages={totalPages}
              currentPage={Number(filters.page)}
            />
          </>
        ) : (
          <div className="flex justify-center min-h-screen">
            <p className="text-gray-500 font-semibold pt-10 text-xl">
              No Students!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
