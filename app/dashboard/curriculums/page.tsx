import CurriculumsFullPagea from "@/app/components/CurriculumsFullPagea/CurriculumsFullPagea";
import Loader from "@/app/components/Loader/Loader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Curriculums",
};

const CurriculumsPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <CurriculumsFullPagea />
    </Suspense>
  );
};

export default CurriculumsPage;
