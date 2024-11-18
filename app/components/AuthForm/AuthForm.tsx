'use client'
import { FormAuthInputs, Input } from "@/app/auth/utils/interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from './authForm.module.css';
import AuthBtnSubmit from "../AuthBtnSubmit/AuthBtnSubmit";
import CustomeInput from "../CustomInput/CustomeInput";
import { authEndPoints } from "@/app/auth/utils/authEndPoints";
import { handleApplication_JsonData } from "@/app/auth/utils/submitJson";
import { handleMultiPartFormData } from "@/app/auth/utils/submitFormData";
import Link from "next/link";
import { useEffect } from "react";
import CustomFileInput from "../CustomFileInput/CustomFileInput";

type AuthType = keyof typeof authEndPoints;

interface AuthFormProps {
    type: AuthType;
    inputs: Input[];
};

export default function AuthForm({ type, inputs }: AuthFormProps) {
    const { register, setError, watch, clearErrors, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormAuthInputs>();

    const watchValues = watch();

    const onSubmit: SubmitHandler<FormAuthInputs> = (data: FormAuthInputs) => {
        if (type === 'login' || type === 'resetPassword' || type === 'forgetPassword' || type === 'register1' || type === 'register2') {
            handleApplication_JsonData(data, type, setError);
        } else if (type === 'register3') {
            handleMultiPartFormData(data, type, setError);
        };
    };

    useEffect(() => {
        const password = watch('password');
        const confirmPassword = watch('confirmPassword');
        if (password !== confirmPassword) {
            setError('confirmPassword', { message: 'Passwords do not match' });
        } else {
            clearErrors("confirmPassword");
        };
    }, [watch, setError, clearErrors]);
    

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.authForm}`}>
            {
                inputs?.map(input =>
                    input?.type === 'file' ?
                        (
                            <CustomFileInput
                                key={input.name}
                                name={input.name}
                                placeHolder={input.placeholder}
                                register={register}
                                error={errors}
                                type={input.type}
                                lable={input.lableName}
                                id={`${type}${input.name}`}
                                validation={input.validation}
                                fileUploaded={(watchValues[input.name] as unknown as FileList)?.length > 0}
                            />
                        )
                        :
                        (
                            <CustomeInput
                                key={input.name}
                                name={input.name}
                                placeHolder={input.placeholder}
                                register={register}
                                error={errors}
                                type={input.type}
                                lable={input.lableName}
                                id={`${type}${input.name}`}
                                validation={input.validation}
                            />
                        )
                )
            }
            {
                type === 'login' &&
                <>
                    <div className="flex justify-between items-start mb-5">
                        <div className="flex items-center h-5">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-500">Remember me</label>
                        </div>
                        <Link href={'/auth/forget-password'} className="text-indigo-600 font-500 text-sm">Forget Password?</Link>
                    </div>
                </>
            }
            <AuthBtnSubmit isSubmitting={isSubmitting} type={
                (type === 'register1' && 'Next Step') ||
                (type === 'register2' && 'Next Step') ||
                ((type === 'register3' || type === 'forgetPassword' || type === 'resetPassword') && 'Submit') ||
                type
            } />
        </form>
    );
};
