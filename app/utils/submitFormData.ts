import { toast } from "react-toastify";
import axios from "axios";
import { UseFormSetError } from "react-hook-form";
import { FormAuthInputs } from '../auth/utils/interfaces';
import Cookies from "js-cookie";
import { FormDefaultValues } from "../components/AddNewClassForm/AddNewClassForm";

export const handleMultiPartWebSiteFormData = async (
    data: FormAuthInputs,
    endPoint: string,
    setError: UseFormSetError<FormAuthInputs> | UseFormSetError<FormDefaultValues>,
    reset: () => void
) => {
    const loadingToastId = toast.loading('Loading...');
    const token = Cookies.get('CLIENT_JLOOMS_TOKEN');

    try {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            const value = data[key as keyof FormAuthInputs];
            if (key === 'image') {
                if (value instanceof FileList && value.length > 0) {
                    formData.append(key, value[0]);
                } else {
                    formData.append(key, '');
                };
            }
            else if (typeof value === 'object' && value !== null) {
                formData.append(key, JSON.stringify(value));
            }
            else if (value !== undefined && value !== null) {
                formData.append(key, String(value));
            };
        });
        const response = await axios.post(endPoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
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
