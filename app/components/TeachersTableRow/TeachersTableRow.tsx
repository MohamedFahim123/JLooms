"use client";

import { getTokenFromServerCookies } from "@/app/auth/utils/storeTokenOnServer";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import { useLoginnedUserStore } from "@/app/store/useCurrLoginnedUser";
import { TableRowProps } from "@/app/utils/interfaces";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import avatar from "../../imgs/teachers/teacher1.png";

export default function TeachersTableRow({ cell }: TableRowProps) {
  const router = useRouter();
  const { userLoginned, userLoginnedType } = useLoginnedUserStore();

  const handleDelete = () => {
    Swal.fire({
      title: `Do you want to Remove ${cell?.name} ?`,
      showCancelButton: true,
      confirmButtonColor: "#ff2020",
      confirmButtonText: "Yes, Remove",
    }).then(async (result) => {
      const token = await getTokenFromServerCookies();
      if (result.isConfirmed) {
        const res = await axios.delete(
          `${dataURLS.deleteTeacher}/${cell?.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: `${cell?.name} has been removed successfully`,
            showConfirmButton: false,
            timer: 1000,
          });
          window.location.reload();
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to remove teacher",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      }
    });
  };

  return (
    <tr
      key={cell?.id}
      className="border-b hover:bg-gray-100 cursor-pointer md:table-row grid grid-cols-1 md:grid-cols-4 gap-2 p-3 md:p-0"
    >
      <td
        className="py-3 px-4"
        onClick={() => router.push(`/dashboard/teachers/${cell?.id}`)}
      >
        <Link
          href={`/dashboard/teachers/${cell?.id}`}
          className="whitespace-nowrap flex items-center gap-3"
        >
          {cell.image && (
            <Image
              src={cell?.image || avatar}
              alt={`${cell?.name}'s avatar`}
              width={30}
              height={30}
              className="rounded-full"
            />
          )}
          <span className="block md:hidden font-semibold text-gray-500">
            Name:
          </span>
          {cell.name}
        </Link>
      </td>
      <td
        className="py-3 px-4"
        onClick={() => router.push(`/dashboard/teachers/${cell?.id}`)}
      >
        <span className="block md:hidden font-semibold text-gray-500">
          Phone:
        </span>
        {cell.phone}
      </td>
      <td
        className="py-3 px-4"
        onClick={() => router.push(`/dashboard/teachers/${cell?.id}`)}
      >
        <span className="block md:hidden font-semibold text-gray-500">
          Email:
        </span>
        {cell.email}
      </td>
      <td
        className="py-3 px-4"
        onClick={() => router.push(`/dashboard/teachers/${cell?.id}`)}
      >
        <span className="block md:hidden font-semibold text-gray-500">
          Status:
        </span>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            cell.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-600"
          }`}
        >
          {cell.status}
        </span>
      </td>
      {userLoginnedType === "Admin" ? (
        <td className="py-3 px-4 cursor-default">
          <span className={`px-2 py-1 text-xs font-semibold text-red-600`}>
            <MdDelete
              onClick={handleDelete}
              size={20}
              className="cursor-pointer"
            />
          </span>
        </td>
      ) : (
        userLoginned?.permissions?.includes("Delete Teachers") && (
          <td className="py-3 px-4 cursor-default">
            <span className={`px-2 py-1 text-xs font-semibold text-red-600`}>
              <MdDelete
                onClick={handleDelete}
                size={20}
                className="cursor-pointer"
              />
            </span>
          </td>
        )
      )}
    </tr>
  );
}
