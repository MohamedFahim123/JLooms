interface Parent {
    id: number;
    name: string;
}
export interface Table {
    parents?: string;
    name?: string;
    subject?: string;
    class_name?: string;
    status?: string;
    image?: string;
    id?: number;
    age?: number;
    gender?: string;
    phone?: string;
    address?: string;
    email?: string;
    classDetails?: string;
    number_of_students?: number,
    floor?: number;
    locale?: string;
    birth_date?: string;
    class?: string;
    parent?: Parent[];
};
export interface DATAURLSINTERFACE {
    teachers: string;
    singleTeacher: string;
    addTeacher: string;
    students: string;
    classes: string;
    filterTeachers: string;
    updateTeacherStatus: string;
    deleteTeacher: string;
    getActions: string;
    getActivities: string;
    addNewClass: string;
    getAllClasses: string;
    deleteClass: string;
    filterClasses: string;
    singleClass: string;
    addStudent: string;
    allStudents: string;
    filterStudents: string;
    singleStudent: string;
    deleteStudent: string;
    assignStudentToClass: string;
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
};

export interface Action {
    id: number;
    name: string;
    icon: string;
};

export interface Activity {
    id: number;
    name: string;
    icons: string;
};