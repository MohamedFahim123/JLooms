import DashBoardPageHead from '@/app/components/DashBoardPageHead/DashBoardPageHead';
import Image from 'next/image';
import { FaPhoneAlt, FaEnvelope, FaGraduationCap } from 'react-icons/fa';
import Avatar from '../../../imgs/teachers/teacher1.png';
import Link from 'next/link';
import { Metadata } from 'next';
import { students } from '../../utils/tableData';

interface ParamsProps {
    id: string;
};

interface StudentsDetailsProps {
    params: Promise<ParamsProps>;
};

export const metadata: Metadata = {
    title: `Student Details`,
};

export default async function SingleStudentPage({params}: StudentsDetailsProps) {
    const { id } = await params;

    const student = students?.find((el) => el.id === Number(id));

    const filterOptions = [
        { label: 'Status', value: '', disabled: true },
        { label: 'Active', value: 'Active', disabled: false },
        { label: 'Sick Leave', value: 'Sick Leave', disabled: false },
        { label: 'Maternity Leave', value: 'Maternity Leave', disabled: false },
    ];

    return (
        <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
            <DashBoardPageHead haveFilter={true} filterOptions={filterOptions} text={student?.name || ''} haveBtn={false} />
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
                            <h5 className="font-bold">Age</h5>
                            <p>{student?.age}</p>
                        </div>
                        <div className="flex items-center flex-col w-16 h-16 gap-2">
                            <h5 className="font-bold">Gender</h5>
                            <p>{student?.gender}</p>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 cursor-pointer bg-[#EBECFA] rounded-lg">
                            <Link href={`tel:${student?.phone}`}>
                                <FaPhoneAlt size={20} className="text-[#8A8A8A]" />
                            </Link>
                        </div>
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
                            student?.class
                        }
                    </h3>
                </div>
            </div>
        </div>
    );
};
