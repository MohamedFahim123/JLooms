'use client'
import React, { useEffect, useState } from 'react';
import AuthForm from '@/app/components/AuthForm/AuthForm';
import { Input } from '../../utils/interfaces';
import { CustomFileCommercialInput, CustomFileOfficialInput } from '../../utils/customInputsValues';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Step3Page() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const currStep = Cookies.get('current_step');
        if (!currStep || !(currStep === '3')) {
            router.push('/auth/register/step2');
        } else {
            setIsAuthorized(true);
        };
    }, [router]);

    if (!isAuthorized) {
        return null;
    };
    const step2Inputs: Input[] = [
        CustomFileOfficialInput ,
        CustomFileCommercialInput
    ];

    return (
        <>
            <AuthForm inputs={step2Inputs} type='register3' />
        </>
    )
}
