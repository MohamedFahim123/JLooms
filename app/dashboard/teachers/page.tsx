import Loader from "@/app/components/Loader/Loader";
import TeachersSection from "@/app/components/TeachersSection/TeachersSection";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Our Teachers",
};

export default function TeachersPage() {
  return (
    <Suspense fallback={<Loader />}>
      <TeachersSection />
    </Suspense>
  );
}
