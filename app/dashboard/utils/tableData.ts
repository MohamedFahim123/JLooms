import { Table } from "./interfaces";
import teacher from '../../imgs/teachers/teacher1.png';

export const classes: Table[] = [
    { id: 1, name: 'KG-1', number_of_students: 20, floor: 1},
    { id: 2, name: 'KG-2', number_of_students: 20, floor: 1},
    { id: 3, name: 'Class-1', number_of_students: 20, floor: 2},
    { id: 4, name: 'Class-2', number_of_students: 20, floor: 2},
    { id: 5, name: 'Class-3', number_of_students: 20, floor: 2},
    { id: 6, name: 'Class-4', number_of_students: 20, floor: 3},
    { id: 7, name: 'Class-5', number_of_students: 20, floor: 3},
    { id: 8, name: 'Class-6', number_of_students: 20, floor: 3},
    { id: 9, name: 'Primary-1', number_of_students: 20, floor: 4},
    { id: 10, name: 'Primary-2', number_of_students: 20, floor: 4},
    { id: 11, name: 'Primary-3', number_of_students: 20, floor: 4},
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