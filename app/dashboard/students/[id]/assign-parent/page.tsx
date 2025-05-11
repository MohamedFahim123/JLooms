import AssignParentForm from "@/app/components/AssignParentForm/AssignParentForm";
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import Loader from "@/app/components/Loader/Loader";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `Assign Parent`,
};
export default async function AssignParentPage() {
  const cookiesData = await cookies();
  const studentId = cookiesData.get("student_id")?.value;

  return (
    <Suspense fallback={<Loader />}>
      <div className="mx-auto py-6 bg-white rounded-lg">
        <DashBoardPageHead text="Assign Parent" />
        <AssignParentForm studentId={studentId} />
      </div>
    </Suspense>
  );
}
