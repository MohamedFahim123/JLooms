export interface FormAuthInputs {
    email?: string;
    password?: string;
    confirmPassword?: string;
    admin_name?: string;
    school_name?: string;
    school_email?: string;
    official_registration?: File;
    commercial_certificate?: File;
    otp?: string;
};

interface Pattern {
    value: RegExp;
    message: string;
};

interface Validation {
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