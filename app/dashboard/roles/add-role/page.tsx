import AddRoleForm from "@/app/components/AddRoleForm/AddRoleForm";
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import Loader from "@/app/components/Loader/Loader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Add Role",
};

const AddRolePage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="mx-auto py-6 bg-white rounded-lg">
        <DashBoardPageHead text="Add Role" />
        <AddRoleForm />
      </div>
    </Suspense>
  );
};

export default AddRolePage;
