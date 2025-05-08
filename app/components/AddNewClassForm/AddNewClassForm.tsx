"use client";

import { FormAuthInputs, Validation } from "@/app/auth/utils/interfaces";
import { getTokenFromServerCookies } from "@/app/auth/utils/storeTokenOnServer";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import { Action, Activity } from "@/app/dashboard/utils/interfaces";
import axios from "axios";
import { useCallback, useEffect } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";
import styles from "./addNewClassForm.module.css";

interface ClassInput {
  lableName: string;
  name: keyof FormAuthInputs;
  placeholder: string;
  type: string;
  validation?: Validation;
}

export interface FormDefaultValues {
  name_en: string;
  actions: Array<{ id: string }>;
  activities: Array<{ id: string }>;
}

interface AddNewClassFormProps {
  actions: Action[];
  activities: Activity[];
}

export default function AddNewClassForm({
  actions,
  activities,
}: AddNewClassFormProps) {
  const {
    control,
    handleSubmit,
    register,
    clearErrors,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormDefaultValues>({
    defaultValues: {
      name_en: "",
      actions: [{ id: "" }],
      activities: [{ id: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "actions",
  });

  const {
    fields: actFields,
    append: appendOnAct,
    remove: removeAct,
  } = useFieldArray({
    control,
    name: "activities",
  });

  const classNameInput: ClassInput = {
    lableName: "Class Name",
    name: "name_en",
    placeholder: "Class Name",
    type: "text",
    validation: {
      required: "Class Name is Required",
    },
  };

  useEffect(() => {
    if (errors.activities) {
      clearErrors("activities");
    } else if (errors.actions) {
      clearErrors("actions");
    }
  }, [clearErrors, errors]);

  const handleAddAction = useCallback(() => append({ id: "" }), [append]);
  const handleAddActivity = useCallback(
    () => appendOnAct({ id: "" }),
    [appendOnAct]
  );

  const onSubmit: SubmitHandler<FormDefaultValues> = async (
    data: FormDefaultValues
  ) => {
    const formattedData = {
      name_en: data.name_en,
      actions: data.actions.map((action) => action.id),
      activities: data.activities.map((activity) => activity.id),
    };
    const token = await getTokenFromServerCookies();
    const loadingToastId: string | number = toast.loading("Loading...");
    try {
      const response = await axios.post(dataURLS.addNewClass, formattedData, {
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
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Something went wrong!"
        : "An unexpected error occurred.";

      toast.update(loadingToastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });

      if (axios.isAxiosError(error) && error?.response?.data?.errors) {
        const errorDetails = error.response.data.errors;
        Object.entries(errorDetails).forEach(([field, messages]) => {
          const messageArray = Array.isArray(messages) ? messages : [messages];
          setError(field as keyof FormDefaultValues, {
            type: "manual",
            message: messageArray[0],
          });
          toast.error(messageArray[0], {
            autoClose: 3000,
          });
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white rounded-lg shadow-md"
    >
      <div
        key={classNameInput.name}
        className={`mb-4 ${styles.inputContainer}`}
      >
        <label
          htmlFor="addNewClassName"
          className={`${styles.authLable} block mb-2 text-sm font-medium dark:text-white`}
        >
          {classNameInput.lableName}
        </label>
        <input
          type={classNameInput.type}
          id="addNewClassName"
          placeholder={classNameInput.placeholder}
          {...register("name_en", classNameInput.validation)}
          className={`${
            styles.formInput
          } transition-all duration-300 focus:border-indigo-600 hover:border-indigo-600 ${
            errors?.name_en ? styles.errorInput : "border-gray-300"
          } bg-gray-50 border text-sm rounded-lg block w-full p-2.5`}
        />
        {errors?.name_en && (
          <p className={`${styles.error} text-red-500 text-xs`}>
            {errors.name_en?.message as string}
          </p>
        )}
      </div>
      <div>
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="flex items-end justify-between gap-4 mb-4"
          >
            <div className="w-full">
              <label className="block text-sm font-medium mt-3 text-gray-600">
                Action #{index + 1}
              </label>
              <Controller
                name={`actions.${index}.id`}
                control={control}
                defaultValue={item.id}
                render={({ field }) => (
                  <select
                    {...field}
                    className="mt-2 w-full transition-all duration-300 focus:border-indigo-600 hover:border-indigo-600 p-2 border rounded-lg outline-none"
                  >
                    <option value="" disabled>
                      Choose Action
                    </option>
                    {actions.map((action) => (
                      <option key={action.id} value={action.id}>
                        {action.action}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2 transition-all duration-300 hover:bg-red-600"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mb-4">
        <button
          type="button"
          onClick={handleAddAction}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
        >
          Add Action
        </button>
      </div>
      <div>
        {actFields.map((item, index) => (
          <div
            key={item.id}
            className="flex items-end justify-between gap-4 mb-4"
          >
            <div className="w-full">
              <label className="block text-sm font-medium mt-3 text-gray-600">
                Activity #{index + 1}
              </label>
              <Controller
                name={`activities.${index}.id`}
                control={control}
                defaultValue={item.id}
                render={({ field }) => (
                  <select
                    {...field}
                    className="mt-2 w-full transition-all duration-300 focus:border-indigo-600 hover:border-indigo-600 p-2 border rounded-lg outline-none"
                  >
                    <option value="" disabled>
                      Choose Activity
                    </option>
                    {activities.map((activity) => (
                      <option key={activity.id} value={activity.id}>
                        {activity.name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeAct(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2 transition-all duration-300 hover:bg-red-600"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mb-4">
        <button
          type="button"
          onClick={handleAddActivity}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
        >
          Add Activity
        </button>
      </div>
      <div className="mt-5 flex justify-center">
        <button
          type="submit"
          className="bg-indigo-500 transition-all duration-300 hover:bg-indigo-600 text-white font-medium py-3 px-10 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
