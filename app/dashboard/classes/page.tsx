import { Metadata } from "next";
import ClassesSection from "@/app/components/ClassesSection/ClassesSection";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Our Classes",
};

export default function page() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ClassesSection />
        </Suspense>
    );
};