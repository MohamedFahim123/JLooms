import { Teacher } from '@/app/dashboard/utils/interfaces';
import React from 'react';

interface DashBoardTableProps {
    tableData: Teacher[];
    tableCells: string[];
};

export default function DashBoardTable({tableData,tableCells} : DashBoardTableProps) {
    return (
        <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                    {tableCells.map((cell, index) => (
                        <th key={index} className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                            {cell}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableData.map((teacher, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                        <td className="py-3 px-4 whitespace-nowrap">{teacher.name}</td>
                        <td className="py-3 px-4">{teacher.subject}</td>
                        <td className="py-3 px-4">{teacher.class}</td>
                        <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${teacher.status === 'Active' ? 'bg-green-100 text-green-800' :
                                teacher.status === 'Sick Leave' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                {teacher.status}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
