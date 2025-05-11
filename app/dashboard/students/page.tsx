import Loader from "@/app/components/Loader/Loader";
import StudentsSection from "@/app/components/StudentsSection/StudentsSection";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Our Students",
};

const StudentsPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <StudentsSection />
    </Suspense>
  );
};
export default StudentsPage;
