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
    student_name?: string;
    student_id?: string;
    student_class?: string;
    student_gender?: string;
    student_email?: string;
    student_password?: string;
    student_phone?: string;
    student_profile?: string;

    name_en?: string;
    actions?: {
        action: string;
    };
    activities?: {
        activity: string;
    };
    options?: {
        id: string | number;
        type: string;
    }[];
};

interface Pattern {
    value: RegExp;
    message: string;
};

export interface Validation {
    required?: string;
    pattern?: Pattern;
};

export interface Input {
    type: string;
    name: keyof FormAuthInputs;
    lableName: string;
    placeholder: string;
    validation: Validation;
};