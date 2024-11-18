import React from 'react';
import MainDashBoardBtn from '../MainDashBoardBtn/MainDashBoardBtn';

interface Option {
    label: string;
    value: string;
    disabled?: boolean;
};

interface DashBoardPageHeadProps {
    text: string;
    btnText?: string;
    btnLink?: string;
    haveBtn?: boolean;
    haveFilter?: boolean;
    filterOptions?: Option[];
}

export default function DashBoardPageHead({ text, btnText, btnLink, haveBtn, haveFilter, filterOptions }: DashBoardPageHeadProps) {
    return (
        <>
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                {
                    text &&
                    (
                        <h2 className="text-2xl font-semibold">{text}</h2>
                    )
                }
                {
                    haveBtn &&
                    (
                        <MainDashBoardBtn text={btnText ? btnText : ''} link={btnLink ? btnLink : ''} />
                    )
                }
                {
                    haveFilter &&
                    (
                        <select className="border border-gray-300 rounded-lg py-2 px-3 w-full md:w-auto focus:outline-none focus:border-indigo-500">
                            {
                                filterOptions?.map((option, index) => (
                                    <option key={index} value={option?.value} disabled={option?.disabled}>{option?.label}</option>
                                ))
                            }
                        </select>
                    )
                }
            </div>
        </>
    );
};