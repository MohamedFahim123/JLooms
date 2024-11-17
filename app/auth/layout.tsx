'use client';
import React from 'react';
import styles from './authStyles.module.css';
import { usePathname } from 'next/navigation';
import RegisterStepProgress, { Step } from '../components/RegisterStepProgress/RegisterStepProgress';


const steps2: Step[] = [
    { title: 'Your details', subtitle: 'Name and email', isCompleted: true, isActive: false },
    { title: 'Choose a password', subtitle: 'Choose a secure password', isCompleted: false, isActive: true },
    { title: 'Upload school’s document', subtitle: 'For account verification', isCompleted: false, isActive: false },
];

const steps3: Step[] = [
    { title: 'Your details', subtitle: 'Name and email', isCompleted: true, isActive: false },
    { title: 'Choose a password', subtitle: 'Choose a secure password', isCompleted: true, isActive: false },
    { title: 'Upload school’s document', subtitle: 'For account verification', isCompleted: false, isActive: true },
];

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathName = usePathname();
    return (
        <div className={`${styles.auth_layout}`}>
            <div className={`${styles.auth_container}`}>
                {children}
            </div>
            {
                (pathName === '/auth/register/step2' || pathName === '/auth/register/step3') && (
                    <div className={styles.registerSteps}>
                        <RegisterStepProgress steps={pathName === '/auth/register/step3' ? steps3 : steps2} />
                    </div>
                )
            }
        </div>
    );
};