import StudentsSection from '@/app/components/StudentsSection/StudentsSection';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: "Our Students",
};

const StudentsPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StudentsSection />
        </Suspense>
    );
};
export default StudentsPage;