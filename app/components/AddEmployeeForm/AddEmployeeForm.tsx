"use client";

import {
  CustomEmailInput,
  CustomPasswordInput,
  CustomPhoneNumberInput,
} from "@/app/auth/utils/customInputsValues";
import { FormAuthInputs, Validation } from "@/app/auth/utils/interfaces";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import { useRulesStore } from "@/app/store/getAllRules";
import { handleMultiPartWebSiteFormData } from "@/app/utils/submitFormData";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomFileInput from "../CustomFileInput/CustomFileInput";
import CustomeInput from "../CustomInput/CustomeInput";
import { useCountriesStore } from "@/app/store/getAllCountries";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "@/app/utils/baseUrl";
import { getTokenFromServerCookies } from "@/app/auth/utils/storeTokenOnServer";

interface EmployeeInput {
  lableName: string;
  name: keyof FormAuthInputs;
  placeholder: string;
  type: string;
  validation?: Validation;
}

const AddEmployeeForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormAuthInputs>();
  const name: EmployeeInput = {
    lableName: "Full Name",
    name: "name",
    placeholder: "Enter Full Name",
    type: "text",
    validation: {
      required: "Name is Required",
    },
  };

  const watchValues = watch();

  const Inputs: EmployeeInput[] = [
    {
      lableName: "Employee Title",
      name: "title",
      placeholder: "Employee Title",
      type: "text",
      validation: {
        required: "Employee Title is Required",
      },
    },
    CustomPhoneNumberInput,
    CustomEmailInput,
    CustomPasswordInput,
    {
      lableName: "Employee Picture",
      name: "image",
      placeholder: "employee picture",
      type: "file",
      validation: {
        required: "Employee Picture is Required",
      },
    },
  ];

  const onSubmit: SubmitHandler<FormAuthInputs> = (data) => {
    handleMultiPartWebSiteFormData(data, dataURLS.addEmployee, setError, reset);
  };

  const { rules } = useRulesStore();
  const { countries } = useCountriesStore();
  const [currCitiesInsideCountry, setCurrCitiesInsideCountry] = useState<
    { id: number; name: string }[]
  >([]);

  const handleCountryChange = async (countryId: number | string) => {
    const toastLoading = toast.loading("Loading cities...");
    if (countryId) {
      setValue("country_id", countryId as string);
      setValue("city_id", "");
      const token = await getTokenFromServerCookies();
      try {
        const response = await axios.get(
          `${baseUrl}/show-country/${countryId}?t=${Date.now()}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.status === 200) {
          toast.dismiss(toastLoading);
          setCurrCitiesInsideCountry(response?.data?.data?.cities);
        }
      } catch (error) {
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.message || "Something went wrong!"
          : "An unexpected error occurred.";
        toast.dismiss(toastLoading);
        toast.error(errorMessage);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 mt-5">
      <CustomeInput
        name={name.name}
        placeHolder={name.placeholder}
        register={register}
        error={errors}
        type={name.type}
        lable={name.lableName}
        id={`addTeacher${name.name}`}
        validation={name.validation}
      />
      <div>
        <label
          htmlFor="addTeacherRole"
          className={`block mb-2 text-sm font-medium dark:text-white`}
        >
          Employee Role
        </label>
        <select
          {...register("role_id", {
            required: "Employee Role is Required",
          })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          id="addTeacherRole"
          defaultValue={""}
        >
          <option value="" disabled>
            Select Role
          </option>
          {rules.map((role) => (
            <option key={role?.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="addTeacherCountry"
            className={`block mb-2 text-sm font-medium dark:text-white`}
          >
            Country
          </label>
          <select
            {...register("country_id", {
              required: "Employee Country is Required",
            })}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            id="addTeacherCountry"
            defaultValue={""}
          >
            <option value="" disabled>
              Select Country
            </option>
            {countries.map((country) => (
              <option key={country?.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="addTeacherCity"
            className={`block mb-2 text-sm font-medium dark:text-white`}
          >
            city
          </label>
          <select
            {...register("city_id", {
              required: "Employee city is Required",
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            id="addTeacherCity"
            defaultValue={watchValues?.city_id ? watchValues?.city_id : ""}
          >
            <option value="" disabled>
              Select City
            </option>
            {currCitiesInsideCountry?.map((city) => (
              <option key={city?.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {Inputs?.map((input) =>
        input?.type === "file" ? (
          <CustomFileInput
            key={input.name}
            name={input.name}
            placeHolder={input.placeholder}
            register={register}
            error={errors}
            type={input.type}
            lable={input.lableName}
            id={`addTeacher${input.name}`}
            validation={input.validation}
            fileUploaded={
              (watchValues[input.name] as unknown as FileList)?.length > 0
            }
          />
        ) : (
          <CustomeInput
            key={input.name}
            name={input.name}
            placeHolder={input.placeholder}
            register={register}
            error={errors}
            type={input.type}
            lable={input.lableName}
            id={`addParent${input.name}`}
            validation={input.validation}
          />
        )
      )}

      <button
        type="submit"
        className="bg-indigo-500 transition-all duration-300 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded"
      >
        Add Parent
      </button>
    </form>
  );
};

export default AddEmployeeForm;
