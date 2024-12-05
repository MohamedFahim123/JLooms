'use client';

import { FormAuthInputs, Input } from "@/app/auth/utils/interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from './authForm.module.css';
import AuthBtnSubmit from "../AuthBtnSubmit/AuthBtnSubmit";
import CustomeInput from "../CustomInput/CustomeInput";
import { authEndPoints } from "@/app/auth/utils/authEndPoints";
import Link from "next/link";
import { useEffect } from "react";
import CustomFileInput from "../CustomFileInput/CustomFileInput";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { handleApplication_JsonData } from "@/app/auth/utils/submitJson";
import { handleMultiPartFormData } from "@/app/auth/utils/submitFormData";
type AuthType = keyof typeof authEndPoints;

interface AuthFormProps {
    type: AuthType;
    inputs: Input[];
};

export default function AuthForm({ type, inputs }: AuthFormProps) {
    const router = useRouter();
    const currSchoolId = Cookies.get('school_registeration_id');
    const { register, setError, watch, clearErrors, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormAuthInputs>();
    const watchValues = watch();

    const onSubmit: SubmitHandler<FormAuthInputs> = async (data: FormAuthInputs) => {
        if (type === 'login' || type === 'resetPassword' || type === 'forgetPassword' || type === 'register1' || type === 'register2') {
            if (type === 'register2') {
                data.school_id = currSchoolId;
            };
            const status = await handleApplication_JsonData(data, type, setError);
            if (status === 'success') {
                if (type === 'login') {
                    window.location.reload();
                } else if (type === 'register1') {
                    router.push('/auth/register/step2');
                } else if (type === 'register2') {
                    router.push('/auth/register/step3');
                } else if (type === 'resetPassword') {
                    router.push('/auth/login');
                } else if (type === 'forgetPassword') {
                    router.push('/auth/reset-password');
                };
            };
        } else if (type === 'register3') {
            data.school_id = currSchoolId;
            const status = await handleMultiPartFormData(data, type, setError);
            if (status === 'success') {
                Cookies.remove('school_registeration_id');
                Cookies.remove('current_step');
                router.push('/auth/login');
            };
        };
    };

    useEffect(() => {
        if (type === 'register2') {
            const password = watch('password');
            const confirmPassword = watch('password_confirmation');
            if (password !== confirmPassword) {
                setError('password_confirmation', { message: 'Passwords do not match' });
            } else {
                clearErrors("password_confirmation");
            };
        };
    }, [watch, setError, clearErrors, type]);

    useEffect(() => {
        if (type === 'resetPassword') {
            const password = watch('new_password');
            const confirmPassword = watch('new_password_confirmation');
            if (password !== confirmPassword) {
                setError('new_password_confirmation', { message: 'Passwords do not match' });
            } else {
                clearErrors("new_password_confirmation");
            };
        };
    }, [watch, setError, clearErrors, type]);

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