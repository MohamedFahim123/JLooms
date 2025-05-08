import AddRoleForm from "@/app/components/AddRoleForm/AddRoleForm";
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Role",
};

const AddRolePage = () => {
  return (
    <div className="mx-auto py-6 bg-white rounded-lg">
      <DashBoardPageHead text="Add Role" />
      <AddRoleForm />
    </div>
  );
};

export default AddRolePage;
