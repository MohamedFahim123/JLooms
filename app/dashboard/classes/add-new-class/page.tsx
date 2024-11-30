import AddNewClassForm from "@/app/components/AddNewClassForm/AddNewClassForm";
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add New Class",
};

export default function page() {
    
    return (
        <div className="mx-auto py-6 bg-white rounded-lg">
            <DashBoardPageHead text='Add New Class' />
            <AddNewClassForm />
        </div>
    );
};