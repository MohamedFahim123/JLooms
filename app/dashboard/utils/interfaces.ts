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
    has_parents?: boolean;
    code?: string;
    relation?: string;
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
    assignParentToStudent: string;
    allParents: string;
    addParent: string;
    singleParent: string;
    filterParents: string;
    filterParentsByCode: string;
    removeParentFromStudent: string;
    deleteParent: string;
    allowedTeachers: string;
    removeOptionFromClass: string;
    updateClassOptionTeacher: string;
};
export interface teacherInterface {
    id: number | string;
    class_option_teacher_id: number | string;
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