import DashBoardPageHead from '@/app/components/DashBoardPageHead/DashBoardPageHead';
import Image from 'next/image';
import { FaEnvelope, FaGraduationCap } from 'react-icons/fa';
import Avatar from '../../../imgs/teachers/teacher1.png';
import Link from 'next/link';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { dataURLS } from '../../utils/dataUrls';

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
    console.log(student)

    return (
        <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
            <DashBoardPageHead text={`code: ${student?.code}` || ''} haveBtn={false} />
            <div className="px-6 pt-4 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-4 flex flex-col items-center space-y-6">
                    <div className="w-44 h-44 rounded-full overflow-hidden border">
                        <Image
                            src={student?.image || Avatar}
                            alt={student?.name || 'student Profile Avatar'}
                            width={175}
                            height={175}
                            className="object-cover"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex items-center flex-col w-16 h-16 gap-2">
                            <h5 className="font-bold">Blood</h5>
                            <p>{student?.blood_type}</p>
                        </div>
                        <div className="flex items-center flex-col w-16 h-16 gap-2">
                            <h5 className="font-bold">Gender</h5>
                            <p>{student?.gender}</p>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex items-center justify-center w-10 cursor-pointer h-10 bg-[#EBECFA] rounded-lg">
                            <Link href={`mailto:${student?.email}`}>
                                <FaEnvelope size={20} className="text-[#8A8A8A]" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-8 mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                        <span className="flex items-center justify-center w-14 h-14 bg-[#EBECFA] rounded-lg">
                            <FaGraduationCap size={32} className="text-[#8A8A8A]" />
                        </span>
                        {
                            student?.name
                        }
                    </h3>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Student Details:</h4>
                    <ul className="space-y-4 text-gray-700">
                        {student.class_name === "N/A" ? (
                            <li className="flex items-center gap-2">
                                <span className="font-semibold text-gray-800">Class Name:</span>
                                <span>Didnot join any class yet!</span>
                            </li>
                        ) : (
                            <li className="flex items-center gap-2">
                                <span className="font-semibold text-gray-800">Class Name:</span>
                                <span>{student.class_name}</span>
                            </li>
                        )}
                        {student.class_id === "N/A" ? <li className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800">Class ID:</span>
                            <span>Didnot join any class yet!</span>
                        </li> : (
                            <li className="flex items-center gap-2">
                                <span className="font-semibold text-gray-800">Class ID:</span>
                                <span>{student.class_id}</span>
                            </li>
                        )}
                        {student.birth_date && (
                            <li className="flex items-center gap-2">
                                <span className="font-semibold text-gray-800">Birth Date:</span>
                                <span>{new Date(student.birth_date).toLocaleDateString()}</span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};
