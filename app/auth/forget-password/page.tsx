'use client';
import AuthForm from '@/app/components/AuthForm/AuthForm';
import React from 'react';
import { Input } from '../utils/interfaces';
import { CustomEmailInput } from '../utils/customInputsValues';
import styles from '../authStyles.module.css';
import AuthBtnSubmit from '@/app/components/AuthBtnSubmit/AuthBtnSubmit';

export default function ForgetPasswordPage() {
    const forgetPassword: Input[] = [
        CustomEmailInput,
    ];

    return (
        <>
            <h1 className={`${styles.heading} text-center mb-3 text-4xl font-bol`}>Forget Password</h1>
            <AuthForm type="forgetPassword" inputs={forgetPassword} />
            <AuthBtnSubmit type='Login' typeBtn='button' isSubmitting={false} navigateTo='/auth/login' />
        </>
    );
};