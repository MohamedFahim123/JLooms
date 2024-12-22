
import DashBoardPageHead from '@/app/components/DashBoardPageHead/DashBoardPageHead';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { FaGraduationCap } from 'react-icons/fa';
import { dataURLS } from '../../utils/dataUrls';
import { teacherInterface } from '../../utils/interfaces';
import SingleClassRowOfAction from '@/app/components/SingleClassRowOfAction/SingleClassRowOfAction';

export const metadata: Metadata = {
    title: `Class Details`,
};

interface ParamsProps {
    id: string;
};

interface classDetailsProps {
    params: Promise<ParamsProps>;
};


export interface OPTION {
    icon: string;
    id: number;
    type: string;
    name_ar: string;
    name_en: string;
    teachers: teacherInterface[];
    name: string;
}

interface ClassDetails {
    id: number;
    name: string;
    name_ar: string;
    name_en: string;
    number_of_students: number;
    options: OPTION[];
};

export default async function page({ params }: classDetailsProps) {
    const { id } = await params;
    const cookiesData = await cookies();
    const token = cookiesData.get('SERVER_JLOOMS_TOKEN')?.value;
    const request = await fetch(`${dataURLS.singleClass}/${id}?t=${new Date().getTime()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`
        },
    });
    const responseData = await request.json();
    const classDetails: ClassDetails = responseData?.data;

    const options: OPTION[] = classDetails?.options;
    const actionArray: OPTION[] = [];
    const activityArray: OPTION[] = [];

    const allowedTeachersRequest = await fetch(`${dataURLS.allowedTeachers}?t=${new Date().getTime()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`
        },
    });
    const allowedReponse = await allowedTeachersRequest.json();
    const allowedTeachers = allowedReponse?.data?.teachers;

    options?.forEach((option: OPTION) => {
        if (option.type === "action") {
            actionArray.push(option);
        } else if (option.type === "activity") {
            activityArray.push(option);
        };
    });

    return (
        <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
            <DashBoardPageHead text={classDetails?.name_en || 'Class Name Unknown'} />
            <div className="px-6 pt-4 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-12 mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                        <span className="flex items-center justify-center w-14 h-14 bg-[#EBECFA] rounded-lg">
                            <FaGraduationCap size={32} className="text-[#8A8A8A]" />
                        </span>
                        Actions
                    </h3>
                    {
                        actionArray &&
                        actionArray?.map((option: OPTION, idx) => (
                            <div key={option.id} className={`${((idx + 1) !== actionArray.length) && 'border-y border-t-0'} py-6`}>
                                <SingleClassRowOfAction classId={id} allowedTeachers={allowedTeachers} option={option} />
                            </div>
                        ))
                    }
                </div>
                <div className="lg:col-span-12 mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                        <span className="flex items-center justify-center w-14 h-14 bg-[#EBECFA] rounded-lg">
                            <FaGraduationCap size={32} className="text-[#8A8A8A]" />
                        </span>
                        Activities
                    </h3>
                    {
                        activityArray &&
                        activityArray?.map((option: OPTION, idx) => (
                            <div key={option.id} className={`${((idx + 1) !== actionArray.length) && 'border-y border-t-0'} py-6`}>
                                <SingleClassRowOfAction classId={id} allowedTeachers={allowedTeachers} option={option} />
                            </div >
                        ))
                    }
                </div>
            </div>
        </div>
    );
};