import { ReactNode } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormAuthInputs } from "../auth/utils/interfaces";
import { Table } from "../dashboard/utils/interfaces";

export interface CustomeInputProps {
    name: keyof FormAuthInputs;
    placeHolder: string;
    register: UseFormRegister<FormAuthInputs>;
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
    currStudentId?: string;
};