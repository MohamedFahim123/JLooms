import DashBoardTable from '@/app/components/DashBoardTable/DashBoardTable';
import React from 'react';
import { Table } from '../utils/interfaces';
import teacher from '../../imgs/teachers/teacher1.png';
import { Metadata } from 'next';
import DashBoardPageHead from '@/app/components/DashBoardPageHead/DashBoardPageHead';
import DashBoardFilterations from '@/app/components/DashBoardFilterations/DashBoardFilterations';

export const metadata: Metadata = {
    title: "Our Students",
};

export const students: Table[] = [
    { id: 1, classDetails: '', address: '1th elhoria streat ,zefta ,egypt', email: 'student@email.com', phone: '0123 456 789', age: 4, gender: 'male', image: teacher.src, name: 'Kristin Watson', subject: 'Multiple Subjects', class: 'Multiple Classes', parents: 'Mother and Father' },
    { id: 2, classDetails: '', address: '1th elhoria streat ,zefta ,egypt', email: 'student@email.com', phone: '0123 456 789', age: 4, gender: 'female', image: teacher.src, name: 'Marvin McKinney', subject: 'French', class: 'JSS 3', parents: 'Mother and Father' },
    { id: 3, classDetails: '', address: '1th elhoria streat ,zefta ,egypt', email: 'student@email.com', phone: '0123 456 789', age: 3, gender: 'male', image: teacher.src, name: 'Jane Cooper', subject: 'Maths', class: 'JSS 3', parents: 'Mother and Father' },
    { id: 4, classDetails: '', address: '1th elhoria streat ,zefta ,egypt', email: 'student@email.com', phone: '0123 456 789', age: 3, gender: 'female', image: teacher.src, name: 'Cody Fisher', subject: 'Multiple Subjects', class: 'SS 3', parents: 'Mother and Father' },
    { id: 5, classDetails: '', address: '1th elhoria streat ,zefta ,egypt', email: 'student@email.com', phone: '0123 456 789', age: 4, gender: 'male', image: teacher.src, name: 'Bessie Cooper', subject: 'Social Studies', class: 'Multiple Classes', parents: 'Mother and Father' },
    { id: 6, classDetails: '', address: '1th elhoria streat ,zefta ,egypt', email: 'student@email.com', phone: '0123 456 789', age: 4, gender: 'female', image: teacher.src, name: 'Leslie Alexander', subject: 'Home Economics', class: 'SS 3', parents: 'Mother and Father' },
    { id: 7, classDetails: '', address: '1th elhoria streat ,zefta ,egypt', email: 'student@email.com', phone: '0123 456 789', age: 3, gender: 'male', image: teacher.src, name: 'Guy Hawkins', subject: 'Multiple Subjects', class: 'JSS 1', parents: 'Mother and Father' },
    { id: 8, classDetails: '', address: '1th elhoria streat ,zefta ,egypt', email: 'student@email.com', phone: '0123 456 789', age: 3, gender: 'female', image: teacher.src, name: 'Theresa Webb', subject: 'Psychology', class: 'JSS 3', parents: 'Mother and Father' },
    { id: 9, classDetails: '', address: '1th elhoria streat ,zefta ,egypt', email: 'student@email.com', phone: '0123 456 789', age: 4, gender: 'male', image: teacher.src, name: 'Jerome Bell', subject: 'Physics', class: 'JSS 4', parents: 'Mother and Father' },
    { id: 10, classDetails: '', address: '1th elhoria streat ,zefta ,egypt', email: 'student@email.com', phone: '0123 456 789', age: 4, gender: 'female', image: teacher.src, name: 'Savannah Nguyen', subject: 'Accounting', class: 'JSS 4', parents: 'Mother and Father' },
    { id: 11, classDetails: '', address: '1th elhoria streat ,zefta ,egypt', email: 'student@email.com', phone: '0123 456 789', age: 3, gender: 'male', image: teacher.src, name: 'Wade Warren', subject: 'C.R.S', class: 'JSS 5', parents: 'Mother and Father' },
];

export default function StudentsPage() {
    const tableCells: string[] = ['name', 'class', 'Parent'];

    return (
        <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <DashBoardPageHead text='Students' btnText='Add Student' haveBtn={true} btnLink='/dashboard/students/add-new-student' />
            <DashBoardFilterations placeHolder="Search for a Student by name or email" />
            <div className="overflow-x-auto">
                <DashBoardTable tableData={students} tableCells={tableCells} currPage={'students'} />
            </div>
        </div>
    );
};