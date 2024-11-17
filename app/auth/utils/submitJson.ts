import { toast } from "react-toastify";
import { authEndPoints } from "./authEndPoints";
import { FormAuthInputs } from "./interfaces";
import axios from "axios";
import { UseFormSetError } from "react-hook-form";

type AuthEndPointType = keyof typeof authEndPoints;

export const handleApplication_JsonData = async (data: FormAuthInputs, type: AuthEndPointType, setError: UseFormSetError<FormAuthInputs>) => {
    const loadingToastId = toast.loading('Loading...');
    try {
        const endPoint = authEndPoints[type];
        const response = await axios.post(endPoint, data, {
            headers: {
                'Content-Type': 'application/json',
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