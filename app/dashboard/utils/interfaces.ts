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
  number_of_students?: number;
  floor?: number;
  locale?: string;
  birth_date?: string;
  class?: string;
  has_parents?: boolean;
  code?: string;
  relation?: string;
  date_from?: string;
  date_to?: string;
  type?: string;
  category?: string;
  sub_category?: string;
  activity?: string;
}
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
  removeActionFromClass: string;
  removeActivityFromClass: string;
  assignTeacherToClass: string;
  addActionToClass: string;
  addActivityToClass: string;
  editActionInsideClass: string;
  editActivityInsideClass: string;
  removeTeacherFromClass: string;
  allCurriculums: string;
  addCurriculum: string;
  employees: string;
  filterEmployees: string;
  addEmployee: string;
  singleEmployee: string;
  deleteEmployee: string;
  updateEmployeeStatus: string;
  allRoles: string;
  addRole: string;
  deleteRole: string;
  filterRoles: string;
  singleRole: string;
  allPermissions: string;
  removeCurriculum: string;
  singleCurriculum: string;
  curriculumsFilter: string;
}
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
  activities: Activity[];
}

export interface Action {
  id: number;
  name: string;
  action: string;
  icon: string;
}

export interface Activity {
  id: number;
  name: string;
  icons: string;
}
