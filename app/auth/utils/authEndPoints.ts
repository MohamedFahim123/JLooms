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
  employee_logout: string;
  employee_login: string;
  employee_resetPassword: string;
  employee_forgetPassword: string;
}

export const authEndPoints: authEndPointsInterface = {
  login: `${baseUrl}/school/login`,
  logout: `${baseUrl}/school/logout`,
  employee_login: `${baseUrl}/school/employee-login`,
  employee_logout: `${baseUrl}/school/employee-logout`,
  prevStep: `${baseUrl}/school/pervious-step`,
  register1: `${baseUrl}/school/register-step-one`,
  register2: `${baseUrl}/school/register-step-two`,
  register3: `${baseUrl}/school/register-step-three`,
  resetPassword: `${baseUrl}/school/reset-password`,
  employee_resetPassword: `${baseUrl}/school/employee-reset-password`,
  forgetPassword: `${baseUrl}/school/forget-password`,
  employee_forgetPassword: `${baseUrl}/school/employee-forget-password`,
};
