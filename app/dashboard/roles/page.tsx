import Loader from "@/app/components/Loader/Loader";
import RolesSection from "@/app/components/RolesSection/RolesSection";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "All Roles",
};

const RolesPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RolesSection />
    </Suspense>
  );
};

export default RolesPage;
