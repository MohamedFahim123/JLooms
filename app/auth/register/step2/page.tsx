'use client';
import React, { useEffect, useState } from 'react';
import AuthForm from '@/app/components/AuthForm/AuthForm';
import { Input } from '../../utils/interfaces';
import { CustomConfirmPasswordInput, CustomPasswordInput } from '../../utils/customInputsValues';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Step2Page() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const currStep = Cookies.get('current_step');
        if (!currStep || currStep !== '2') {
            router.push('/auth/register/step1');
        } else {
            setIsAuthorized(true);
        };
    }, [router]);

    if (!isAuthorized) {
        return null;
    };

    const step2Inputs: Input[] = [CustomPasswordInput, CustomConfirmPasswordInput];

    return (
        <>
            <AuthForm inputs={step2Inputs} type="register2" />
        </>
    );
}
