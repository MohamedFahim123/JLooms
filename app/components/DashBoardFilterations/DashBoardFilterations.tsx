import React from 'react'

export default function DashBoardFilterations() {
    return (
        <div className="px-6 py-4">
            <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
                <select className="border border-gray-300 rounded-lg py-2 px-3 w-full md:w-auto focus:outline-none focus:border-indigo-500">
                    <option value="">Filter</option>
                    <option value="active">Active</option>
                    <option value="sick-leave">Sick Leave</option>
                    <option value="maternity-leave">Maternity Leave</option>
                </select>
                <div className="relative w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Search for a teacher by name or email"
                        className="w-full md:w-64 border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:border-indigo-500"
                    />
                    <svg
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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