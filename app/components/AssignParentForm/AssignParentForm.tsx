'use client';

import { FormAuthInputs } from "@/app/auth/utils/interfaces";
import { submitApplicationJson } from "@/app/utils/submitApplicationJson";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";



export default function AssignParentForm({ studentId }: { studentId?: number | string }) {
    const { register, setError, reset, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormAuthInputs>();


    const onSubmit: SubmitHandler<FormAuthInputs> = (data) => {
        submitApplicationJson(data, '', setError, reset);
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 mt-5">
            {studentId}
            <div className="mb-6 relative">
                <label htmlFor="parentId" className="block text-gray-700 font-medium mb-1">Enter Parent ID</label>
                <div className="flex items-center border rounded-md overflow-hidden shadow-sm">
                    <input
                        id="parentId"
                        type="text"
                        placeholder="SS3"
                        className="flex-1 px-4 py-2 focus:outline-none"
                        {...register('parentId', { required: 'Parent ID is required' })}
                    />
                    <button
                        type="button"
                        className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 text-white font-medium py-2 px-4"
                    >
                        <CiSearch size={24} />
                    </button>
                </div>
                {errors.parentId && <p className="text-red-500 text-sm mt-1">{errors.parentId.message}</p>}
            </div>

            {
                watch('parentId') &&
                <div className="mb-6">
                    <label htmlFor="relation" className="block text-gray-700 font-medium mb-1">Relation</label>
                    <select
                        id="relation"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        {...register('relation', { required: 'Relation is required' })}
                    >
                        <option value="">Select Relation</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Guardian">Guardian</option>
                    </select>
                    {errors.relation && <p className="text-red-500 text-sm mt-1">{errors.relation.message}</p>}
                </div>
            }

            <div className="flex justify-start">
                <button
                    type="submit"
                    disabled={!watch('parentId') || !watch('relation') || isSubmitting}
                    className={`${!watch('parentId') || !watch('relation') || isSubmitting ? 'bg-indigo-400' : 'bg-indigo-500 hover:bg-indigo-600 transition-all duration-300'} text-white font-medium py-2 px-4 rounded`}
                >
                    Assign Parent
                </button>
            </div>
        </form>
    );
};