import { UseFormSetError } from "react-hook-form";
import { FormAuthInputs } from "../auth/utils/interfaces";
import { FormDefaultValues } from "../components/AddNewClassForm/AddNewClassForm";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";

export const submitApplicationJson = async (
    data: FormAuthInputs,
    endPoint: string,
    setError: UseFormSetError<FormAuthInputs> | UseFormSetError<FormDefaultValues>,
    reset: () => void,
) => {
    const loadingToastId = toast.loading('Loading...');
    const token = Cookies.get('CLIENT_JLOOMS_TOKEN');
    try {

        const response = await axios.post(endPoint, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        toast.update(loadingToastId, {
            render: response?.data?.message || 'Request succeeded!',
            type: 'success',
            isLoading: false,
            autoClose: 1500,
        });

        reset();
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

                setError(field as keyof (FormAuthInputs | FormDefaultValues), {
                    type: 'manual',
                    message: messageArray[0],
                });

                toast.error(messageArray[0], {
                    autoClose: 3000,
                });
            });
        };
    };
};