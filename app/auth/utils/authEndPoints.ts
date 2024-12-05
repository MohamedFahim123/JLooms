import { baseUrl } from "@/app/utils/baseUrl";

interface authEndPointsInterface {
    login: string;
    logout: string;
    register1: string;
    prevStep: string;
    register2: string;
    register3: string;
    resetPassword: string;
    forgetPassword: string;
};

export const authEndPoints : authEndPointsInterface = {
    login: `${baseUrl}/school/login`,
    logout: `${baseUrl}/school/logout`,
    prevStep: `${baseUrl}/school/pervious-step`,
    register1: `${baseUrl}/school/register-step-one`,
    register2: `${baseUrl}/school/register-step-two`,
    register3: `${baseUrl}/school/register-step-three`,
    resetPassword: `${baseUrl}/school/reset-password`,
    forgetPassword: `${baseUrl}/school/forget-password`,
};