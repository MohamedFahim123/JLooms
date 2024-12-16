import ParentsSection from '@/app/components/ParentsSection/ParentsSection';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: "Parents",
};

export default function ParentsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ParentsSection />
        </Suspense>
    );
};