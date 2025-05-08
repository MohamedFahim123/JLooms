"use client";

import { getTokenFromServerCookies } from "@/app/auth/utils/storeTokenOnServer";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import { TableRowProps } from "@/app/utils/interfaces";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const RolesTableRow = ({ cell }: TableRowProps) => {
  const router = useRouter();

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
          `${dataURLS.deleteRole}/${cell?.id}`,
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
            title: "Failed to remove Role",
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
        className="py-3 px-4 cursor-pointer"
        onClick={() => router.push(`/dashboard/roles/${cell?.id}`)}
      >
        <span className="block md:hidden font-semibold text-gray-500">
          Name:
        </span>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold`}
        >
          {cell?.name}
        </span>
      </td>
      <td className="py-3 px-4 cursor-default">
        <span className={`px-2 py-1 text-xs font-semibold text-red-600`}>
          <MdDelete
            onClick={handleDelete}
            size={20}
            className="cursor-pointer"
          />
        </span>
      </td>
    </tr>
  );
};

export default RolesTableRow;
