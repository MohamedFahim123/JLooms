import React from 'react'
import styles from '../authStyles.module.css';

export default function layout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <h1 className={`${styles.heading} text-center mb-3 text-4xl font-bol`}>Register</h1>
            <p className={`${styles.paragraph} text-center mb-6`}>
                Welcome, create your school account
            </p>
            {children}
        </>
    );
};
