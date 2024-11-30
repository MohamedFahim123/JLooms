'use client';
import { FormAuthInputs, Validation } from '@/app/auth/utils/interfaces';
import { useForm, useFieldArray, Controller, SubmitHandler } from 'react-hook-form';
import styles from './addNewClassForm.module.css';

interface ClassInput {
    lableName: string;
    name: keyof FormAuthInputs;
    placeholder: string;
    type: string;
    validation?: Validation;
}

interface FormDefaultValues {
    class_name: string;
    subjects: {
        subject: string;
        teacher: string;
    }[];
    activities: {
        activity: string;
        stuff: string;
    }[];
}
export default function AddNewClassForm() {
    const { control, handleSubmit, register, formState: { errors }, watch } = useForm<FormDefaultValues>({
        defaultValues: {
            class_name: "",
            subjects: [{ subject: "", teacher: "" }],
            activities: [{ activity: "", stuff: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "subjects"
    });

    const { fields: actFields, append: appendOnAct, remove: removeAct } = useFieldArray({
        control,
        name: "activities"
    });

    const watchSubjects = watch("subjects");
    const watchActivities = watch('activities');

    const classNameInput: ClassInput = {
        lableName: "Class Name",
        name: "class_name",
        placeholder: "Class Name",
        type: "text",
        validation: {
            required: 'Class Name is Required',
        },
    }

    const onSubmit: SubmitHandler<FormDefaultValues> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='p-6'>
            {
                <div key={classNameInput.name} className={`mb-1 ${styles.inputContainer}`}>
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
                        {...register('class_name', classNameInput.validation)}
                        className={`${styles.formInput} transition-all duration-300 focus:border-indigo-600 hover:border-indigo-600 ${errors?.class_name ? styles.errorInput : `border-gray-300`} bg-gray-50 border  text-sm rounded-lg block w-full p-2.5`}
                    />
                    {errors?.class_name && (
                        <p className={`${styles.error} text-red-500 text-xs`}>
                            {errors.class_name?.message as string}
                        </p>
                    )}
                </div>
            }
            {
                fields.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-3 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mt-3 text-gray-600">subject #{index + 1}</label>
                            <Controller
                                name={`subjects.${index}.subject`}
                                control={control}
                                render={({ field }) => (
                                    <select {...field} className="mt-2 w-full transition-all duration-300 focus:border-indigo-600 hover:border-indigo-600 p-2 border rounded-lg outline-none">
                                        <option value="">Choose Subject</option>
                                        <option value="subject 1">Subject 1</option>
                                        <option value="subject 2">Subject 2</option>
                                    </select>
                                )}
                            />
                        </div>
                        {
                            watchSubjects[index]?.subject && (
                                <div>
                                    <label className="block text-sm mt-3 font-medium text-gray-600">Teacher</label>
                                    <Controller
                                        name={`subjects.${index}.teacher`}
                                        control={control}
                                        render={({ field }) => (
                                            <select {...field} className="mt-2 w-full p-2 transition-all duration-300 focus:border-indigo-600 hover:border-indigo-600 border rounded-lg outline-none">
                                                <option value="">Choose Subject</option>
                                                <option value="Math">Mohamed</option>
                                                <option value="Mahmoud">Mahmoud</option>
                                                <option value="Ahmed">Ahmed</option>
                                                <option value="Malek">Malek</option>
                                            </select>
                                        )}
                                    />
                                </div>
                            )
                        }
                        <div className="col-span-2 flex justify-center">
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))
            }
            <div>
                <button
                    type="button"
                    onClick={() => append({ subject: "", teacher: "" })}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                    Add Subject
                </button>
            </div>
            {
                actFields.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-3 sm:grid-cols-2 gap-4 mb-4 mt-5">
                        <div>
                            <label className="block text-sm font-medium mt-3 text-gray-600">Activity #{index + 1}</label>
                            <Controller
                                name={`activities.${index}.activity`}
                                control={control}
                                render={({ field }) => (
                                    <select {...field} className="mt-2 w-full transition-all duration-300 focus:border-indigo-600 hover:border-indigo-600 p-2 border rounded-lg outline-none">
                                        <option value="">Choose Activity</option>
                                        <option value="Activity 1">Activity 1</option>
                                        <option value="Activity 2">Activity 2</option>
                                    </select>
                                )}
                            />
                        </div>
                        {
                            watchActivities[index]?.activity && (
                                <div>
                                    <label className="block text-sm mt-3 font-medium text-gray-600">Stuff</label>
                                    <Controller
                                        name={`activities.${index}.stuff`}
                                        control={control}
                                        render={({ field }) => (
                                            <select {...field} className="mt-2 w-full transition-all duration-300 focus:border-indigo-600 hover:border-indigo-600 p-2 border rounded-lg outline-none">
                                                <option value="">Choose Stuff</option>
                                                <option value="Restaurant">Restaurant</option>
                                                <option value="Cleaning">Cleaning</option>
                                                <option value="Kids Teachers">Kids Teachers</option>
                                                <option value="Primary Teachers">Primary Teachers</option>
                                            </select>
                                        )}
                                    />
                                </div>
                            )
                        }
                        <div className="col-span-2 flex justify-center">
                            <button
                                type="button"
                                onClick={() => removeAct(index)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))
            }
            <div>
                <button
                    type="button"
                    onClick={() => appendOnAct({ activity: "", stuff: "" })}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
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