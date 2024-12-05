import TeachersSection from "@/app/components/TeachersSection/TeachersSection";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Our Teachers",
};

export default async function TeachersPage() {
    return (
        <TeachersSection />
    );
};