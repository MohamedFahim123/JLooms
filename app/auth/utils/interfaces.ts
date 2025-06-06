export interface FormAuthInputs {
  // Auth Inputs
  email?: string;
  password?: string;
  password_confirmation?: string;
  admin_name?: string;
  school_id?: string;
  name?: string;
  official_registeration?: File;
  commercial_certification?: File;
  otp?: string;
  new_password?: string;
  new_password_confirmation?: string;

  // Teacher Inputs
  gender?: string;
  phone?: string;
  image?: File;

  // Student Inputs
  code?: string;
  birth_date?: string;
  blood_type?: string;
  grade_id?: string;
  parent_id?: string;
  type?: string;
  class_id?: string;
  student_id?: string;

  // Class Inputs
  name_en?: string;
  actions?: string[];
  activities?: string[];

  class?: string;
  topic?: string;
  milestoneCustom?: string;

  address_ar?: string;
  address_en?: string;
  description_ar?: string;
  description_en?: string;
  country_id?: string;
  city_id?: string;

  permission_id: number[];

  // employee
  title?: string;
  role_id?: string;
  user_type?: string;

  // curriculum
  category_id?: string;
  type_id?: string;
  date_from?: string;
  date_to?: string;
  activity_id?: string;
  curriculum_sub_category_id?: string;
  milestones?: [];
  [key: `curriculum_sub_category_id_${string}`]: string;
}

interface Pattern {
  value: RegExp;
  message: string;
}

export interface Validation {
  required?: string;
  pattern?: Pattern;
}

export interface Input {
  type: string;
  name: keyof FormAuthInputs;
  lableName: string;
  placeholder: string;
  validation: Validation;
}
