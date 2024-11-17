'use client'
import React from 'react';
import AuthForm from '@/app/components/AuthForm/AuthForm';
import { Input } from '../../utils/interfaces';
import { CustomConfirmPasswordInput, CustomPasswordInput } from '../../utils/customInputsValues';

export default function Step2Page() {
    const step2Inputs: Input[] = [
        CustomPasswordInput,
        CustomConfirmPasswordInput
    ];

    return (
        <>
            <AuthForm inputs={step2Inputs} type='register2' />
        </>
    )
}
