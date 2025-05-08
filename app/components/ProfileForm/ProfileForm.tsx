"use client";
import { FormAuthInputs } from "@/app/auth/utils/interfaces";
import {
    UserInterface,
    useUserStore,
} from "@/app/store/getLoginnedUserProfile";
import { baseUrl } from "@/app/utils/baseUrl";
import { handleMultiPartWebSiteFormData } from "@/app/utils/submitFormData";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUserStore();
  const { register, handleSubmit, reset, setError, setValue } =
    useForm<FormAuthInputs>();

  useEffect(() => {
    if (user) {
      Object.entries(user).forEach(([key, value]) => {
        setValue(key as keyof FormAuthInputs, value);
      });
    }
  }, [user, setValue]);

  const onSubmit = async (data: FormAuthInputs) => {
    handleMultiPartWebSiteFormData(
      data,
      `${baseUrl}/school/update-profile`,
      setError,
      reset
    );
  };

  

  const handleCancel = () => {
    if (user) {
      reset({
        name: user?.name,
        phone: user?.phone,
        address_ar: user?.address_ar,
        address_en: user?.address_en,
        description_ar: user?.description_ar,
        description_en: user?.description_en,
        email: user?.email,
        admin_name: user?.admin_name,
      });
    }
    setIsEditing(false);
  };

  const getFieldValue = (field: keyof UserInterface) => {
    return user?.[field] && user[field] !== "N/A" ? user[field] : "";
  };

  const renderField = (
    field: keyof UserInterface,
    _label: string,
    isTextarea = false
  ) => {
    if (isEditing) {
      return isTextarea ? (
        <textarea
          {...register(field as keyof FormAuthInputs)}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      ) : (
        <input
          {...register(field as keyof FormAuthInputs)}
          type={field === "email" ? "email" : "text"}
          disabled={field === "admin_name" || field === "email"}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      );
    }
    return <p className="mt-1 text-sm text-gray-900">{getFieldValue(field)}</p>;
  };

  if (!user) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <p>Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">School Profile</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Edit Profile
            </button>
          ) : (
            <div className="space-x-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="px-6 py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-md font-semibold text-gray-700">
                School Name
              </label>
              {renderField("name", "School Name")}
            </div>
            <div>
              <label className="block text-md font-semibold text-gray-700">
                Admin Name
              </label>
              {renderField("admin_name", "Admin Name")}
            </div>
            <div>
              <label className="block text-md font-semibold text-gray-700">
                Email
              </label>
              {renderField("email", "Email")}
            </div>
            <div>
              <label className="block text-md font-semibold text-gray-700">
                Phone
              </label>
              {renderField("phone", "Phone")}
            </div>
            <div>
              <label className="block text-md font-semibold text-gray-700">
                Address (English)
              </label>
              {renderField("address_en", "Address (English)")}
            </div>
            <div>
              <label className="block text-md font-semibold text-gray-700">
                Address (Arabic)
              </label>
              {renderField("address_ar", "Address (Arabic)")}
            </div>
            <div>
              <label className="block text-md font-semibold text-gray-700">
                Description (English)
              </label>
              {renderField("description_en", "Description (English)", true)}
            </div>
            <div>
              <label className="block text-md font-semibold text-gray-700">
                Description (Arabic)
              </label>
              {renderField("description_ar", "Description (Arabic)", true)}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
