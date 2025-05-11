import ClassesSection from "@/app/components/ClassesSection/ClassesSection";
import Loader from "@/app/components/Loader/Loader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Our Classes",
};

export default function page() {
  return (
    <Suspense fallback={<Loader />}>
      <ClassesSection />
    </Suspense>
  );
}
