import Loader from "@/app/components/Loader/Loader";
import ParentsSection from "@/app/components/ParentsSection/ParentsSection";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Parents",
};

export default function ParentsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <ParentsSection />
    </Suspense>
  );
}
