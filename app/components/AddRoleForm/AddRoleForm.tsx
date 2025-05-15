"use client";

import { FormAuthInputs } from "@/app/auth/utils/interfaces";
import { getTokenFromServerCookies } from "@/app/auth/utils/storeTokenOnServer";
import { handleError } from "@/app/auth/utils/submitJson";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export interface Permission {
  id: number;
  name: string;
}

const AddRoleForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormAuthInputs>({
    defaultValues: {
      name: "",
      permission_id: [],
    },
  });

  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const selectedPermissions = watch("permission_id");

  const fetchPermissions = async (page = 1) => {
    try {
      setLoading(true);
      const token = await getTokenFromServerCookies();
      const res = await fetch(`${dataURLS.allPermissions}?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setPermissions(data?.data?.permissions || []);
      setCurrentPage(data?.data?.meta?.current_page || 1);
      setLastPage(data?.data?.meta?.last_page || 1);
    } catch (error) {
      console.error("Failed to fetch permissions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions(currentPage);
  }, [currentPage]);

  const onCheckboxChange = (id: number) => {
    const updated = selectedPermissions.includes(id)
      ? selectedPermissions.filter((pid) => pid !== id)
      : [...selectedPermissions, id];
    setValue("permission_id", updated);
  };

  const onSubmit: SubmitHandler<FormAuthInputs> = async (
    data: FormAuthInputs
  ) => {
    const token = await getTokenFromServerCookies();
    const loadingToastId: string | number = toast.loading("Loading...");

    try {
      const response = await axios.post(dataURLS.addRole, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.update(loadingToastId, {
        render: response?.data?.message || "Request succeeded!",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });
      reset();
    } catch (error) {
      handleError(error, setError, loadingToastId);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= lastPage) {
      fetchPermissions(page);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white shadow-md rounded-lg p-6"
    >
      <h2 className="text-xl font-semibold mb-6">Add New Role</h2>

      {/* Role Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Role Name</label>
        <input
          type="text"
          {...register("name", { required: "Role name is required" })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="Enter role name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Permissions List */}
      <div className="border-t border-gray-200 mt-6 pt-4">
        <div className="grid grid-cols-12 font-semibold text-gray-600 px-2 py-3 border-b border-gray-200">
          <div className="col-span-1">#</div>
          <div className="col-span-8">Permission</div>
          <div className="col-span-3 text-center">Select</div>
        </div>

        {loading ? (
          <div className="flex justify-center py-6 min-h-[600px] items-center">
            <svg
              className="animate-spin h-6 w-6 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
        ) : (
          permissions.map((permission, index) => (
            <div
              key={permission.id}
              className="grid grid-cols-12 items-center px-2 py-3 border-b border-gray-100"
            >
              <div className="col-span-1 text-sm">
                {(currentPage - 1) * 15 + index + 1}.
              </div>
              <div className="col-span-8 text-sm">{permission.name}</div>
              <div className="col-span-3 flex items-center justify-center gap-2">
                <div
                  className="relative inline-block w-12 h-6"
                  onClick={() => onCheckboxChange(permission.id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(permission.id)}
                    className="sr-only peer"
                    readOnly
                  />
                  <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-indigo-500 transition-colors"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-6"></div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center items-center space-x-4">
        <button
          type="button"
          disabled={currentPage === 1 || loading}
          onClick={() => goToPage(currentPage - 1)}
          className={`px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 transition 
            ${
              currentPage === 1 || loading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
        >
          Previous
        </button>

        <span className="text-sm">
          Page {currentPage} of {lastPage}
        </span>

        <button
          type="button"
          disabled={currentPage === lastPage || loading}
          onClick={() => goToPage(currentPage + 1)}
          className={`px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 transition 
      ${
        currentPage === lastPage || loading
          ? "opacity-50 cursor-not-allowed"
          : ""
      }`}
        >
          Next
        </button>
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-right">
        <button
          type="submit"
          disabled={loading || isSubmitting}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Save Role
        </button>
      </div>
    </form>
  );
};

export default AddRoleForm;
