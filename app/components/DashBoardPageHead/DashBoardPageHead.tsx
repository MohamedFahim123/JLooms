"use client";

import { getTokenFromServerCookies } from "@/app/auth/utils/storeTokenOnServer";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import { toast } from "react-toastify";
import MainDashBoardBtn from "../MainDashBoardBtn/MainDashBoardBtn";

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
  defaultValue?: boolean;
}

interface DashBoardPageHeadProps {
  text: string;
  teacherId?: string;
  employeeId?: string;
  btnText?: string;
  btnLink?: string;
  haveBtn?: boolean;
  haveFilter?: boolean;
  filterOptions?: Option[];
  secBtnLink?: string;
  secBtnText?: string;
  haveSecondBtn?: boolean;
}

export default function DashBoardPageHead({
  teacherId,
  employeeId,
  text,
  haveSecondBtn,
  secBtnText,
  secBtnLink,
  btnText,
  btnLink,
  haveBtn,
  haveFilter,
  filterOptions,
}: DashBoardPageHeadProps) {
  const handleUpdateStatus = async (e: {
    target: HTMLSelectElement;
  }): Promise<void> => {
    const { value } = e.target as HTMLSelectElement;
    const token = await getTokenFromServerCookies();

    if (teacherId) {
      const toastId = toast.loading("Loading...");
      const request = await fetch(
        `${dataURLS.updateTeacherStatus}/${teacherId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: value }),
        }
      );
      const res = await request?.json();
      if (res?.status === 200) {
        toast.update(toastId, {
          render: res?.message || "Updated Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
      } else {
        toast.update(toastId, {
          render: res?.message || "Request failed!",
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });
      }
    }

    if (employeeId) {
      const toastId = toast.loading("Loading...");
      const request = await fetch(
        `${dataURLS.updateEmployeeStatus}/${employeeId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: value }),
        }
      );
      const res = await request?.json();
      if (res?.status === 200) {
        toast.update(toastId, {
          render: res?.message || "Updated Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
      } else {
        toast.update(toastId, {
          render: res?.message || "Request failed!",
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });
      }
    }
  };

  return (
    <>
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        {text && (
          <h2 className="text-2xl font-semibold leading-tight">
            {text || "Loading..."}
          </h2>
        )}
        {haveBtn && (
          <div className="flex gap-2">
            <MainDashBoardBtn text={btnText || ""} link={btnLink || ""} />
            {haveSecondBtn && (
              <MainDashBoardBtn
                text={secBtnText || ""}
                link={secBtnLink || ""}
              />
            )}
          </div>
        )}
        {haveFilter && (
          <select
            onChange={handleUpdateStatus}
            defaultValue={
              filterOptions?.find((el) => el.defaultValue === true)?.value
            }
            className="border border-gray-300 rounded-lg py-2 px-3 w-full md:w-auto focus:outline-none focus:border-indigo-500"
          >
            {filterOptions?.map((option, index) => (
              <option
                key={index}
                value={option?.value}
                disabled={option?.disabled}
              >
                {option?.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
}
