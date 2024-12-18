import AddParentForm from "@/app/components/AddParentForm/AddParentForm";
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Add Parent`,
};

export default function AddParentPage() {
    return (
        <div className="mx-auto py-6 bg-white rounded-lg">
            <DashBoardPageHead text='Add Parent' />
            <AddParentForm />
        </div>
    );
};