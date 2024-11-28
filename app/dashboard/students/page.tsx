import DashBoardTable from '@/app/components/DashBoardTable/DashBoardTable';
import React from 'react';
import { Metadata } from 'next';
import DashBoardPageHead from '@/app/components/DashBoardPageHead/DashBoardPageHead';
import DashBoardFilterations from '@/app/components/DashBoardFilterations/DashBoardFilterations';
import { students } from '../utils/tableData';

export const metadata: Metadata = {
    title: "Our Students",
};

const StudentsPage = () => {
    const tableCells: string[] = ['name', 'class', 'Parent'];

    return (
        <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <DashBoardPageHead text='Students' btnText='Add Student' haveBtn={true} btnLink='/dashboard/students/add-new-student' />
            <DashBoardFilterations placeHolder="Search for a Student by name or email" />
            <div className="overflow-x-auto">
                <DashBoardTable tableData={students} tableCells={tableCells} currPage={'students'} />
            </div>
        </div>
    );
};
export default StudentsPage;