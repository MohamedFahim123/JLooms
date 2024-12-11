'use client';
import AuthForm from '@/app/components/AuthForm/AuthForm';
import Link from 'next/link';
import styles from '../authStyles.module.css';
import { CustomEmailInput, CustomPasswordInput } from '../utils/customInputsValues';
import { Input } from '../utils/interfaces';

export default function LoginPage() {
    const loginInputs: Input[] = [
        CustomEmailInput,
        CustomPasswordInput
    ];

    return (
        <>
            <h1 className={`${styles.heading} text-center mb-3 text-4xl font-bol`}>Login</h1>
            <p className={`${styles.paragraph} text-center`}>
                Welcome, Log into you account
            </p>
            <p className={`${styles.paragraph} text-center mb-5`}>
                It is our great pleasure to have you on board!
            </p>
            <AuthForm type="login" inputs={loginInputs} />
            <p className={`${styles.paragraph} text-center mb-10 text-sm mt-4`}>
                Already have an account?{' '}
                <Link href="/auth/register/step1" className="text-indigo-600 font-semibold underline">
                    Sign up
                </Link>
            </p>
        </>
    );
};