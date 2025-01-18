import { baseUrl } from "@/app/utils/baseUrl";
import axios from "axios";
import Cookies from "js-cookie";
import { UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";
import { authEndPoints } from "./authEndPoints";
import { FormAuthInputs } from "./interfaces";
import { setServerCookie } from "./storeTokenOnServer";

type AuthEndPointType = keyof typeof authEndPoints;

export const handleApplication_JsonData = async (
  data: FormAuthInputs,
  type: AuthEndPointType,
  setError: UseFormSetError<FormAuthInputs>
) => {
  const loadingToastId: string | number = toast.loading("Loading...");
  if (type === "login") {
    await axios.get(`${baseUrl}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  }

  try {
    const endPoint = authEndPoints[type];
    const XSRFTOKEN = Cookies.get("XSRF-TOKEN");
    const response = await axios.post(endPoint, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(XSRFTOKEN ? { "X-XSRF-TOKEN": XSRFTOKEN } : {}),
      },
      withCredentials: true,
    });

    toast.update(loadingToastId, {
      render: response?.data?.message || "Request succeeded!",
      type: "success",
      isLoading: false,
      autoClose: 1500,
    });

    const { token, school } = response?.data?.data || {};
    if (token) {
      setServerCookie("SERVER_JLOOMS_TOKEN", token);
      Cookies.set("CLIENT_JLOOMS_TOKEN", token, { expires: 1 });
    }

    if (school?.id) {
      handleRegistrationCookies(type, school.id);
    }

    return "success";
  } catch (error) {
    return handleError(error, setError, loadingToastId);
  }
};

function handleRegistrationCookies(type: AuthEndPointType, schoolId: string) {
  Cookies.set("school_registeration_id", schoolId, { expires: 7 });

  const stepMapping: Record<AuthEndPointType, string> = {
    register1: "2",
    register2: "3",
    login: "",
    logout: "",
    prevStep: "",
    register3: "",
    resetPassword: "",
    forgetPassword: "",
  };

  if (stepMapping[type]) {
    Cookies.set("current_step", stepMapping[type], { expires: 7 });
  }
}

function handleError(
  error: unknown,
  setError: UseFormSetError<FormAuthInputs>,
  toastId: string | number
) {
  const errorMessage = axios.isAxiosError(error)
    ? error.response?.data?.message || "Something went wrong!"
    : "An unexpected error occurred.";

  toast.update(toastId, {
    render: errorMessage,
    type: "error",
    isLoading: false,
    autoClose: 2000,
  });

  if (axios.isAxiosError(error) && error?.response?.data?.errors) {
    const errorDetails = error.response.data.errors;
    Object.entries(errorDetails).forEach(([field, messages]) => {
      const messageArray = Array.isArray(messages) ? messages : [messages];
      setError(field as keyof FormAuthInputs, {
        type: "manual",
        message: messageArray[0],
      });
      toast.error(messageArray[0], {
        autoClose: 3000,
      });
    });
  }

  return "fail";
}
