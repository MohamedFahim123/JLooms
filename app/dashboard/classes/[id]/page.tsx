
import DashBoardPageHead from '@/app/components/DashBoardPageHead/DashBoardPageHead';
import { Metadata } from 'next';
import { classes } from '../../utils/tableData';
import { FaGraduationCap } from 'react-icons/fa';

interface ParamsProps {
    id: string;
};

interface classDetailsProps {
    params: Promise<ParamsProps>;
};

export const metadata: Metadata = {
    title: `Class Details`,
};

export default async function page({ params }: classDetailsProps) {
    const { id } = await params;
    const classDetails = classes?.find((el: { id: number; }) => el.id === Number(id));

    return (
        <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
            <DashBoardPageHead text={classDetails?.className || ''} btnText='Assign Students' haveBtn={true} />
            <div className="px-6 pt-4 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-8 mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                        <span className="flex items-center justify-center w-14 h-14 bg-[#EBECFA] rounded-lg">
                            <FaGraduationCap size={32} className="text-[#8A8A8A]" />
                        </span>
                        Subjects
                    </h3>
                </div>
                <div className="lg:col-span-8 mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                        <span className="flex items-center justify-center w-14 h-14 bg-[#EBECFA] rounded-lg">
                            <FaGraduationCap size={32} className="text-[#8A8A8A]" />
                        </span>
                        Activities
                    </h3>
                </div>
            </div>
        </div>
    );
};
