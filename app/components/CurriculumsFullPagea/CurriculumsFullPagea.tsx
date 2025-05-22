"use client";

import { getTokenFromServerCookies } from "@/app/auth/utils/storeTokenOnServer";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import { Table } from "@/app/dashboard/utils/interfaces";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashBoardFilterations from "../DashBoardFilterations/DashBoardFilterations";
import DashBoardPageHead from "../DashBoardPageHead/DashBoardPageHead";
import DashBoardTable from "../DashBoardTable/DashBoardTable";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";

let loading: boolean = true;
async function fetchCurriculumsData(
  filters: Record<string, string | number> = {}
): Promise<{
  data: Table[];
  totalPages: number;
  page: number;
}> {
  loading = true;
  const token = await getTokenFromServerCookies();

  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, String(value));
    }
  });

  const apiUrl =
    filters?.class || filters?.activity || filters.name
      ? `${dataURLS.curriculumsFilter}?t=${new Date().getTime()}`
      : `${dataURLS.allCurriculums}?t=${new Date().getTime()}`;
  const response = await fetch(apiUrl, {
    method:
      filters?.class || filters?.activity || filters.name ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: filters?.class || filters?.activity || filters.name ? JSON.stringify(filters) : null,
  });

  if (!response.ok) {
    loading = false;
    return { data: [], totalPages: 0, page: 0 };
  }

  const data = await response.json();
  loading = false;
  return {
    data: data?.data?.curriculums || [],
    totalPages: data?.meta?.totalPages || 1,
    page: data?.meta?.page || 1,
  };
}

const CurriculumsFullPagea = () => {
  const [curriculums, setCurriculums] = useState<Table[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currPage, setCurrPage] = useState<number>(1);
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Record<string, string | number>>({});

  useEffect(() => {
    const newFilters: Record<string, string | number> = {
      activity: searchParams.get("activity") || "",
      class: searchParams.get("class") || "",
      name: searchParams.get("name") || "",
      page: searchParams.get("page") || 1,
    };
    setFilters(newFilters);
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      const { data, totalPages, page } = await fetchCurriculumsData(filters);
      setCurriculums(data);
      setTotalPages(totalPages);
      setCurrPage(page);
    }
    fetchData();
  }, [filters]);

  const tableCells: string[] = [
    "Name",
    "Date From",
    "Date To",
    "type",
    "category",
    "subcategory",
    "Remove",
  ];

  return (
    <div
      className={`${
        totalPages > 1 && "pb-6"
      } w-full bg-white shadow-md rounded-lg overflow-hidden`}
    >
      <DashBoardPageHead
        text="Curriculums"
        btnText="Add Curriculum"
        haveBtn={true}
        btnLink="/dashboard/curriculums/add-curriculum"
      />
      <DashBoardFilterations
        doesNotHaveFilterStatus={true}
        page="curriculums"
        placeHolder="Find a curriculum"
      />
      <div className="overflow-x-auto">
        {loading ? (
          <Loader />
        ) : curriculums.length > 0 ? (
          <div>
            <DashBoardTable
              tableData={curriculums}
              tableCells={tableCells}
              currPage="curriculums"
            />
            <Pagination totalPages={totalPages} currentPage={currPage} />
          </div>
        ) : (
          <div className="flex justify-center min-h-screen">
            <p className="text-gray-500 font-semibold pt-10 text-xl">
              No Curriculums Found!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurriculumsFullPagea;
