'use client'
import { OPTION } from '@/app/dashboard/classes/[id]/page';
import { teacherInterface } from '@/app/dashboard/utils/interfaces';
import { FormEvent, useEffect, useState } from "react";
import styles from './singleClassRowOfAction.module.css';
import Swal from 'sweetalert2';
import { dataURLS } from '@/app/dashboard/utils/dataUrls';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';

interface SelectedTeacher {
    class_option_teacher_id: string | number;
    id: string | number;
    name: string;
};

export default function SingleClassRowOfAction({ classId, option, allowedTeachers }: { classId: string, option: OPTION, allowedTeachers: teacherInterface[] }) {
    const [currState, setCurrState] = useState<string>('edit');
    const [selectedTeacher, setSelectedTeacher] = useState<SelectedTeacher | null>(null);
    const token = Cookies.get('SERVER_JLOOMS_TOKEN');

    const handleDelete = () => {
        const data = {
            class_id: classId,
        };
        Swal.fire({
            title: `Do you want to Remove ${option?.name} ?`,
            showCancelButton: true,
            confirmButtonColor: '#ff2020',
            confirmButtonText: "Yes, Remove",
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const request = await fetch(
                        `${dataURLS.removeOptionFromClass}/${option.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify(data)
                    })
                    const res = await request.json();
                    if (res.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: `${option?.name} has been removed successfully`,
                            showConfirmButton: false,
                            timer: 1000,
                        });
                        window.location.reload();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed to remove Option',
                            showConfirmButton: false,
                            timer: 1000,
                        });
                    };
                };
            });
    };

    const handleSelectChange = (e: { target: { value: string; }; }) => {
        const value = e.target.value;
        setSelectedTeacher(allowedTeachers?.find(teacher => +teacher?.id === +value) || null);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (currState === 'submit') {
            const loadingToastId = toast.loading('Loading...');
            const data = {
                class_id: classId,
                class_option_teacher_id: `${selectedTeacher?.id}`,
                class_option_id: option?.id,
                teachers: [selectedTeacher]
            };
            (async () => {
                try {
                    const response = await axios.post(dataURLS.updateClassOptionTeacher, data, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    toast.update(loadingToastId, {
                        render: response?.data?.message || 'Request succeeded!',
                        type: 'success',
                        isLoading: false,
                        autoClose: 1500,
                    });
                    setCurrState('edit');
                    window.location.reload();
                } catch (error) {
                    const errorMessage = axios.isAxiosError(error)
                        ? error.response?.data?.message || 'Something went wrong!'
                        : 'An unexpected error occurred.';
                    toast.update(loadingToastId, {
                        render: errorMessage,
                        type: 'error',
                        isLoading: false,
                        autoClose: 2000,
                    });
                };
            })();
        } else if (currState === 'edit') {
            setCurrState('submit');
        };
    };

    useEffect(() => {
        if (option?.teachers) {
            setSelectedTeacher(option?.teachers[0]);
        };
    }, [option]);

    return (
        <form className="flex justify-between w-full">
            <div className={`${styles.actionContainer}`}>
                <input id="ActionInput" disabled value={option.name} className='bg-gray-50 border text-sm rounded-lg block w-full p-2.5' type="text" />
            </div>
            <div className={`${styles.teacherContainer}`}>
                <select
                    disabled={currState === 'edit'}
                    defaultValue={selectedTeacher?.id || option?.teachers[0]?.id || ''}
                    onChange={handleSelectChange}
                    id="teacherSelectedToClass"
                    className='block appearance-none w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-10 leading-tight focus:outline-none focus:shadow-outline'
                >
                    <option value={''} disabled>Select a Teacher</option>
                    {
                        allowedTeachers?.map(teacher => (
                            <option key={teacher?.id} value={teacher?.id}>{teacher?.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className={`${styles.actions} flex gap-4`}>
                <button
                    onClick={handleDelete}
                    type="button"
                    className={`${styles.widthBtn} hover:bg-white hover:text-[#ff2020] border-x border-y border-[#ff2020] bg-[#ff2020] text-white transition-all duration-300 font-semibold rounded-lg py-2 px-4`}
                >
                    Delete
                </button>
                <button
                    onClick={handleSubmit}
                    type={currState === 'submit' ? 'submit' : 'button'}
                    className={`${styles.widthBtn} ${currState === 'edit' ? 'hover:bg-white border-blue-700 text-white hover:text-blue-700 rounded-lg bg-blue-700' : 'hover:bg-white text-white hover:text-green-700 rounded-lg bg-green-700 border-green-700'} border-x border-y transition-all duration-300 font-semibold py-2`}
                >
                    {currState || 'submit'}
                </button>
            </div>
        </form>
    );
};