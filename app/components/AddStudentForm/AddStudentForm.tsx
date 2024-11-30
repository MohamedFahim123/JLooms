'use client'

import { CustomEmailInput, CustomPasswordInput, CustomPhoneNumberInput } from "@/app/auth/utils/customInputsValues";
import { FormAuthInputs, Validation } from "@/app/auth/utils/interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomeInput from "../CustomInput/CustomeInput";
import CustomFileInput from "../CustomFileInput/CustomFileInput";

interface StudentInput {
    lableName: string;
    name: keyof FormAuthInputs;
    placeholder: string;
    type: string;
    validation?: Validation;
};

export default function AddStudentForm() {
    const { register, watch, handleSubmit, formState: { errors } } = useForm<FormAuthInputs>();
    const firstInputs: StudentInput[] = [
        {
            lableName: "Full Name",
            name: "student_name",
            placeholder: "Enter Full Name",
            type: "text",
            validation: {
                required: 'Name is Required',
            },
        },
        {
            lableName: "Student ID",
            name: "student_id",
            placeholder: "Student ID",
            type: "text",
            validation: {
                required: 'Id is Required',
            },
        },
    ];

    const watchValues = watch();

    const Inputs: StudentInput[] = [
        CustomEmailInput,
        CustomPasswordInput,
        CustomPhoneNumberInput,
        {
            lableName: "Profile Picture",
            name: "student_profile",
            placeholder: "profile picture",
            type: "file",
            validation: {
                required: 'Profile Picture is Required',
            },
        },
    ];

    const onSubmit: SubmitHandler<FormAuthInputs> = (data) => {
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 mt-5">
            {
                firstInputs?.map((input, idx) => (
                    <CustomeInput
                        key={idx}
                        name={input.name}
                        placeHolder={input.placeholder}
                        register={register}
                        error={errors}
                        type={input.type}
                        lable={input.lableName}
                        id={`addstudent${input.name}`}
                        validation={input.validation}
                    />
                ))
            }
            <div>
                <label className="block text-gray-700">Gender</label>
                <select
                    {...register("student_gender", { required: "Gender is required" })}
                    className={`${errors?.student_gender?.message && 'border-red-500'} w-full px-4 py-2 border rounded-md focus:outline-none`}
                >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {errors.student_gender && <p className="text-red-500 text-sm">{errors.student_gender.message}</p>}
            </div>
            <div>
                <label className="block text-gray-700">Class</label>
                <select
                    {...register("student_class", { required: "Class is required" })}
                    className={`${errors?.student_class?.message && 'border-red-500'} w-full px-4 py-2 border rounded-md focus:outline-none`}
                >
                    <option value="">Select Class</option>
                    <option value="male">Math</option>
                    <option value="female">English</option>
                    <option value="other">Other</option>
                </select>
                {errors.student_class && <p className="text-red-500 text-sm">{errors.student_class.message}</p>}
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
                                id={`addstudent${input.name}`}
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
                                id={`addstudent${input.name}`}
                                validation={input.validation}
                            />
                        )
                )
            }
            <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 text-white font-medium py-2 px-4 rounded"
            >
                Add Student
            </button>
        </form>
    );
};