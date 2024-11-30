import { Table } from "./interfaces";
import teacher from '../../imgs/teachers/teacher1.png';

export const classes: Table[] = [
    { id: 1, className: 'KG-1', numberOfStudents: 20, floor: 1},
    { id: 2, className: 'KG-2', numberOfStudents: 20, floor: 1},
    { id: 3, className: 'Class-1', numberOfStudents: 20, floor: 2},
    { id: 4, className: 'Class-2', numberOfStudents: 20, floor: 2},
    { id: 5, className: 'Class-3', numberOfStudents: 20, floor: 2},
    { id: 6, className: 'Class-4', numberOfStudents: 20, floor: 3},
    { id: 7, className: 'Class-5', numberOfStudents: 20, floor: 3},
    { id: 8, className: 'Class-6', numberOfStudents: 20, floor: 3},
    { id: 9, className: 'Primary-1', numberOfStudents: 20, floor: 4},
    { id: 10, className: 'Primary-2', numberOfStudents: 20, floor: 4},
    { id: 11, className: 'Primary-3', numberOfStudents: 20, floor: 4},
];

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

export const teachers: Table[] = [
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
