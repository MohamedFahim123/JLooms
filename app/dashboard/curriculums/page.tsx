import CurriculumsFullPagea from "@/app/components/CurriculumsFullPagea/CurriculumsFullPagea";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata : Metadata = {
  title: "Curriculums",
};

const CurriculumsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CurriculumsFullPagea />
    </Suspense>
  );
};

export default CurriculumsPage;
