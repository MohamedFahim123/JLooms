import { Table } from '@/app/dashboard/utils/interfaces';
import React from 'react';
import ClassesTableRow from '../ClassesTableRow/ClassesTableRow';
import TeachersTableRow from '../TeachersTableRow/TeachersTableRow';
import StudentsTableRow from '../StudentsTableRow/StudentsTableRow';

interface DashBoardTableProps {
    tableData: Table[];
    tableCells: string[];
    currPage: string;
};

export default function DashBoardTable({ currPage, tableData, tableCells }: DashBoardTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
                <thead className="hidden md:table-header-group bg-gray-50 text-xs text-gray-500 uppercase">
                    <tr>
                        {
                            tableCells?.map((cell, index) => (
                                <th key={index} className="py-3 px-4 font-semibold text-gray-500">
                                    {cell}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                {
                    tableData?.map((cell) => (
                        <tbody key={cell.id}>
                            {
                                currPage === 'teachers' &&
                                <TeachersTableRow cell={cell} />
                            }
                            {
                                currPage === 'students' &&
                                <StudentsTableRow cell={cell} />
                            }
                            {
                                currPage === 'classes' &&
                                <ClassesTableRow cell={cell} />
                            }
                        </tbody>
                    ))
                }
            </table>
        </div>
    );
}
