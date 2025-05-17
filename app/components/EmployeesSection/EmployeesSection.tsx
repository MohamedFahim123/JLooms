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
async function fetchEmployeesData(
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

  const apiUrl =
    filters?.status || filters.name
      ? `${dataURLS.filterEmployees}?${queryParams}&t=${new Date().getTime()}`
      : `${dataURLS.employees}?t=${new Date().getTime()}`;

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
    data: data?.data?.employees || [],
    totalPages: data?.meta?.totalPages || 1,
  };
}
export default function EmployeesSection() {
  const { userLoginned, userLoginnedType } = useLoginnedUserStore();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  const [employees, setEmployees] = useState<Table[]>([]);
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
      const { data, totalPages } = await fetchEmployeesData(filters);
      setEmployees(data);
      setTotalPages(totalPages);
    }
    fetchData();
  }, [filters]);

  const tableCells: string[] =
    userLoginnedType === "Admin"
      ? ["name", "phone", "email", "status", "action"]
      : userLoginned?.permissions?.includes("Delete Employee")
      ? ["name", "phone", "email", "status", "action"]
      : ["name", "phone", "email", "status"];

  return (
    <div
      className={`${
        totalPages > 1 && "pb-6"
      } w-full bg-white shadow-md rounded-lg overflow-hidden`}
    >
      <DashBoardPageHead
        text="Employees"
        btnText="Add Employee"
        haveBtn={
          userLoginnedType === "Admin"
            ? true
            : userLoginned?.permissions?.includes("Create Employee")
            ? true
            : false
        }
        btnLink="/dashboard/employees/add-employee"
      />
      <DashBoardFilterations page="employees" placeHolder="Find an employee" />
      <div className="overflow-x-auto">
        {loading ? (
          <Loader />
        ) : employees.length > 0 ? (
          <>
            <DashBoardTable
              tableData={employees}
              tableCells={tableCells}
              currPage="employees"
            />
            <Pagination
              totalPages={totalPages}
              currentPage={Number(filters.page)}
            />
          </>
        ) : (
          <div className="flex justify-center min-h-screen">
            <p className="text-gray-500 font-semibold pt-10 text-xl">
              No Employees!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
