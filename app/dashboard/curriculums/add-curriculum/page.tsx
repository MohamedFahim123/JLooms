import AddCurriculumForm from "@/app/components/AddCurriculumForm/AddCurriculumForm";
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Add Curriculum`,
};

const AddCurriculum = () => {
  return (
    <div className="mx-auto py-6 bg-white rounded-lg">
      <DashBoardPageHead text="Add Curriculum" />
      <AddCurriculumForm />
    </div>
  );
};

export default AddCurriculum;
