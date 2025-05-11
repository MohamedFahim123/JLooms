import EmployeesSection from "@/app/components/EmployeesSection/EmployeesSection";
import Loader from "@/app/components/Loader/Loader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "All Employees",
  description: "All Employees",
};

const EmployeesPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <EmployeesSection />
    </Suspense>
  );
};

export default EmployeesPage;
