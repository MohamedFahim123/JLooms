export interface FormAuthInputs {
    // Auth Inputs
    email?: string;
    password?: string;
    confirmPassword?: string;
    admin_name?: string;
    school_name?: string;
    school_email?: string;
    official_registration?: File;
    commercial_certificate?: File;
    otp?: string;

    // Teacher Inputs
    teacher_name?: string;
    teacher_gender?: string;
    teacher_email?: string;
    teacher_password?: string;
    teacher_phone?: string;
    teacher_profile?: File;


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