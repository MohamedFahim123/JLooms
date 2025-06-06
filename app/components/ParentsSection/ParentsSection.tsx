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
async function fetchparentsData(
  filters: Record<string, string | number> = {}
): Promise<{ data: Table[]; totalPages: number }> {
  loading = true;
  const token = await getTokenFromServerCookies();

  const apiUrl = filters.name
    ? `${dataURLS.filterParents}?q=${filters?.name}&t=${new Date().getTime()}`
    : `${dataURLS.allParents}?t=${new Date().getTime()}`;

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
    data: data?.data?.parents || [],
    totalPages: data?.meta?.totalPages || 1,
  };
}

export default function ParentsSection() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  const [parents, setParents] = useState<Table[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const { userLoginned, userLoginnedType } = useLoginnedUserStore();

  useEffect(() => {
    const newFilters: Record<string, string | number> = {
      name: searchParams.get("name") || "",
      page: searchParams.get("page") || 1,
    };
    setFilters(newFilters);
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      const { data, totalPages } = await fetchparentsData(filters);
      setParents(data);
      setTotalPages(totalPages);
    }
    fetchData();
  }, [filters]);

  const tableCells: string[] =
    userLoginnedType === "Admin"
      ? ["Parent Name", "Code", "Mobile", "Email", "Action"]
      : userLoginned?.permissions?.includes("Delete Parents")
      ? ["Parent Name", "Code", "Mobile", "Email", "Action"]
      : ["Parent Name", "Code", "Mobile", "Email"];

  return (
    <div
      className={`${
        totalPages > 1 && "pb-6"
      } w-full bg-white shadow-md rounded-lg overflow-hidden`}
    >
      <DashBoardPageHead
        text="Parents"
        btnText="Add Parent"
        haveBtn={
          userLoginnedType === "Admin"
            ? true
            : userLoginned?.permissions?.includes("Create Parents")
            ? true
            : false
        }
        btnLink="/dashboard/parents/add-parent"
      />
      <DashBoardFilterations
        doesNotHaveFilterStatus={true}
        page="parents"
        placeHolder="Find a Parent"
      />
      <div className="overflow-x-auto">
        {loading ? (
          <Loader />
        ) : parents.length > 0 ? (
          <>
            <DashBoardTable
              tableData={parents}
              tableCells={tableCells}
              currPage="parents"
            />
            <Pagination
              totalPages={totalPages}
              currentPage={Number(filters.page)}
            />
          </>
        ) : (
          <div className="flex justify-center min-h-screen">
            <p className="text-gray-500 font-semibold pt-10 text-xl">
              No Parents!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
