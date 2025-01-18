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
async function fetchparentsData(filters: Record<string, string | number> = {}): Promise<{ data: Table[]; totalPages: number }> {
    loading = true;
    const token = Cookies.get('CLIENT_JLOOMS_TOKEN');

    const apiUrl = (filters.name)
        ? `${dataURLS.filterParents}?q=${filters?.name}&t=${new Date().getTime()}`
        : `${dataURLS.allParents}?t=${new Date().getTime()}`;

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
    return { data: data?.data?.parents || [], totalPages: data?.meta?.totalPages || 1 };
};

export default function ParentsSection() {
    const searchParams = useSearchParams();
    const [filters, setFilters] = useState<Record<string, string | number>>({});
    const [parents, setParents] = useState<Table[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const newFilters: Record<string, string | number> = {
            name: searchParams.get('name') || '',
            page: searchParams.get('page') || 1,
        };
        setFilters(newFilters);
    }, [searchParams]);

    useEffect(() => {
        async function fetchData() {
            const { data, totalPages } = await fetchparentsData(filters);
            setParents(data);
            setTotalPages(totalPages);
        };
        fetchData();
    }, [filters]);

    const tableCells: string[] = ['Parent Name', 'Code', 'Mobile', 'Email', 'Remove'];

    return (
        <div className={`${totalPages > 1 && 'pb-6'} w-full bg-white shadow-md rounded-lg overflow-hidden`}>
            <DashBoardPageHead text="Parents" btnText="Add Parent" haveBtn={true} btnLink="/dashboard/parents/add-parent" />
            <DashBoardFilterations doesNotHaveFilterStatus={true} page="parents" placeHolder="Find a Parent" />
            <div className="overflow-x-auto">
                {
                    loading ?
                        <div className="flex justify-center min-h-screen">
                            <p className="text-gray-500 font-semibold pt-10 text-xl">Loading...</p>
                        </div>
                        :
                        parents.length > 0 ?
                            (
                                <>
                                    <DashBoardTable tableData={parents} tableCells={tableCells} currPage="parents" />
                                    <Pagination totalPages={totalPages} currentPage={Number(filters.page)} />
                                </>
                            ) : (
                                <div className="flex justify-center min-h-screen">
                                    <p className="text-gray-500 font-semibold pt-10 text-xl">No Parents!</p>
                                </div>
                            )
                }
            </div>
        </div>
    );
};