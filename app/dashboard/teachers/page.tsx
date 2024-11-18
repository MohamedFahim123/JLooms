import DashBoardTable from '@/app/components/DashBoardTable/DashBoardTable';
import React from 'react';
import { Teacher } from '../utils/interfaces';
import teacher from '../../imgs/teachers/teacher1.png';
import { Metadata } from 'next';
import DashBoardPageHead from '@/app/components/DashBoardPageHead/DashBoardPageHead';
import DashBoardFilterations from '@/app/components/DashBoardFilterations/DashBoardFilterations';

export const metadata: Metadata = {
    title: "Our Teachers",
};

export const teachers: Teacher[] = [
    { id: 1, classDetails: '' ,address: '1th elhoria streat ,zefta ,egypt',email: 'teacher@email.com',phone: '0123 456 789',age: 34 , gender: 'male',image: teacher.src, name: 'Kristin Watson', subject: 'Multiple Subjects', class: 'Multiple Classes', status: 'Active' },
    { id: 2, classDetails: '' ,address: '1th elhoria streat ,zefta ,egypt',email: 'teacher@email.com',phone: '0123 456 789',age: 34 , gender: 'female',image: teacher.src, name: 'Marvin McKinney', subject: 'French', class: 'JSS 3', status: 'Active' },
    { id: 3, classDetails: '' ,address: '1th elhoria streat ,zefta ,egypt',email: 'teacher@email.com',phone: '0123 456 789',age: 34 , gender: 'male',image: teacher.src, name: 'Jane Cooper', subject: 'Maths', class: 'JSS 3', status: 'Active' },
    { id: 4, classDetails: '' ,address: '1th elhoria streat ,zefta ,egypt',email: 'teacher@email.com',phone: '0123 456 789',age: 34 , gender: 'female',image: teacher.src, name: 'Cody Fisher', subject: 'Multiple Subjects', class: 'SS 3', status: 'Sick Leave' },
    { id: 5, classDetails: '' ,address: '1th elhoria streat ,zefta ,egypt',email: 'teacher@email.com',phone: '0123 456 789',age: 34 , gender: 'male',image: teacher.src, name: 'Bessie Cooper', subject: 'Social Studies', class: 'Multiple Classes', status: 'Active' },
    { id: 6, classDetails: '' ,address: '1th elhoria streat ,zefta ,egypt',email: 'teacher@email.com',phone: '0123 456 789',age: 34 , gender: 'female',image: teacher.src, name: 'Leslie Alexander', subject: 'Home Economics', class: 'SS 3', status: 'Maternity Leave' },
    { id: 7, classDetails: '' ,address: '1th elhoria streat ,zefta ,egypt',email: 'teacher@email.com',phone: '0123 456 789',age: 34 , gender: 'male',image: teacher.src, name: 'Guy Hawkins', subject: 'Multiple Subjects', class: 'JSS 1', status: 'Active' },
    { id: 8, classDetails: '' ,address: '1th elhoria streat ,zefta ,egypt',email: 'teacher@email.com',phone: '0123 456 789',age: 34 , gender: 'female',image: teacher.src, name: 'Theresa Webb', subject: 'Psychology', class: 'JSS 3', status: 'Active' },
    { id: 9, classDetails: '' ,address: '1th elhoria streat ,zefta ,egypt',email: 'teacher@email.com',phone: '0123 456 789',age: 34 , gender: 'male',image: teacher.src, name: 'Jerome Bell', subject: 'Physics', class: 'JSS 4', status: 'Active' },
    { id: 10, classDetails: '' ,address: '1th elhoria streat ,zefta ,egypt',email: 'teacher@email.com',phone: '0123 456 789',age: 34 , gender: 'female',image: teacher.src, name: 'Savannah Nguyen', subject: 'Accounting', class: 'JSS 4', status: 'Active' },
    { id: 11, classDetails: '' ,address: '1th elhoria streat ,zefta ,egypt',email: 'teacher@email.com',phone: '0123 456 789',age: 34 , gender: 'male',image: teacher.src, name: 'Wade Warren', subject: 'C.R.S', class: 'JSS 5', status: 'Active' },
];

export default function TeachersPage() {
    const tableCells: string[] = ['name', 'subject', 'class', 'status'];

    return (
        <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <DashBoardPageHead text='Teachers' btnText='Add Teacher' haveBtn={true} btnLink='/dashboard/teachers/add-new-teacher' />
            <DashBoardFilterations />
            <div className="overflow-x-auto">
                <DashBoardTable tableData={teachers} tableCells={tableCells} />
            </div>
        </div>
    );
};