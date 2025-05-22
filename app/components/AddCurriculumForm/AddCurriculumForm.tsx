"use client";

import { FormAuthInputs } from "@/app/auth/utils/interfaces";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import { useCurriculumsDataStore } from "@/app/store/CurriculumData";
import { useActionsAndActivityStore } from "@/app/store/getActivitiesAndActions";
import { useClassesStore } from "@/app/store/getAllClasses";
import { handleMultiPartWebSiteFormData } from "@/app/utils/submitFormData";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const AddCurriculumForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormAuthInputs>();

  const {
    types,
    categories,
    subCategories,
    dataLoading,
    getTypes,
    getCategories,
    getSubCategories,
    dataTypesError,
    dataCatError,
    dataSubCatError,
  } = useCurriculumsDataStore();

  const getAllTypes = useCallback(() => {
    if (types.length === 0 && !dataLoading && !dataTypesError) {
      getTypes();
    }
  }, [dataLoading, dataTypesError, getTypes, types.length]);

  useEffect(() => {
    const type = watch("type_id");
    if (type && !dataCatError) {
      getCategories(type);
    }
  }, [dataCatError, getCategories, watch]);
  useEffect(() => {
    const category = watch("category_id");
    if (category && !dataSubCatError) {
      getSubCategories(category);
    }
  }, [dataSubCatError, getSubCategories, watch]);

  useEffect(() => {
    getAllTypes();
  }, [getAllTypes]);

  const { classes } = useClassesStore();
  const { activities } = useActionsAndActivityStore();

  const [milestoneRows, setMilestoneRows] = useState([
    {
      id: Date.now(),
      custom: "",
      milestones: [] as string[],
      selectedOptions: { count: false, digits: false },
    },
  ]);

  const handleAddRow = () => {
    setMilestoneRows((prev) => [
      ...prev,
      {
        id: Date.now(),
        custom: "",
        milestones: [],
        selectedOptions: { count: false, digits: false },
      },
    ]);
  };

  const toggleOption = (index: number, option: "count" | "digits") => {
    const newRows = [...milestoneRows];
    newRows[index].selectedOptions[option] =
      !newRows[index].selectedOptions[option];
    setMilestoneRows(newRows);
  };

  const handleCustomChange = (index: number, value: string) => {
    const newRows = [...milestoneRows];
    newRows[index].custom = value;
    setMilestoneRows(newRows);
  };

  const handleAddCustomMilestone = (index: number) => {
    const newRows = [...milestoneRows];
    const trimmed = newRows[index].custom.trim();
    if (trimmed && !newRows[index].milestones.includes(trimmed)) {
      newRows[index].milestones.push(trimmed);
      newRows[index].custom = "";
      setMilestoneRows(newRows);
    }
  };
  const onSubmit: SubmitHandler<FormAuthInputs> = (data) => {
    handleMultiPartWebSiteFormData(
      data,
      dataURLS.addCurriculum,
      setError,
      reset
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-dark">
          Curriculum Name
        </label>
        <input
          type="text"
          placeholder="Curriculum Name"
          {...register("name_en", { required: "Name is required" })}
          className={`${
            errors?.name_en ? "border-red-500" : ""
          } w-full px-4 py-2 border rounded-md focus:outline-none`}
          defaultValue=""
        />
        {errors.name_en && (
          <p className="text-red-500 text-sm">{errors.name_en.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-dark">
          Select Class
        </label>
        <select
          {...register("class", { required: "Class is required" })}
          className={`${
            errors?.class ? "border-red-500" : ""
          } w-full px-4 py-2 border rounded-md focus:outline-none`}
          defaultValue=""
        >
          <option value="" disabled>
            Select Class
          </option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.class && (
          <p className="text-red-500 text-sm">{errors.class.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-dark">
          Select Activity
        </label>
        <select
          {...register("activity_id", { required: "Activity is required" })}
          className={`${
            errors?.activity_id ? "border-red-500" : ""
          } w-full px-4 py-2 border rounded-md focus:outline-none`}
          defaultValue=""
        >
          <option value="" disabled>
            Select Activity
          </option>
          {activities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.activity_id && (
          <p className="text-red-500 text-sm">{errors.activity_id.message}</p>
        )}
      </div>
      <div className="space-y-6">
        {milestoneRows.map((row, index) => (
          <div
            key={row.id}
            className="items-center border-b border-indigo-500 py-4"
          >
            <h3 className="text-lg font-semibold mb-3">
              Milestone #{index + 1}
            </h3>
            <div className="grid md:grid-cols-3 gap-4 my-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-dark">
                  Curriculum Type
                </label>
                <select
                  {...register("type_id", { required: "Type is required" })}
                  className={`${
                    errors?.type_id ? "border-red-500" : ""
                  } w-full px-4 py-2 border rounded-md focus:outline-none`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  {types.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                {errors.type_id && (
                  <p className="text-red-500 text-sm">
                    {errors.type_id.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-dark">
                  Curriculum Category
                </label>
                <select
                  {...register("category_id", {
                    required: "Category is required",
                  })}
                  className={`${
                    errors?.category_id ? "border-red-500" : ""
                  } w-full px-4 py-2 border rounded-md focus:outline-none`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <p className="text-red-500 text-sm">
                    {errors.category_id.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-dark">
                  Curriculum Sub-Category
                </label>
                <select
                  {...register("curriculum_sub_category_id", {
                    required: "Sub-Category is required",
                  })}
                  className={`${
                    errors?.curriculum_sub_category_id ? "border-red-500" : ""
                  } w-full px-4 py-2 border rounded-md focus:outline-none`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Sub-Category
                  </option>
                  {subCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.curriculum_sub_category_id && (
                  <p className="text-red-500 text-sm">
                    {errors.curriculum_sub_category_id.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => toggleOption(index, "count")}
                className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 ${
                  row.selectedOptions.count
                    ? "bg-indigo-500 text-white border-indigo-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                Count Until 10
              </button>
              <button
                type="button"
                onClick={() => toggleOption(index, "digits")}
                className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 ${
                  row.selectedOptions.digits
                    ? "bg-indigo-500 text-white border-indigo-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                Add 2 Digits
              </button>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <input
                type="text"
                placeholder="Add your own"
                value={row.custom}
                onChange={(e) => handleCustomChange(index, e.target.value)}
                className="flex-grow px-4 py-2 border rounded-md focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleAddCustomMilestone(index)}
                className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 hover:bg-green-800"
              >
                +
              </button>
            </div>

            <div className="col-span-3 flex flex-wrap gap-2 mt-2">
              {row.milestones.map((milestone, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 text-sm px-3 py-1 rounded-full"
                >
                  {milestone}
                </span>
              ))}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddRow}
          className="bg-green-700 transition-all duration-300 text-white px-4 py-2 rounded hover:bg-green-800 text-sm"
        >
          Add Another Milestone
        </button>
      </div>

      <button
        type="submit"
        className="bg-indigo-500 transition-all duration-300 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded"
      >
        Add Curriculum
      </button>
    </form>
  );
};

export default AddCurriculumForm;
