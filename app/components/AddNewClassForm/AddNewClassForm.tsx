'use client';

import { FormAuthInputs, Validation } from '@/app/auth/utils/interfaces';
import { dataURLS } from '@/app/dashboard/utils/dataUrls';
import { Action, Activity } from '@/app/dashboard/utils/interfaces';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import styles from './addNewClassForm.module.css';
import { submitApplicationJson } from '@/app/utils/submitApplicationJson';
import { useEffect } from 'react';

interface ClassInput {
    lableName: string;
    name: keyof FormAuthInputs;
    placeholder: string;
    type: string;
    validation?: Validation;
};

export interface FormDefaultValues {
    name_en: string;
    actions: { action: string }[];
    activities: { activity: string }[];
    options_id: { manual: string, message: string }
    options: { id: string | number; type: string }[];
};

interface AddNewClassFormProps {
    actions: Action[];
    activities: Activity[];
};

interface FinalData {
    name_en: string;
    options: { id: string | number; type: string }[];
};

export default function AddNewClassForm({ actions, activities }: AddNewClassFormProps) {
    const { control, handleSubmit, clearErrors, register, reset, setError, formState: { errors } } = useForm<FormDefaultValues>({
        defaultValues: {
            name_en: "",
            actions: [{ action: "" }],
            activities: [{ activity: "" }],
            options: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "actions",
    });

    const { fields: actFields, append: appendOnAct, remove: removeAct } = useFieldArray({
        control,
        name: "activities",
    });

    useEffect(() => {
        if (errors?.options_id) {
            clearErrors('options_id');
        };
    }, [clearErrors, errors?.options_id]);

    const classNameInput: ClassInput = {
        lableName: "Class Name",
        name: "name_en",
        placeholder: "Class Name",
        type: "text",
        validation: {
            required: 'Class Name is Required',
        },
    };

    const onSubmit: SubmitHandler<FormDefaultValues> = (data) => {
        const actionsArr = data.actions.map(action => action && { id: action.action, type: 'action' })?.filter(Boolean);
        const activitiesArr = data.activities.map(activity => activity && { id: activity.activity, type: 'activity' })?.filter(Boolean);

        const options = [...actionsArr, ...activitiesArr];
        const finalData: FinalData = {
            name_en: data.name_en,
            options
        };

        submitApplicationJson(finalData, dataURLS.addNewClass, setError, reset);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded-lg shadow-md">
            <div key={classNameInput.name} className={`mb-4 ${styles.inputContainer}`}>
                <label
                    htmlFor={'addNewClassName'}
                    className={`${styles.authLable} block mb-2 text-sm font-medium dark:text-white`}
                >
                    {classNameInput.lableName}
                </label>
                <input
                    type={classNameInput.type}
                    id={'addNewClassName'}
                    placeholder={classNameInput.placeholder}
                    {...register('name_en', classNameInput.validation)}
                    className={`${styles.formInput} transition-all duration-300 focus:border-indigo-600 hover:border-indigo-600 ${errors?.name_en ? styles.errorInput : 'border-gray-300'} bg-gray-50 border text-sm rounded-lg block w-full p-2.5`}
                />
                {errors?.name_en && (
                    <p className={`${styles.error} text-red-500 text-xs`}>
                        {errors.name_en?.message as string}
                    </p>
                )}
            </div>

            <div>
                {fields.map((item, index) => (
                    <div key={item.id} className="flex items-end justify-between gap-4 mb-4">
                        <div className="w-full">
                            <label className="block text-sm font-medium mt-3 text-gray-600">Action #{index + 1}</label>
                            <Controller
                                name={`actions.${index}.action`}
                                control={control}
                                render={({ field }) => (
                                    <select {...field} className={`mt-2 w-full transition-all duration-300 focus:border-indigo-600 hover:border-indigo-600 p-2 border rounded-lg outline-none`}>
                                        <option value="" disabled>Choose Action</option>
                                        {
                                            actions?.length > 0 ? (
                                                actions?.map(action => (
                                                    <option key={action.id} value={action.id}>{action.name}</option>
                                                ))
                                            ) : (
                                                <option disabled>No Activities Available</option>
                                            )
                                        }
                                    </select>
                                )}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2 transition-all duration-300 hover:bg-red-600"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <div className="mb-4">
                <button
                    type="button"
                    onClick={() => append({ action: "" })}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
                >
                    Add Action
                </button>
            </div>

            <div>
                {actFields.map((item, index) => (
                    <div key={item.id} className="flex items-end justify-between gap-4 mb-4">
                        <div className="w-full">
                            <label className="block text-sm font-medium mt-3 text-gray-600">Activity #{index + 1}</label>
                            <Controller
                                name={`activities.${index}.activity`}
                                control={control}
                                render={({ field }) => (
                                    <select {...field} className="mt-2 w-full transition-all duration-300 focus:border-indigo-600 hover:border-indigo-600 p-2 border rounded-lg outline-none">
                                        <option value="" disabled>Choose Activity</option>
                                        {
                                            activities?.length > 0 ? (
                                                activities?.map(activity =>
                                                (
                                                    <option key={activity.id} value={activity.id}>{activity.name}</option>
                                                )
                                                )
                                            ) : (
                                                <option disabled>No Activities Available</option>
                                            )
                                        }
                                    </select>
                                )}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeAct(index)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2 transition-all duration-300 hover:bg-red-600"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <div className="mb-4">
                <button
                    type="button"
                    onClick={() => appendOnAct({ activity: "" })}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
                >
                    Add Activity
                </button>
            </div>

            <div className='mt-5 flex justify-center'>
                <button
                    type="submit"
                    className="bg-indigo-500 transition-all duration-300 hover:bg-indigo-600 text-white font-medium py-3 px-10 rounded"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};