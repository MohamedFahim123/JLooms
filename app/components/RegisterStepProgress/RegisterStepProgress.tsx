import React from 'react';
import styles from './registerStepProgress.module.css';

export interface Step {
    title: string;
    subtitle: string;
    isCompleted: boolean;
    isActive: boolean;
};

interface ProgressStepsProps {
    steps: Step[];
};

export default function RegisterStepProgress({ steps }: ProgressStepsProps) {
    return (
        <div className={`${styles.progressContainer} flex justify-evenly items-start w-full mx-auto mt-8`}>
            {steps.map((step, index) => (
                <div key={index} className={`flex flex-col items-center ${styles.progress}`}>
                    <div
                        className={`flex items-center justify-center w-8 h-8 ${styles.progressIcon} ${step.isCompleted ? `${styles.bgActive} text-white` : 'bg-gray-200 text-gray-500'
                            } ${step.isActive ? `ring-2 ${styles.textActive}` : ''}`}
                    >
                        {step.isCompleted ? (
                            <span className="text-lg">✓</span>
                        ) : (
                            <span className="text-lg">{index + 1}</span>
                        )}
                    </div>
                    <div className="text-center mt-2">
                        <p className="text-sm font-semibold text-gray-800">{step.title}</p>
                        <p className="text-xs text-gray-500">{step.subtitle}</p>
                    </div>
                    {index < steps.length - 1 && (
                        <div className="flex-1 h-0.5 w-full mt-1"></div>
                    )}
                </div>
            ))}
        </div>
    );
};