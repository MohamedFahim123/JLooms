import AssignParentForm from "@/app/components/AssignParentForm/AssignParentForm";
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: `Add New Student`,
};
export default async function AssignParentPage() {
    const cookiesData = await cookies();
    const studentId = cookiesData.get('student_id')?.value;

    return (
        <div className="mx-auto py-6 bg-white rounded-lg">
            <DashBoardPageHead text='Assign Parent' />
            <AssignParentForm studentId={studentId} />
        </div>
    );
};