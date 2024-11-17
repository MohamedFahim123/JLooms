'use client';
import React from 'react';
import { CustomNameAdminInput, CustomNameSchoolInput, CustomSchoolEmailInput } from '../../utils/customInputsValues';
import AuthForm from '@/app/components/AuthForm/AuthForm';
import { Input } from '../../utils/interfaces';
import AuthBtnSubmit from '@/app/components/AuthBtnSubmit/AuthBtnSubmit';

export default function Step1Page() {
    const step1Inputs: Input[] = [
        CustomNameAdminInput,
        CustomNameSchoolInput,
        CustomSchoolEmailInput
    ];

    return (
        <>
            <AuthForm inputs={step1Inputs} type='register1' />
            <AuthBtnSubmit type='Login' typeBtn='button' isSubmitting={false} navigateTo='/auth/login' />
        </>
    );
};
