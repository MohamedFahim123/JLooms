"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormAuthInputs } from "@/app/auth/utils/interfaces";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import { useClassesStore } from "@/app/store/getAllClasses";
import { handleMultiPartWebSiteFormData } from "@/app/utils/submitFormData";

const AddCurriculumForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormAuthInputs>();

  const { classes } = useClassesStore();

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
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-dark">
            Curriculum Type
          </label>
          <select
            {...register("type", { required: "Type is required" })}
            className={`${
              errors?.type ? "border-red-500" : ""
            } w-full px-4 py-2 border rounded-md focus:outline-none`}
            defaultValue=""
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="subject">Subject</option>
            <option value="activity">Activity</option>
            <option value="action">Action</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-dark">
            Curriculum Category
          </label>
          <select
            {...register("topic", { required: "Topic is required" })}
            className={`${
              errors?.topic ? "border-red-500" : ""
            } w-full px-4 py-2 border rounded-md focus:outline-none`}
            defaultValue=""
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="subject">Subject</option>
            <option value="activity">Activity</option>
            <option value="action">Action</option>
          </select>
          {errors.topic && (
            <p className="text-red-500 text-sm">{errors.topic.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-dark">
            Curriculum Sub-Category
          </label>
          <select
            {...register("topic", { required: "Topic is required" })}
            className={`${
              errors?.topic ? "border-red-500" : ""
            } w-full px-4 py-2 border rounded-md focus:outline-none`}
            defaultValue=""
          >
            <option value="" disabled>
              Select Sub-Category
            </option>
            <option value="subject">Subject</option>
            <option value="activity">Activity</option>
            <option value="action">Action</option>
          </select>
          {errors.topic && (
            <p className="text-red-500 text-sm">{errors.topic.message}</p>
          )}
        </div>
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
