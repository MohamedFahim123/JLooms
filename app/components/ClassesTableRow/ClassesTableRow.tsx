"use client"


import Image from "next/image";
import Link from "next/link";
import avatar from '../../imgs/teachers/teacher1.png';
import { TableRowProps } from "@/app/utils/interfaces";
import { useRouter } from "next/navigation";

export default function ClassesTableRow({ cell }: TableRowProps) {
    const router = useRouter();

    return (
        <tr
            key={cell?.id}
            onClick={() => router.push(`/dashboard/classes/${cell?.id}`)}
            className="border-b hover:bg-gray-100 cursor-pointer md:table-row grid grid-cols-1 md:grid-cols-4 gap-2 p-3 md:p-0"
        >
            <td className="py-3 px-4 flex items-center gap-3">
                <Link href={`/dashboard/classes/${cell?.id}`} className="whitespace-nowrap flex items-center gap-3">
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
                    {cell.className}
                </Link>
            </td>
            <td className="py-3 px-4">
                <span className="block md:hidden font-semibold text-gray-500">Class:</span>
                {cell.floor}
            </td>
            <td className="py-3 px-4">
                <span className="block md:hidden font-semibold text-gray-500">Subject:</span>
                {cell.numberOfStudents}
            </td>
        </tr>
    );
};