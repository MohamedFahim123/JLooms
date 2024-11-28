import DashBoardTable from '@/app/components/DashBoardTable/DashBoardTable';
import React from 'react';
import { Metadata } from 'next';
import DashBoardPageHead from '@/app/components/DashBoardPageHead/DashBoardPageHead';
import DashBoardFilterations from '@/app/components/DashBoardFilterations/DashBoardFilterations';
import { teachers } from '../utils/tableData';

export const metadata: Metadata = {
    title: "Our Teachers",
};

export default function TeachersPage() {
    const tableCells: string[] = ['name', 'subject', 'class', 'status'];

    return (
        <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <DashBoardPageHead text='Teachers' btnText='Add Teacher' haveBtn={true} btnLink='/dashboard/teachers/add-new-teacher' />
            <DashBoardFilterations />
            <div className="overflow-x-auto">
                <DashBoardTable tableData={teachers} tableCells={tableCells} />
            </div>
        </div>
    );
};