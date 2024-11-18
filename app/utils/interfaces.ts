import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FormAuthInputs } from "../auth/utils/interfaces";
import { ReactNode } from "react";

export interface CustomeInputProps {
    name: keyof FormAuthInputs;
    placeHolder: string;
    register: UseFormRegister<FieldValues>;
    type: string;
    lable: string;
    id: string;
    validation?: object;
    error?: FieldErrors<FormAuthInputs>;
    fileUploaded?: boolean;
};

export interface LayoutInterface {
    children: ReactNode;
};

export interface ParamsProps {
    id: Promise<number | string>;
}