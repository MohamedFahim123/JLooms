'use client'
import React, { useState } from 'react';
import styles from './customeInput.module.css';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { CustomeInputProps } from '@/app/utils/interfaces';

export default function CustomeInput({
    name,
    placeHolder,
    register,
    error,
    type,
    lable,
    id,
    validation
}: CustomeInputProps) {
    const [viewPassword, setViewPassword] = useState(false);
    const handleToggleShowPassword = () => setViewPassword(!viewPassword);

    return (
        <>
            <div className={`mb-1 ${styles.inputContainer}`}>
                <label
                    htmlFor={id}
                    className={`${styles.authLable} ${error?.[name] && 'mb-0'} block mb-2 text-sm font-medium dark:text-white`}
                >
                    {lable}
                </label>
                <input
                    type={type === 'password' ? viewPassword ? 'text' : type : type}
                    id={id}
                    placeholder={placeHolder}
                    {...register(name, validation)}
                    className={`${styles.formInput} ${error?.[name] ? `${styles.errorInput} mb-0` : `border-gray-300`} bg-gray-50 border  text-sm rounded-lg block w-full p-2.5`}
                />
                {type === 'password' && (
                    <div className={styles.passwordViewIcon} onClick={handleToggleShowPassword}>
                        {
                            viewPassword ? <FaEyeSlash /> : <FaEye />
                        }
                    </div>
                )}

            </div>
            {
                error?.[name] && (
                    <p className={`${styles.error} text-red-500 text-xs`}>
                        {error[name]?.message as string}
                    </p>
                )
            }
        </>
    );
}
