'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

interface MainDashBoardProps {
    text: string;
    link: string;
};

export default function MainDashBoardBtn({ text, link }: MainDashBoardProps) {
    const router = useRouter();
    return (
        <>
            {
                text && (
                    <button onClick={()=> link && router.push(link)} className="bg-indigo-500 transition-all duration-300 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded">
                        {text}
                    </button>
                )
            }
        </>
    );
};