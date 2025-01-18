'use client';

import { CustomEmailInput, CustomPhoneNumberInput } from "@/app/auth/utils/customInputsValues";
import { FormAuthInputs, Validation } from "@/app/auth/utils/interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomeInput from "../CustomInput/CustomeInput";
import CustomFileInput from "../CustomFileInput/CustomFileInput";
import { handleMultiPartWebSiteFormData } from "@/app/utils/submitFormData";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";

interface ParentInput {
    lableName: string;
    name: keyof FormAuthInputs;
    placeholder: string;
    type: string;
    validation?: Validation;
};

export default function AddParentForm() {
    const { register, watch, handleSubmit, reset, setError, formState: { errors } } = useForm<FormAuthInputs>();
    const name: ParentInput = {
        lableName: "Full Name",
        name: "name",
        placeholder: "Enter Full Name",
        type: "text",
        validation: {
            required: 'Name is Required',
        },
    };

    const watchValues = watch();

    const Inputs: ParentInput[] = [
        {
            lableName: "Parent Code",
            name: "code",
            placeholder: "Parent Code",
            type: "text",
            validation: {
                required: 'Parent Code is Required',
            },
        },
        CustomEmailInput,
        CustomPhoneNumberInput,
        {
            lableName: "Profile Picture",
            name: "image",
            placeholder: "profile picture",
            type: "file",
            validation: {
                required: 'Profile Picture is Required',
            },
        },
    ];

    const onSubmit: SubmitHandler<FormAuthInputs> = (data) => {
        handleMultiPartWebSiteFormData(data, dataURLS.addParent, setError, reset);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 mt-5">
            <CustomeInput
                name={name.name}
                placeHolder={name.placeholder}
                register={register}
                error={errors}
                type={name.type}
                lable={name.lableName}
                id={`addTeacher${name.name}`}
                validation={name.validation}
            />

            {
                Inputs?.map(input =>
                    input?.type === 'file' ?
                        (
                            <CustomFileInput
                                key={input.name}
                                name={input.name}
                                placeHolder={input.placeholder}
                                register={register}
                                error={errors}
                                type={input.type}
                                lable={input.lableName}
                                id={`addTeacher${input.name}`}
                                validation={input.validation}
                                fileUploaded={(watchValues[input.name] as unknown as FileList)?.length > 0}
                            />
                        )
                        :
                        (
                            <CustomeInput
                                key={input.name}
                                name={input.name}
                                placeHolder={input.placeholder}
                                register={register}
                                error={errors}
                                type={input.type}
                                lable={input.lableName}
                                id={`addParent${input.name}`}
                                validation={input.validation}
                            />
                        )
                )
            }

            <button
                type="submit"
                className="bg-indigo-500 transition-all duration-300 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded"
            >
                Add Parent
            </button>
        </form>
    )
}
