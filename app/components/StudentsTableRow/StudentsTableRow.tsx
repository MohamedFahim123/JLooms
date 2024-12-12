"use client";

import { TableRowProps } from "@/app/utils/interfaces";
import Image from "next/image";
import Link from "next/link";
import avatar from '../../imgs/teachers/teacher1.png';
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import Cookies from 'js-cookie';
import { MdDelete } from "react-icons/md";


export default function StudentsTableRow({ cell }: TableRowProps) {
    const router = useRouter();

    const handleDelete = () => {
        Swal.fire({
            title: `Do you want to Remove ${cell?.name} ?`,
            showCancelButton: true,
            confirmButtonColor: '#ff2020',
            confirmButtonText: "Yes, Remove",
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axios.delete(
                        `${dataURLS.deleteStudent}/${cell?.id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${Cookies.get('SERVER_JLOOMS_TOKEN')}`,
                        }
                    })
                    if (res.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: `${cell?.name} has been removed successfully`,
                            showConfirmButton: false,
                            timer: 1000,
                        });
                        window.location.reload();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed to remove class',
                            showConfirmButton: false,
                            timer: 1000,
                        });
                    };
                };
            });
    };

    return (
        <tr
            key={cell?.id}
            className="border-b hover:bg-gray-100 cursor-pointer md:table-row grid grid-cols-1 md:grid-cols-4 gap-2 p-3 md:p-0"
        >
            <td
                onClick={() => router.push(`/dashboard/students/${cell?.id}`)}
                className="py-3 px-4"
            >
                <Link href={`/dashboard/students/${cell?.id}`} className="whitespace-nowrap flex items-center gap-3">
                    {
                        cell.image &&
                        <Image
                            src={cell?.image || avatar}
                            alt={`${cell?.name}'s avatar`}
                            width={30}
                            height={30}
                            className="rounded-full"
                        />
                    }
                    <span className="block md:hidden font-semibold text-gray-500">Name:</span>
                    {cell.name}
                </Link>
            </td>
            <td
                onClick={() => router.push(`/dashboard/students/${cell?.id}`)}
                className="py-3 px-4"
            >
                <span className="block md:hidden font-semibold text-gray-500">Class:</span>
                {cell.gender}
            </td>
            <td
                onClick={() => router.push(`/dashboard/students/${cell?.id}`)}
                className="py-3 px-4"
            >
                <span className="block md:hidden font-semibold text-gray-500">Subject:</span>
                {cell.class_name === 'N/A' ? "didn't join any class yet!" : cell.class_name}
            </td>
            <td
                onClick={() => router.push(`/dashboard/students/${cell?.id}`)}
                className="py-3 px-4"
            >
                <span className="block md:hidden font-semibold text-gray-500">Subject:</span>
                {cell.birth_date}
            </td>
            <td className="py-3 px-4 cursor-default">
                <span
                    className={`px-2 py-1 text-xs font-semibold text-red-600`}>
                    <MdDelete onClick={handleDelete} size={20} className="cursor-pointer" />
                </span>
            </td>
        </tr>
    );
};