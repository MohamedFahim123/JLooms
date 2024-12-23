'use client';
import AuthForm from '@/app/components/AuthForm/AuthForm';
import Link from 'next/link';
import styles from '../authStyles.module.css';
import { CustomEmailInput, CustomPasswordInput } from '../utils/customInputsValues';
import { Input } from '../utils/interfaces';
import Image from 'next/image';
import Logo from '../../imgs/auth/BlueAndWhiteIllustrativeKidsApparelLogoBlue.png';

export default function LoginPage() {
    const loginInputs: Input[] = [
        CustomEmailInput,
        CustomPasswordInput
    ];

    return (
        <>
            <div className='flex justify-center'>
                <Image
                    src={Logo}
                    alt="Join Looms Logo"
                    width={100}
                    height={100}
                    className='scale-125 object-fill'
                />
            </div>
            <h1 className={`${styles.heading} text-center mb-3 text-4xl font-bol`}>
                Login
            </h1>
            <p className={`${styles.paragraph} text-center mb-4`}>
                Welcome, Log into you account
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