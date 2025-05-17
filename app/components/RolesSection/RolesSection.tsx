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

async function fetchRolesData(
  filters: Record<string, string | number> = {},
  setLoading: (loading: boolean) => void
): Promise<{
  data: Table[];
  totalPages: number;
  per_page: number;
  current_page: number;
  last_page: number;
}> {
  setLoading(true);
  const token = await getTokenFromServerCookies();

  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) queryParams.append(key, String(value));
  });

  const apiUrl =
    filters?.status || filters.name
      ? `${dataURLS.filterRoles}?${queryParams}&t=${new Date().getTime()}`
      : `${dataURLS.allRoles}?t=${new Date().getTime()}`;

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    setLoading(false);
    return {
      data: [],
      totalPages: 0,
      per_page: 0,
      current_page: 0,
      last_page: 0,
    };
  }

  const data = await response.json();
  setLoading(false);
  return {
    data: data?.data?.roles || [],
    totalPages: data?.meta?.totalPages || 1,
    per_page: data?.meta?.per_page || 15,
    current_page: data?.meta?.current_page || 1,
    last_page: data?.meta?.last_page || 1,
  };
}

export default function RolesSection() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  const [roles, setRoles] = useState<Table[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
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
      const { data, totalPages } = await fetchRolesData(filters, setLoading);
      setRoles(data);
      setTotalPages(totalPages);
    }
    fetchData();
  }, [filters]);

  const tableCells: string[] =
    userLoginnedType === "Admin"
      ? ["name", "action"]
      : userLoginned?.permissions?.includes("Delete Roles")
      ? ["name", "action"]
      : ["name"];

  return (
    <div
      className={`${
        totalPages > 1 && "pb-6"
      } w-full bg-white shadow-md rounded-lg overflow-hidden`}
    >
      <DashBoardPageHead
        text="Roles"
        btnText="Add Role"
        haveBtn={
          userLoginnedType === "Admin"
            ? true
            : userLoginned?.permissions?.includes("Create Roles")
            ? true
            : false
        }
        btnLink="/dashboard/roles/add-role"
      />
      <DashBoardFilterations
        page="roles"
        placeHolder="Find a Role"
        doesNotHaveFilterStatus={true}
      />
      <div className="overflow-x-auto">
        {loading ? (
          <Loader />
        ) : roles.length > 0 ? (
          <>
            <DashBoardTable
              tableData={roles}
              tableCells={tableCells}
              currPage="Roles"
            />
            <Pagination
              totalPages={totalPages}
              currentPage={Number(filters.page)}
            />
          </>
        ) : (
          <div className="flex justify-center min-h-screen">
            <p className="text-gray-500 font-semibold pt-10 text-xl">
              No Roles!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
