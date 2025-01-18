import DashBoardPageHead from '@/app/components/DashBoardPageHead/DashBoardPageHead';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { FaEnvelope, FaGraduationCap, FaPhoneAlt } from 'react-icons/fa';
import Avatar from '../../../imgs/teachers/teacher1.png';
import { dataURLS } from '../../utils/dataUrls';

interface ParamsProps {
    id: string;
};

export const metadata: Metadata = {
    title: `Single Parent`,
};

export default async function SingleParentPage({ params }: { params: Promise<ParamsProps> }) {
    const { id } = await params;
    const cookiesData = await cookies();
    const token = cookiesData.get('CLIENT_JLOOMS_TOKEN')?.value;

    const fetchparent = await fetch(`${dataURLS.singleParent}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const response = await fetchparent?.json();
    const parent = response?.data?.parent;

    return (
        <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
            <DashBoardPageHead text={parent?.code || ''} haveBtn={false} />
            <div className="px-6 pt-4 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-4 flex flex-col items-center space-y-6">
                    <div className="w-44 h-44 rounded-full overflow-hidden border">
                        <Image
                            src={parent?.image || Avatar}
                            alt={parent?.name || 'parent Profile Avatar'}
                            width={175}
                            height={175}
                            className="object-cover"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 cursor-pointer bg-[#EBECFA] rounded-lg">
                            <Link href={`tel:${parent?.phone}`}>
                                <FaPhoneAlt size={20} className="text-[#8A8A8A]" />
                            </Link>
                        </div>
                        <div className="flex items-center justify-center w-10 cursor-pointer h-10 bg-[#EBECFA] rounded-lg">
                            <Link href={`mailto:${parent?.email}`}>
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
                            parent?.name
                        }
                    </h3>
                </div>
            </div>
        </div>
    );
};