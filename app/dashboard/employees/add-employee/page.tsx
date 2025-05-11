import AddEmployeeForm from "@/app/components/AddEmployeeForm/AddEmployeeForm";
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import Loader from "@/app/components/Loader/Loader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Add Employee",
  description: "Add Employee",
};

const AddEmployeePage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="mx-auto py-6 bg-white rounded-lg">
        <DashBoardPageHead text="Add Employee" />
        <AddEmployeeForm />
      </div>
    </Suspense>
  );
};

export default AddEmployeePage;
