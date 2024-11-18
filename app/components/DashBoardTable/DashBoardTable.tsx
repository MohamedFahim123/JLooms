import { Teacher } from '@/app/dashboard/utils/interfaces';
import Image from 'next/image';
import React from 'react';
import avatar from '../../imgs/teachers/teacher1.png';
import Link from 'next/link';

interface DashBoardTableProps {
    tableData: Teacher[];
    tableCells: string[];
}

export default function DashBoardTable({ tableData, tableCells }: DashBoardTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
                <thead className="hidden md:table-header-group bg-gray-50 text-xs text-gray-500 uppercase">
                    <tr>
                        {tableCells?.map((cell, index) => (
                            <th key={index} className="py-3 px-4 font-semibold text-gray-500">
                                {cell}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData?.map((cell) => (
                        <tr
                            key={cell?.id}
                            className="border-b hover:bg-gray-100 cursor-pointer md:table-row grid grid-cols-1 md:grid-cols-4 gap-2 p-3 md:p-0"
                        >
                            <td className="py-3 px-4 flex items-center gap-3">
                                <Link href={`/dashboard/teachers/${cell?.id}`} className="whitespace-nowrap flex items-center gap-3">
                                    <Image
                                        src={cell?.image || avatar}
                                        alt={`${cell?.name}'s avatar`}
                                        width={30}
                                        height={30}
                                        className="rounded-full"
                                    />
                                    <span className="block md:hidden font-semibold text-gray-500">Name:</span>
                                    {cell.name}
                                </Link>
                            </td>
                            <td className="py-3 px-4">
                                <span className="block md:hidden font-semibold text-gray-500">Subject:</span>
                                {cell.subject}
                            </td>
                            <td className="py-3 px-4">
                                <span className="block md:hidden font-semibold text-gray-500">Class:</span>
                                {cell.class}
                            </td>
                            <td className="py-3 px-4">
                                <span className="block md:hidden font-semibold text-gray-500">Status:</span>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${cell.status === 'Active'
                                        ? 'bg-green-100 text-green-800'
                                        : cell.status === 'Sick Leave'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}
                                >
                                    {cell.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
