import { Input } from "./interfaces";

export const CustomEmailInput: Input = {
    lableName: "E-mail",
    name: "email",
    placeholder: "Enter your email address",
    type: "email",
    validation: {
        required: 'Email is Required',
        pattern: {
            message: 'Please enter a valid email address',
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        },
    },
};

export const CustomPasswordInput: Input = {
    lableName: "Password",
    name: "password",
    placeholder: "*********",
    type: "password",
    validation: {
        required: 'Password is Required',
    },
};

export const CustomConfirmPasswordInput: Input = {
    lableName: "Confirm Password",
    name: "confirmPassword",
    placeholder: "*********",
    type: "password",
    validation: {
        required: 'Password Confirmation is Required',
    },
};

export const CustomSchoolEmailInput: Input = {
    lableName: "School E-mail",
    name: "email",
    placeholder: "Enter the school email",
    type: "email",
    validation: {
        required: 'School Email is Required',
        pattern: {
            message: 'Please enter a valid email address',
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        },
    },
};

export const CustomNameAdminInput: Input = {
    lableName: "Admin Name",
    name: "admin_name",
    placeholder: "Enter the name of admin",
    type: "text",
    validation: {
        required: 'Admin Name is Required'
    },
};

export const CustomNameSchoolInput: Input = {
    lableName: "School Name",
    name: "school_name",
    placeholder: "Enter the name of school",
    type: "text",
    validation: {
        required: 'School Name is Required',
    },
};

export const CustomOtpInput: Input = {
    lableName: "OTP",
    name: "otp",
    placeholder: "Enter OTP",
    type: "text",
    validation: {
        required: 'OTP is Required',
    },
};

export const CustomFileOfficialInput: Input = {
    lableName: "Official Registration",
    name: "official_registration",
    placeholder: "Official Registration",
    type: "file",
    validation: {
        required: 'Official Registration is Required',
    },
};

export const CustomFileCommercialInput: Input = {
    lableName: "Commercial Certificate",
    name: "commercial_certificate",
    placeholder: "Commercial Certificate",
    type: "file",
    validation: {
        required: 'Commercial Certificate is Required',
    },
};