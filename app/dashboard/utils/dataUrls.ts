import { baseUrl } from "@/app/utils/baseUrl";
import { DATAURLSINTERFACE } from "./interfaces";
import Cookies from "js-cookie";

export const token = Cookies.get('JLOOMS_TOKEN');

export const dataURLS: DATAURLSINTERFACE = {
    teachers: `${baseUrl}/school/all-teachers`,
    addTeacher: `${baseUrl}/school/store-teacher`,
    filterTeachers: `${baseUrl}/school/filter-teachers`,
    students: `${baseUrl}/school/all-students`,
    classes: `${baseUrl}/school/all-classes`,
};