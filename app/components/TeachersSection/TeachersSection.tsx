"use client";

import { Table } from "@/app/dashboard/utils/interfaces";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashBoardPageHead from "../DashBoardPageHead/DashBoardPageHead";
import DashBoardFilterations from "../DashBoardFilterations/DashBoardFilterations";
import DashBoardTable from "../DashBoardTable/DashBoardTable";
import Pagination from "../Pagination/Pagination";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import Cookies from "js-cookie";

let loading: boolean = true;
async function fetchTeachersData(
  filters: Record<string, string | number> = {}
): Promise<{ data: Table[]; totalPages: number }> {
  loading = true;
  const token = Cookies.get("CLIENT_JLOOMS_TOKEN");

  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, String(value));
    }
  });

  const apiUrl =
    filters?.status || filters.name
      ? `${dataURLS.filterTeachers}?${queryParams}&t=${new Date().getTime()}`
      : `${dataURLS.teachers}?t=${new Date().getTime()}`;

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
    data: data?.data?.teachers || [],
    totalPages: data?.meta?.totalPages || 1,
  };
}
export default function TeachersSection() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  const [teachers, setTeachers] = useState<Table[]>([]);
  const [totalPages, setTotalPages] = useState(1);

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
      setTeachers(data);
      setTotalPages(totalPages);
    }
    fetchData();
  }, [filters]);

  const tableCells: string[] = ["name", "phone", "email", "status", "action"];

  return (
    <div
      className={`${
        totalPages > 1 && "pb-6"
      } w-full bg-white shadow-md rounded-lg overflow-hidden`}
    >
      <DashBoardPageHead
        text="Teachers"
        btnText="Add Teacher"
        haveBtn={true}
        btnLink="/dashboard/teachers/add-new-teacher"
      />
      <DashBoardFilterations page="teachers" placeHolder="Find a teacher" />
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center min-h-screen">
            <p className="text-gray-500 font-semibold pt-10 text-xl">
              Loading...
            </p>
          </div>
        ) : teachers.length > 0 ? (
          <>
            <DashBoardTable
              tableData={teachers}
              tableCells={tableCells}
              currPage="teachers"
            />
            <Pagination
              totalPages={totalPages}
              currentPage={Number(filters.page)}
            />
          </>
        ) : (
          <div className="flex justify-center min-h-screen">
            <p className="text-gray-500 font-semibold pt-10 text-xl">
              No Teachers!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
