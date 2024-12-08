export interface Table {
    parents?: string;
    name?: string;
    subject?: string;
    class?: string;
    status?: string;
    image?: string ;
    id?: number;
    age?: number;
    gender?: string;
    phone?: string;
    address?: string;
    email?: string;
    classDetails?: string;
    className?: string;
    numberOfStudents?: number,
    floor?: number;
    locale?: string;
};
export interface DATAURLSINTERFACE {
    teachers: string;
    singleTeacher: string;
    addTeacher: string;
    students: string;
    classes: string;
    filterTeachers: string;
};
export interface teacherInterface {
    id: number | string;
    name: string;
    email: string;
    phone: string;
    image: string;
    status: string;
    gender: string;
    locale: string;
}