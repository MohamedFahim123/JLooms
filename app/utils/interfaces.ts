import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FormAuthInputs } from "../auth/utils/interfaces";
import { ReactNode } from "react";
import { Table } from "../dashboard/utils/interfaces";

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

export interface TableRowProps {
    cell: Table;
};