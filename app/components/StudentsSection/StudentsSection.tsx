'use client';

import { Table } from "@/app/dashboard/utils/interfaces";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashBoardPageHead from "../DashBoardPageHead/DashBoardPageHead";
import DashBoardFilterations from "../DashBoardFilterations/DashBoardFilterations";
import DashBoardTable from "../DashBoardTable/DashBoardTable";
import Pagination from "../Pagination/Pagination";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import Cookies from 'js-cookie';

let loading: boolean = true;
async function fetchTeachersData(filters: Record<string, string | number> = {}): Promise<{ data: Table[]; totalPages: number }> {
    loading = true;
    const token = Cookies.get('CLIENT_JLOOMS_TOKEN');

    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (value) {
            queryParams.append(key, String(value));
        };
    });

    const apiUrl = (filters.name)
        ? `${dataURLS.filterStudents}?${queryParams}&t=${new Date().getTime()}`
        : `${dataURLS.allStudents}?t=${new Date().getTime()}`;

    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        return { data: [], totalPages: 0 };
    };

    const data = await response.json();
    loading = false;
    return { data: data?.data?.students || [], totalPages: data?.meta?.totalPages || 1 };
};
export default function StudentsSection() {
    const searchParams = useSearchParams();
    const [filters, setFilters] = useState<Record<string, string | number>>({});
    const [students, setStudents] = useState<Table[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const newFilters: Record<string, string | number> = {
            status: searchParams.get('status') || '',
            name: searchParams.get('name') || '',
            page: searchParams.get('page') || 1,
        };
        setFilters(newFilters);
    }, [searchParams]);

    useEffect(() => {
        async function fetchData() {
            const { data, totalPages } = await fetchTeachersData(filters);
            setStudents(data);
            setTotalPages(totalPages);
        };
        fetchData();
    }, [filters]);
    const tableCells: string[] = ['name', 'class name', 'parent', 'Remove'];

    return (
        <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <DashBoardPageHead text='Students' btnText='Add Student' haveBtn={true} btnLink='/dashboard/students/add-new-student' />
            <DashBoardFilterations doesNotHaveFilterStatus={true} page="students" placeHolder="Find a Student" />
            <div className="overflow-x-auto">
                {
                    loading ?
                        <div className="flex justify-center min-h-screen">
                            <p className="text-gray-500 font-semibold pt-10 text-xl">Loading...</p>
                        </div>
                        :
                        students.length > 0 ?
                            (
                                <>
                                    <DashBoardTable tableData={students} tableCells={tableCells} currPage={'students'} />
                                    <Pagination totalPages={totalPages} currentPage={Number(filters.page)} />
                                </>
                            ) : (
                                <div className="flex justify-center min-h-screen">
                                    <p className="text-gray-500 font-semibold pt-10 text-xl">No Students!</p>
                                </div>
                            )
                }
            </div>
        </div>
    );
};