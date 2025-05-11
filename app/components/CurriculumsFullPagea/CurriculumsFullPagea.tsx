"use client";

import { getTokenFromServerCookies } from "@/app/auth/utils/storeTokenOnServer";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import { Table } from "@/app/dashboard/utils/interfaces";
import { useEffect, useState } from "react";
import DashBoardPageHead from "../DashBoardPageHead/DashBoardPageHead";
import DashBoardTable from "../DashBoardTable/DashBoardTable";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";

let loading: boolean = true;
async function fetchCurriculumsData(): Promise<{
  data: Table[];
  totalPages: number;
  page: number;
}> {
  loading = true;
  const token = await getTokenFromServerCookies();

  const apiUrl = `${dataURLS.allCurriculums}?t=${new Date().getTime()}`;

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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

  useEffect(() => {
    async function fetchData() {
      const { data, totalPages, page } = await fetchCurriculumsData();
      setCurriculums(data);
      setTotalPages(totalPages);
      setCurrPage(page);
    }
    fetchData();
  }, []);

  const tableCells: string[] = [
    "Parent Name",
    "Code",
    "Mobile",
    "Email",
    "Remove",
  ];
  console.log(loading);

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
