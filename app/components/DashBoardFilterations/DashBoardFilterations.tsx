'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DashBoardFilterationsProps {
    placeHolder?: string;
    page?: string;
};

export default function DashBoardFilterations({ placeHolder,page }: DashBoardFilterationsProps) {
    const router = useRouter();
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [debouncedName, setDebouncedName] = useState(name);
    const [debouncedStatus, setDebouncedStatus] = useState(status);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedName(name);
        }, 1000);
        return () => clearTimeout(handler);
    }, [name]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedStatus(status);
        }, 1000);
        return () => clearTimeout(handler);
    }, [status]);

    useEffect(() => {
        const filters: Record<string, string> = {};
        if (debouncedStatus) filters.status = debouncedStatus;
        if (debouncedName) filters.name = debouncedName;

        const queryParams = new URLSearchParams(filters).toString();
        if(page === 'teachers'){
            router.push(`/dashboard/teachers?${queryParams}`);
        };
    }, [debouncedName, status, router, debouncedStatus, page]);

    return (
        <div className="px-6 py-4">
            <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg py-2 px-3 w-full md:w-auto focus:outline-none focus:border-indigo-500"
                >
                    <option value="">Status</option>
                    <option value="active">Active</option>
                    <option value="deactive">Deactive</option>
                </select>
                <div className="relative w-full md:w-auto">
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={placeHolder}
                        className="w-full md:w-64 border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:border-indigo-500"
                    />
                    <svg
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M10 2a8 8 0 0 1 8 8c0 1.74-.57 3.37-1.53 4.68l5.85 5.85a1 1 0 1 1-1.42 1.42l-5.85-5.85A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 0 12A6 6 0 0 0 10 4z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};