"use client";

import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import { Table } from "@/app/dashboard/utils/interfaces";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashBoardPageHead from "../DashBoardPageHead/DashBoardPageHead";
import DashBoardFilterations from "../DashBoardFilterations/DashBoardFilterations";
import DashBoardTable from "../DashBoardTable/DashBoardTable";
import Pagination from "../Pagination/Pagination";

let loading: boolean = true;

async function fetchClassesData(
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

  const apiUrl = filters.name
    ? `${dataURLS.filterClasses}?${queryParams}&t=${new Date().getTime()}`
    : `${dataURLS.getAllClasses}?t=${new Date().getTime()}`;

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
    data: data?.data?.classes || [],
    totalPages: data?.meta?.totalPages || 1,
  };
}
export default function ClassesSection() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  const [classes, setClasses] = useState<Table[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const newFilters: Record<string, string | number> = {
      name: searchParams.get("name") || "",
      page: searchParams.get("page") || 1,
    };
    setFilters(newFilters);
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      const { data, totalPages } = await fetchClassesData(filters);
      setClasses(data);
      setTotalPages(totalPages);
    }
    fetchData();
  }, [filters]);

  const tableCells: string[] = ["Class Name", "Number of Students", "Actions"];
  return (
    <div
      className={`${
        totalPages > 1 && "pb-6"
      } w-full bg-white shadow-md rounded-lg overflow-hidden`}
    >
      <DashBoardPageHead
        text="Classes"
        btnText="Add Class"
        haveBtn={true}
        btnLink="/dashboard/classes/add-new-class"
      />
      <DashBoardFilterations
        doesNotHaveFilterStatus={true}
        page="classes"
        placeHolder="Find a class"
      />
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center min-h-screen">
            <p className="text-gray-500 font-semibold pt-10 text-xl">
              Loading...
            </p>
          </div>
        ) : classes?.length > 0 ? (
          <>
            <DashBoardTable
              tableData={classes}
              tableCells={tableCells}
              currPage="classes"
            />
            <Pagination
              totalPages={totalPages}
              currentPage={Number(filters.page)}
            />
          </>
        ) : (
          <div className="flex justify-center min-h-screen">
            <p className="text-gray-500 font-semibold pt-10 text-xl">
              No Classes!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
