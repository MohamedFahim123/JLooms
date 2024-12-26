'use client';

import { OPTION } from '@/app/dashboard/classes/[id]/page';
import { teacherInterface } from '@/app/dashboard/utils/interfaces';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { dataURLS } from '@/app/dashboard/utils/dataUrls';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

interface SelectedTeacher {
    class_option_teacher_id: string | number;
    id: string | number;
    name: string;
};

export default function SingleClassRowOfAction({ classId, option, allowedTeachers, type, allActions, allActivities }: { allActions: OPTION[], allActivities: OPTION[], type: 'activity' | 'action', classId: string, option: OPTION, allowedTeachers: teacherInterface[] }) {
    const [currState, setCurrState] = useState<string>('Assign');
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedTeachers, setSelectedTeachers] = useState<SelectedTeacher[] | []>([]);
    const token = Cookies.get('SERVER_JLOOMS_TOKEN');
    const router = useRouter();
    const [selectedUpdateData, setSelectedUpdateData] = useState<OPTION | null>(null);

    const handleDeleteAssignedTeacher = (id: string | number) => {
        const updatedTeachers = selectedTeachers.filter(teacher => +teacher.id !== +id);
        setSelectedTeachers(updatedTeachers);
    };

    const handleDeleteActionOrActivity = () => {
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
                    })
                    const res = await request.json();
                    if (res.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: `${option?.name} has been removed successfully`,
                            showConfirmButton: false,
                            timer: 1000,
                        });
                        router.push(`/dashboard/classes/${classId}`);
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

    const handleSelectTeacherChange = (e: { target: { value: string; }; }) => {
        const value = e.target.value;
        if (!selectedTeachers?.find(el => +el.id === +value)) {
            setSelectedTeachers([...selectedTeachers, allowedTeachers?.find(teacher => +teacher?.id === +value) || { id: '', name: '', class_option_teacher_id: '' }]);
        };
    };

    const handleSelectOptionChange = (e: { target: { value: string; }; }) => {
        const value = e.target.value;
        if (type === 'action') {
            setSelectedUpdateData(allActions?.find(el => +el.id === +value) || null);
        } else if (type === 'activity') {
            setSelectedUpdateData(allActivities?.find(el => +el.id === +value) || null);
        };
    };

    const handleAssignTeachers = () => {
        if (currState === 'submit') {
            const loadingToastId = toast.loading('Loading...');
            const data = {
                class_id: classId,
                class_option: `${option?.id}`,
                teachers: selectedTeachers?.map((teacher: { id: number | string }) => `${teacher?.id}`),
            };
            (async () => {
                try {
                    const response = await axios.post(dataURLS.assignTeacherToClassOption, data, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    toast.update(loadingToastId, {
                        render: response?.data?.message || 'Updated Successfully!',
                        type: 'success',
                        isLoading: false,
                        autoClose: 1500,
                    });
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
            }
            )()
        } else if (currState === 'Assign') {
            setCurrState('submit');
        };
    };

    const handleEditAllOptionData = () => {
        if (editMode) {
            (async () => {
                const loadingToastId = toast.loading('Loading...');
                const data = option?.id < 1 ?
                    {
                        class_id: classId,
                        type: type,
                        option_id: selectedUpdateData?.id ? `${selectedUpdateData?.id}` : `${option?.id}`
                    }
                    :
                    {
                        class_id: classId,
                        type: type,
                        class_option_id: `${option?.id}`,
                        option_id: selectedUpdateData?.id ? `${selectedUpdateData?.id}` : `${option?.id}`
                    };
                try {
                    const url = option?.id < 1 ? dataURLS.addOptionToClass : dataURLS.editOptionInsideClass;
                    const response = await axios.post(url, data, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    toast.update(loadingToastId, {
                        render: response?.data?.message || 'Updated Successfully!',
                        type: 'success',
                        isLoading: false,
                        autoClose: 1500,
                    });
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
        } else if (!editMode) {
            setEditMode(true);
        };
    };

    useEffect(() => {
        if (option?.teachers) {
            setSelectedTeachers(option?.teachers);
        };
    }, [option]);

    return (
        <form className="flex justify-between w-full">
            <div>
                {
                    editMode ?
                        (
                            type === 'action' ?
                                (
                                    <select
                                        defaultValue={allActions?.find(action => action.name === option?.name)?.id}
                                        onChange={handleSelectOptionChange}
                                        id="actionSelectedToClass"
                                        className='mb-3 block focus:outline-none appearance-none w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-10 leading-tight focus:shadow-outline'
                                    >
                                        <option value={''} disabled>Select an Action</option>
                                        {
                                            allActions?.map(action => (
                                                <option key={action?.id} value={action?.id}>{action?.name}</option>
                                            ))
                                        }
                                    </select>
                                )
                                :
                                (
                                    <select
                                        defaultValue={allActivities?.find(activity => activity.name === option?.name)?.id}
                                        onChange={handleSelectOptionChange}
                                        id="activitySelectedToClass"
                                        className='mb-3 block focus:outline-none appearance-none w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-10 leading-tight focus:shadow-outline'
                                    >
                                        <option value={''} disabled>Select ab Activity</option>
                                        {
                                            allActivities?.map(activity => (
                                                <option key={activity?.id} value={activity?.id}>{activity?.name}</option>
                                            ))
                                        }
                                    </select>
                                )
                        )
                        :
                        <input id="ActionInput" disabled value={option?.name} className={`bg-gray-50 focus-visible:outline-none focus:outline-none border text-sm rounded-lg block w-full p-2.5`} type="text" />
                }
            </div>
            <div>
                <div className={`flex gap-3`}>
                    <select
                        disabled={currState === 'Assign'}
                        defaultValue={''}
                        onChange={handleSelectTeacherChange}
                        id="teacherSelectedToClass"
                        className='mb-3 block focus:outline-none appearance-none w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-10 leading-tight focus:shadow-outline'
                    >
                        <option value={''} disabled>Select a Teacher</option>
                        {
                            allowedTeachers?.map(teacher => (
                                <option key={teacher?.id} value={teacher?.id}>{teacher?.name}</option>
                            ))
                        }
                    </select>
                    {
                        option?.id >= 1 &&
                        <button
                            onClick={handleAssignTeachers}
                            type={'button'}
                            className={`max-h-fit px-3 flex justify-center items-center ${currState === 'Assign' ? 'hover:bg-white border-blue-700 text-white hover:text-blue-700 rounded-lg bg-blue-700' : 'hover:bg-white text-white hover:text-green-700 rounded-lg bg-green-700 border-green-700'} border-x border-y transition-all duration-300 font-semibold py-3`}
                        >
                            {currState === 'Assign' ? <FaEdit /> : <FaCheck />}
                        </button>
                    }
                </div>
                <div className='flex gap-2'>
                    {
                        selectedTeachers.length > 0 ?
                            selectedTeachers?.map(teacher => (
                                <span key={teacher?.id} className={`px-1 py-1 text-xs bg-blue-600 text-white rounded-sm flex justify-between items-center gap-2 max-w-fit`}>
                                    {teacher?.name}
                                    {
                                        currState !== 'Assign' && (
                                            <FaRegTrashCan onClick={() => handleDeleteAssignedTeacher(teacher?.id)} className='text-white cursor-pointer transition-all duration-300 hover:text-[#ff2020]' />
                                        )
                                    }
                                </span>
                            ))
                            :
                            option?.teachers?.map(teacher => (
                                <span key={teacher?.id} className={`px-1 py-1 text-xs bg-blue-600 text-white rounded-sm flex justify-between items-center gap-2 max-w-fit`}>
                                    {teacher?.name}
                                    {
                                        currState !== 'Assign' && (
                                            <FaRegTrashCan onClick={() => handleDeleteAssignedTeacher(teacher?.id)} className='text-white cursor-pointer transition-all duration-300 hover:text-[#ff2020]' />
                                        )
                                    }
                                </span>
                            ))
                    }
                </div>
            </div>
            <div className={`flex`}>
                <button
                    onClick={handleDeleteActionOrActivity}
                    type="button"
                    className={`text-[#ff2020] py-2 px-4`}
                >
                    <FaRegTrashCan size={22} />
                </button>
                <button
                    onClick={handleEditAllOptionData}
                    type={'button'}
                    className={`${editMode ? 'text-green-700' : 'text-blue-700'} py-2 px-4`}
                >
                    {editMode ? <FaCheck size={22} /> : <FaEdit size={22} />}
                </button>
            </div>
        </form>
    );
};