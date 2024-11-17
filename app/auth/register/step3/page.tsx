'use client'
import React from 'react';
import AuthForm from '@/app/components/AuthForm/AuthForm';
import { Input } from '../../utils/interfaces';
import { CustomFileCommercialInput, CustomFileOfficialInput } from '../../utils/customInputsValues';

export default function Step3Page() {
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
