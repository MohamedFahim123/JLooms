import Link from 'next/link';
import React from 'react';

interface MainDashBoardProps {
    text: string;
    link: string;
};

export default function MainDashBoardBtn({ text, link }: MainDashBoardProps) {
    return (
        <>
            {
                text && (
                    <Link href={link ? link : ''} className="bg-indigo-500 transition-all duration-300 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded">
                        {text}
                    </Link>
                )
            }
        </>
    );
};