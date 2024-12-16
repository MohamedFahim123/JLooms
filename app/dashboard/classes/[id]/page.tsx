
import DashBoardPageHead from '@/app/components/DashBoardPageHead/DashBoardPageHead';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { FaGraduationCap } from 'react-icons/fa';
import { dataURLS } from '../../utils/dataUrls';
import { teacherInterface } from '../../utils/interfaces';

export const metadata: Metadata = {
    title: `Class Details`,
};

interface ParamsProps {
    id: string;
};

interface classDetailsProps {
    params: Promise<ParamsProps>;
};


interface OPTION {
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
    const request = await fetch(`${dataURLS.singleClass}/${id}`, {
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
                <div className="lg:col-span-8 mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                        <span className="flex items-center justify-center w-14 h-14 bg-[#EBECFA] rounded-lg">
                            <FaGraduationCap size={32} className="text-[#8A8A8A]" />
                        </span>
                        Actions
                    </h3>
                    {
                        actionArray &&
                        actionArray?.map((option: OPTION) => (
                            <div key={option.id} className="bg-white rounded-lg shadow-lg p-6 my-4">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Image
                                            src={option.icon}
                                            alt={`${option.name} icon`}
                                            width={200}
                                            height={200}
                                            className="w-10 h-10 object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{option.name}</h3>
                                        <p className="text-sm text-gray-600">{option.type}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Teachers</h4>
                                    <div className="space-y-2">
                                        {option.teachers.length > 0 ? (
                                            option.teachers.map((teacher, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                                                >
                                                    <FaGraduationCap size={18} className="text-[#4C9B1F]" />
                                                    <p className="text-gray-700">{teacher?.name}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">No teachers assigned</p>
                                        )}
                                    </div>
                                </div>
                            </div >
                        ))
                    }
                </div>
                <div className="lg:col-span-8 mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                        <span className="flex items-center justify-center w-14 h-14 bg-[#EBECFA] rounded-lg">
                            <FaGraduationCap size={32} className="text-[#8A8A8A]" />
                        </span>
                        Activities
                    </h3>
                    {
                        activityArray &&
                        activityArray?.map((option: OPTION) => (
                            <div key={option.id} className="bg-white rounded-lg shadow-lg p-6 my-4">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Image
                                            src={option.icon}
                                            alt={`${option.name} icon`}
                                            width={200}
                                            height={200}
                                            className="w-10 h-10 object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{option.name}</h3>
                                        <p className="text-sm text-gray-600">{option.type}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Teachers</h4>
                                    <div className="space-y-2">
                                        {option.teachers.length > 0 ? (
                                            option.teachers.map((teacher, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                                                >
                                                    <FaGraduationCap size={18} className="text-[#4C9B1F]" />
                                                    <p className="text-gray-700">{teacher?.name}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">No teachers assigned</p>
                                        )}
                                    </div>
                                </div>
                            </div >
                        ))
                    }
                </div>
            </div>
        </div>
    );
};