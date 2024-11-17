import { baseUrl } from "@/app/utils/baseUrl";

interface authEndPointsInterface {
    login: string;
    register1: string;
    register2: string;
    register3: string;
    resetPassword: string;
    forgetPassword: string;
};

export const authEndPoints : authEndPointsInterface = {
    login: `${baseUrl}/auth/login`,
    register1: `${baseUrl}/auth/register/1`,
    register2: `${baseUrl}/auth/register/1`,
    register3: `${baseUrl}/auth/register/1`,
    resetPassword: `${baseUrl}/auth/resetPassword`,
    forgetPassword: `${baseUrl}/auth/forgotPassword`,
};