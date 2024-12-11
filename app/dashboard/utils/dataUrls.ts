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
};