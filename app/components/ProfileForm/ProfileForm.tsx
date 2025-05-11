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
import Loader from "../Loader/Loader";
import Image from "next/image";

export default function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUserStore();
  const { register, handleSubmit, reset, setError, setValue } =
    useForm<FormAuthInputs>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  let imageInputRef = useState<HTMLInputElement | null>(null)[0];

  useEffect(() => {
    if (user?.image) {
      setPreviewImage(user.image);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      Object.entries(user).forEach(([key, value]) => {
        if (
          key === "name" ||
          key === "phone" ||
          key === "address_ar" ||
          key === "address_en" ||
          key === "description_ar" ||
          key === "description_en" ||
          key === "email" ||
          key === "admin_name"
        ) {
          if (value !== "N/A") {
            setValue(key as keyof FormAuthInputs, value);
          }
        }
      });
    }
  }, [user, setValue]);

  const onSubmit = async (data: FormAuthInputs) => {
    data.image = imageInputRef?.files?.[0];

    const finalData = data.image
      ? {
          phone: data.phone || "",
          address_ar: data.address_ar || "",
          address_en: data.address_en || "",
          description_ar: data.description_ar || "",
          description_en: data.description_en || "",
          image: data.image,
        }
      : {
          phone: data.phone || "",
          address_ar: data.address_ar || "",
          address_en: data.address_en || "",
          description_ar: data.description_ar || "",
          description_en: data.description_en || "",
        };

    await handleMultiPartWebSiteFormData(
      finalData as FormAuthInputs,
      `${baseUrl}/school/update-profile`,
      setError,
      reset
    );
    window.location.reload();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
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
          disabled={field === "admin_name" || field === "email" || field === "name"}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      );
    }
    return <p className="mt-1 text-sm text-gray-900">{getFieldValue(field)}</p>;
  };

  if (!user) {
    return <Loader />;
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
          {isEditing && (
            <div className="w-full flex gap-6 flex-wrap mb-10 space-y-2 relative">
              <Image
                src={previewImage || "/profile.png"}
                alt={user?.name}
                width={200}
                height={200}
                className="rounded-full border border-gray-300 object-cover"
              />

              <div className="flex flex-col justify-center">
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  onChange={handleImageChange}
                  className="hidden"
                  ref={(e) => {
                    register("image").ref(e);
                    imageInputRef = e;
                  }}
                />
                <button
                  type="button"
                  onClick={() => imageInputRef?.click()}
                  className="text-indigo-500 border-indigo-500 border rounded-md px-4 py-2 hover:bg-indigo-500 hover:underline hover:text-white transition-all text-sm"
                >
                  Change Image
                </button>
              </div>
            </div>
          )}
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
