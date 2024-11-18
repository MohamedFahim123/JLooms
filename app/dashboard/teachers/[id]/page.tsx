import { ParamsProps } from '@/app/utils/interfaces';
import React from 'react';
import { teachers } from '../page';
import DashBoardPageHead from '@/app/components/DashBoardPageHead/DashBoardPageHead';
import Image from 'next/image';
import { FaPhoneAlt, FaEnvelope, FaGraduationCap } from 'react-icons/fa';
import Avatar from '../../../imgs/teachers/teacher1.png';
import Link from 'next/link';
import { Metadata } from 'next';
import AddSubject from '@/app/components/AddSubject/AddSubject';

interface TeacherDetailsProps {
    params: ParamsProps;
}
export const metadata: Metadata = {
    title: `Teacher Details`,
};

export default function TeacherDetailsPage({ params }: TeacherDetailsProps) {
    const { id } = params;
    const teacher = teachers?.find(el => +el?.id === +id);
    const filterOptions = [
        {
            label: 'Status',
            value: '',
            disabled: true,
        },
        {
            label: 'InActive',
            value: 'InActive',
            disabled: false,
        },
        {
            label: 'Active',
            value: 'Active',
            disabled: false,
        },
        {
            label: 'Sick Leave',
            value: 'Sick Leave',
            disabled: false,
        },
        {
            label: 'Maternity Leave',
            value: 'Maternity Leave',
            disabled: false,
        },
    ];

    return (
        <>
            {
                teacher ?
                    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden min-h-lvh">
                        < DashBoardPageHead haveFilter={true} filterOptions={filterOptions} text={teacher?.name ? teacher?.name : ''} haveBtn={false} />
                        <div className="px-6 pt-4 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
                            <div className="lg:col-span-4 flex flex-col items-center space-y-6">
                                <div className="w-44 h-44 rounded-full overflow-hidden border">
                                    <Image
                                        src={teacher?.image ? teacher?.image : Avatar}
                                        alt={teacher?.name ? teacher?.name : 'Teacher Profile Avatar'}
                                        width={175}
                                        height={175}
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex space-x-4">
                                    <div className="flex items-center flex-col w-16 h-16 gap-2">
                                        <h5 className='font-bold'>Age</h5>
                                        <p>{teacher?.age}</p>
                                    </div>
                                    <div className="flex items-center flex-col w-16 h-16 gap-2">
                                        <h5 className='font-bold'>Gender</h5>
                                        <p>{teacher?.gender}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="flex items-center justify-center w-10 h-10 cursor-pointer bg-[#EBECFA] rounded-lg">
                                        <Link href={`tel:${teacher?.phone}`}>
                                            <FaPhoneAlt size={20} className="text-[#8A8A8A]" />
                                        </Link>
                                    </div>
                                    <div className="flex items-center justify-center w-10 cursor-pointer h-10 bg-[#EBECFA] rounded-lg">
                                        <Link href={`mailto:${teacher?.email}`}>
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
                                    Classes & Subjects
                                </h3>
                                <AddSubject />
                            </div>
                        </div>
                    </div >
                    :
                    <div className="flex justify-center items-center w-full h-full">
                        <div className="text-center text-gray-700">No teacher found with the given ID.</div>
                    </div>
            }
        </>
    );
};
