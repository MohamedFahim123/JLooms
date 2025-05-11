import AddTeacherForm from "@/app/components/AddTeacherForm/AddTeacherForm";
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import Loader from "@/app/components/Loader/Loader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Add New Teacher",
};

export default function AddNewTeacherPage() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="mx-auto py-6 bg-white rounded-lg">
        <DashBoardPageHead text="Add Teacher" />
        <AddTeacherForm />
      </div>
    </Suspense>
  );
}
