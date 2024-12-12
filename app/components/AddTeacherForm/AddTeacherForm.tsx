'use client';

import { CustomEmailInput, CustomPasswordInput, CustomPhoneNumberInput } from "@/app/auth/utils/customInputsValues";
import { FormAuthInputs, Validation } from "@/app/auth/utils/interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomeInput from "../CustomInput/CustomeInput";
import CustomFileInput from "../CustomFileInput/CustomFileInput";
import { handleMultiPartWebSiteFormData } from "@/app/utils/submitFormData";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import styles from './addTeacherForm.module.css';

interface TeacherInput {
    lableName: string;
    name: keyof FormAuthInputs;
    placeholder: string;
    type: string;
    validation?: Validation;
};
export default function AddTeacherForm() {
    const { register, watch, handleSubmit, reset, setError, formState: { errors } } = useForm<FormAuthInputs>();
    const name: TeacherInput = {
        lableName: "Full Name",
        name: "name",
        placeholder: "Enter Full Name",
        type: "text",
        validation: {
            required: 'Name is Required',
        },
    };

    const watchValues = watch();

    const Inputs: TeacherInput[] = [
        CustomEmailInput,
        CustomPasswordInput,
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
        handleMultiPartWebSiteFormData(data, dataURLS.addTeacher, setError, reset);
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

            <div>
                <label className={`${styles.authLable} block mb-2 text-sm font-medium dark:text-white`}>Gender</label>
                <select
                    {...register("gender", { required: "Gender is required" })}
                    className={`${errors?.gender?.message && 'border-red-500'} w-full px-4 py-2 border rounded-md focus:outline-none`}
                >
                    <option value="" disabled>Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
            </div>

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
                                id={`addTeacher${input.name}`}
                                validation={input.validation}
                            />
                        )
                )
            }

            <button
                type="submit"
                className="bg-indigo-500 transition-all duration-300 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded"
            >
                Add Teacher
            </button>
        </form>
    )
}
