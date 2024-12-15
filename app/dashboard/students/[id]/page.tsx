import DashBoardPageHead from '@/app/components/DashBoardPageHead/DashBoardPageHead';

import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { dataURLS } from '../../utils/dataUrls';
import SingleStudentView from '@/app/components/SingleStudentView/SingleStudentView';

interface ParamsProps {
    id: string;
};

interface StudentsDetailsProps {
    params: Promise<ParamsProps>;
};

export const metadata: Metadata = {
    title: `Student Details`,
};

export default async function SingleStudentPage({ params }: StudentsDetailsProps) {
    const { id } = await params;
    const cookiesData = await cookies();
    const token = cookiesData.get('SERVER_JLOOMS_TOKEN')?.value;

    const fetchTeacher = await fetch(`${dataURLS.singleStudent}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const response = await fetchTeacher?.json();

    const student = response?.data?.student;

    return (
        <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
            <DashBoardPageHead text={`code: ${student?.code}` || ''} haveBtn={false} />
            <SingleStudentView student={student} />
        </div>
    );
};
