"use client";

import { getTokenFromServerCookies } from "@/app/auth/utils/storeTokenOnServer";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import { TableRowProps } from "@/app/utils/interfaces";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import avatar from "../../imgs/teachers/teacher1.png";
import { useLoginnedUserStore } from "@/app/store/useCurrLoginnedUser";

export default function StudentsTableRow({ cell }: TableRowProps) {
  const router = useRouter();
  const { userLoginned } = useLoginnedUserStore();

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
          `${dataURLS.deleteStudent}/${cell?.id}`,
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
            title: "Failed to remove class",
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
        onClick={() => router.push(`/dashboard/students/${cell?.id}`)}
        className="py-3 px-4"
      >
        <Link
          href={`/dashboard/students/${cell?.id}`}
          className="whitespace-nowrap flex items-center gap-3"
        >
          {cell?.image && (
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
          {cell?.name}
        </Link>
      </td>
      <td
        onClick={() => router.push(`/dashboard/students/${cell?.id}`)}
        className="py-3 px-4"
      >
        <span className="block md:hidden font-semibold text-gray-500">
          Class:
        </span>
        {cell?.class_name === "N/A"
          ? "didn't join any class yet!"
          : cell?.class_name}
      </td>
      <td className={`py-3 px-4 cursor-default`}>
        {cell?.has_parents ? (
          <>
            <span className={`block md:hidden font-semibold text-gray-500`}>
              parent:
            </span>
            Assigned
          </>
        ) : (
          <>
            <span
              className={`block md:hidden font-semibold text-blue-700 underline cursor-pointer`}
            >
              parent:
            </span>
            <span
              onClick={() => {
                if (userLoginned?.permissions?.includes("Assign Parents")) {
                  if (cell?.id) {
                    Cookies.set("student_id", `${cell?.id}`);
                    router.push(
                      `/dashboard/students/${cell?.id}/assign-parent`
                    );
                  }
                }
              }}
              className="text-blue-700 underline cursor-pointer"
            >
              Assign parent
            </span>
          </>
        )}
      </td>
      {userLoginned?.permissions?.includes("Delete Students") && (
        <td className="py-3 px-4 cursor-default">
          <span className={`px-2 py-1 text-xs font-semibold text-red-600`}>
            <MdDelete
              onClick={handleDelete}
              size={20}
              className="cursor-pointer"
            />
          </span>
        </td>
      )}
    </tr>
  );
}
