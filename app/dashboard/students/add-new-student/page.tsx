import AddStudentForm from "@/app/components/AddStudentForm/AddStudentForm";
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import Loader from "@/app/components/Loader/Loader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `Add New Student`,
};
export default function AddNewStudentPage() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="mx-auto py-6 bg-white rounded-lg">
        <DashBoardPageHead text="Add Student" />
      </div>
      <AddStudentForm />
    </Suspense>
  );
}
