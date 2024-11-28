import AddTeacherForm from '@/app/components/AddTeacherForm/AddTeacherForm';
import DashBoardPageHead from '@/app/components/DashBoardPageHead/DashBoardPageHead';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Add New Teacher",
};

export default function AddNewTeacherPage() {
    return (
        <div className="mx-auto p-6 bg-white rounded-lg">
            <DashBoardPageHead text='Add Teacher' />
            <AddTeacherForm />
        </div>
    );
};