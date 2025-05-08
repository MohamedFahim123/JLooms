import EmployeesSection from "@/app/components/EmployeesSection/EmployeesSection";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "All Employees",
  description: "All Employees",
};

const EmployeesPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmployeesSection />
    </Suspense>
  );
};

export default EmployeesPage;
