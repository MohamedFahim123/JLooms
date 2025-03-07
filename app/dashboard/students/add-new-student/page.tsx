import AddStudentForm from "@/app/components/AddStudentForm/AddStudentForm";
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Add New Student`,
};
export default function AddNewStudentPage() {
    return (
        <div className="mx-auto py-6 bg-white rounded-lg">
            <DashBoardPageHead text='Add Student' />
            <AddStudentForm />
        </div>
    );
};