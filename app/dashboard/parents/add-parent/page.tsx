import AddParentForm from "@/app/components/AddParentForm/AddParentForm";
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import Loader from "@/app/components/Loader/Loader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `Add Parent`,
};

export default function AddParentPage() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="mx-auto py-6 bg-white rounded-lg">
        <DashBoardPageHead text="Add Parent" />
        <AddParentForm />
      </div>
    </Suspense>
  );
}
