'use client'
import React from 'react';
import AuthForm from '@/app/components/AuthForm/AuthForm';
import { Input } from '../utils/interfaces';
import { CustomEmailInput, CustomOtpInput, CustomPasswordInput } from '../utils/customInputsValues';
import styles from '../authStyles.module.css';

export default function ResetPasswordPage() {
    const forgetPassword: Input[] = [
        CustomEmailInput,
        CustomOtpInput,
        CustomPasswordInput,
    ];

    return (
        <>
            <h1 className={`${styles.heading} text-center mb-3 text-4xl font-bol`}>Reset Password</h1>
            <AuthForm type="forgetPassword" inputs={forgetPassword} /></>
    );
};