import { baseUrl } from "@/app/utils/baseUrl";
import { DATAURLSINTERFACE } from "./interfaces";
import Cookies from "js-cookie";

export const token = Cookies.get('SERVER_JLOOMS_TOKEN');

export const dataURLS: DATAURLSINTERFACE = {
    teachers: `${baseUrl}/school/all-teachers`,
    singleTeacher: `${baseUrl}/school/show-teacher`,
    updateTeacherStatus: `${baseUrl}/school/update-teacher-status`,
    addTeacher: `${baseUrl}/school/store-teacher`,
    filterTeachers: `${baseUrl}/school/filter-teachers`,
    deleteTeacher: `${baseUrl}/school/delete-teacher`,
    students: `${baseUrl}/school/all-students`,
    classes: `${baseUrl}/school/all-classes`,
    getActions: `${baseUrl}/school/actions`,
    getActivities: `${baseUrl}/school/activities`,
    addNewClass: `${baseUrl}/school/store-class`,
    getAllClasses: `${baseUrl}/school/all-classes`,
    filterClasses: `${baseUrl}/school/filter-classes`,
    deleteClass: `${baseUrl}/school/delete-class`,
    singleClass: `${baseUrl}/school/show-class`,
    addStudent: `${baseUrl}/school/store-student`,
    allStudents: `${baseUrl}/school/all-students`,
    filterStudents: `${baseUrl}/school/filter-students`,
    singleStudent: `${baseUrl}/school/show-student`,
    deleteStudent: `${baseUrl}/school/delete-student`,
    assignStudentToClass: `${baseUrl}/school/assign-student-to-class`,
    assignParentToStudent: `${baseUrl}/school/assign-parent-to-student`,
    removeParentFromStudent: `${baseUrl}/school/remove-parent-from-student`,
    allParents: `${baseUrl}/school/parents`,
    singleParent: `${baseUrl}/school/show-parent`,
    addParent: `${baseUrl}/school/store-parent`,
    deleteParent: `${baseUrl}/school/delete-parent`,
    filterParentsByCode: `${baseUrl}/school/filter-parents`,
    filterParents: `${baseUrl}/school/search-parents`,
    allowedTeachers: `${baseUrl}/school/allowed-teachers`,
    addOptionToClass: `${baseUrl}/school/add-class-option`,
    editOptionInsideClass: `${baseUrl}/school/update-class-option`,
    removeOptionFromClass: `${baseUrl}/school/delete-class-option`,
    assignTeacherToClassOption: `${baseUrl}/school/assign-teachers`,
};