import { toast } from "react-toastify";
import { authEndPoints } from "./authEndPoints";
import { FormAuthInputs } from "./interfaces";
import axios from "axios";
import { UseFormSetError } from "react-hook-form";

type AuthEndPointType = keyof typeof authEndPoints;

export const handleMultiPartFormData = async (data: FormAuthInputs, type: AuthEndPointType , setError: UseFormSetError<FormAuthInputs>) => {
    const loadingToastId = toast.loading('Loading...');
    try {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            const value = data[key as keyof FormAuthInputs];
            if (value instanceof File) {
                formData.append(key, value);
            } else if (typeof value === 'object' && value !== null) {
                formData.append(key, JSON.stringify(value));
            } else if (value !== undefined && value !== null) {
                formData.append(key, String(value));
            };
        });
        const endPoint = authEndPoints[type];
        const response = await axios.post(endPoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            }
        });
        toast.update(loadingToastId, {
            render: response?.data?.message || 'Request succeeded!',
            type: 'success',
            isLoading: false,
            autoClose: 1500,
        });
    } catch (error) {
        const errorMessage = axios.isAxiosError(error)
            ? error.response?.data?.message || 'Something went wrong!'
            : 'An unexpected error occurred.';
        toast.update(loadingToastId, {
            render: errorMessage,
            type: 'error',
            isLoading: false,
            autoClose: 2000,
        });
        if (axios.isAxiosError(error) && error?.response?.data?.errors) {
            const errorDetails = error.response.data.errors;
            Object.entries(errorDetails).forEach(([field, messages]) => {
                const messageArray = Array.isArray(messages) ? messages : [messages];
                setError(field as keyof FormAuthInputs, { 
                    type: 'manual', 
                    message: messageArray[0]
                });
                toast.error(messageArray[0], {
                    autoClose: 3000,
                });
            });
        };
    };
};