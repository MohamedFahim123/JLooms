'use client'
import React from 'react';
import AuthForm from '@/app/components/AuthForm/AuthForm';
import { Input } from '../utils/interfaces';
import { CustomConfirmPasswordInput, CustomEmailInput, CustomOtpInput, CustomPasswordInput } from '../utils/customInputsValues';
import styles from '../authStyles.module.css';

export default function ResetPasswordPage() {
    const forgetPassword: Input[] = [
        CustomEmailInput,
        CustomOtpInput,
        {...CustomPasswordInput , name: 'new_password'},
        {...CustomConfirmPasswordInput, name: 'new_password_confirmation'}
    ];

    return (
        <>
            <h1 className={`${styles.heading} text-center mb-3 text-4xl font-bol`}>Reset Password</h1>
            <AuthForm type="resetPassword" inputs={forgetPassword} /></>
    );
};