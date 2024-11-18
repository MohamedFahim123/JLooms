'use client';
import { useState } from 'react';
import { useForm, useFieldArray, Controller, SubmitHandler } from 'react-hook-form';

interface FormDefaultValues {
    subjects: {
        class: string;
        subject: string;
    }[];
}

export default function AddSubject() {
    const [edit, setEdit] = useState(false);
    const { control, handleSubmit, watch } = useForm<FormDefaultValues>({
        defaultValues: {
            subjects: [{ class: "", subject: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "subjects"
    });

    const watchClasses = watch("subjects");

    const onSubmit: SubmitHandler<FormDefaultValues> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-lg font-semibold mb-4">Classes & Subjects</h3>
            {
                fields.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Class #{index + 1}</label>
                            <Controller
                                name={`subjects.${index}.class`}
                                control={control}
                                render={({ field }) => (
                                    <select disabled={!edit} {...field} className="mt-2 w-full p-2 border rounded-lg focus:outline-none">
                                        <option value="">Choose Class</option>
                                        <option value="Class 1">Class 1</option>
                                        <option value="Class 2">Class 2</option>
                                    </select>
                                )}
                            />
                        </div>

                        {
                            watchClasses[index]?.class && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Subject/Activity</label>
                                    <Controller
                                        name={`subjects.${index}.subject`}
                                        control={control}
                                        render={({ field }) => (
                                            <select disabled={!edit}  {...field} className="mt-2 w-full p-2 border rounded-lg focus:outline-none">
                                                <option value="">Choose Subject</option>
                                                <option value="Math">Math</option>
                                                <option value="Science">Science</option>
                                            </select>
                                        )}
                                    />
                                </div>
                            )
                        }
                        <div className="col-span-2 flex justify-end">
                            {
                                edit &&
                                (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                    >
                                        Remove
                                    </button>
                                )
                            }
                        </div>
                    </div>
                ))
            }
            <div className="flex justify-between">
                {
                    edit &&
                    <button
                        type="button"
                        onClick={() => append({ class: "", subject: "" })}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Add Class & Subject
                    </button>
                }
                {
                    edit ?
                        (
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-lg"
                            >
                                Submit
                            </button>
                        )
                        :
                        (
                            <button
                                type="button"
                                onClick={() => setEdit(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                            >
                                Edit
                            </button>

                        )
                }
            </div>
        </form>
    );
}
