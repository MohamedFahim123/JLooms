"use client";
import { FormAuthInputs } from "@/app/auth/utils/interfaces";
import { getTokenFromServerCookies } from "@/app/auth/utils/storeTokenOnServer";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import { MileStone, useCurriculumsDataStore } from "@/app/store/CurriculumData";
import { useActionsAndActivityStore } from "@/app/store/getActivitiesAndActions";
import { useClassesStore } from "@/app/store/getAllClasses";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";

type Row = {
  milestones: MileStone[];
  selectedMilestoneId?: number;
  isCustomMilestone?: boolean;
  id: number;
  custom: string;
  typeId: string;
  categoryId: string;
  subCategoryId: string;
  localCategories: { id: number; name: string }[];
  localSubCategories: { id: number; name: string }[];
};

const AddCurriculumForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormAuthInputs>();

  const {
    types,
    dataLoading,
    getTypes,
    getCategories,
    getSubCategories,
    getMileStones,
    dataTypesError,
    loadingMileStones,
  } = useCurriculumsDataStore();

  const { classes } = useClassesStore();
  const { activities } = useActionsAndActivityStore();

  const [milestoneRows, setMilestoneRows] = useState<Row[]>([
    {
      id: Date.now(),
      custom: "",
      milestones: [],
      typeId: "",
      categoryId: "",
      subCategoryId: "",
      localCategories: [] as { id: number; name: string }[],
      localSubCategories: [] as { id: number; name: string }[],
    },
  ]);

  const getAllTypes = useCallback(() => {
    if (types.length === 0 && !dataLoading && !dataTypesError) {
      getTypes();
    }
  }, [types.length, dataLoading, dataTypesError, getTypes]);

  useEffect(() => {
    getAllTypes();
  }, [getAllTypes]);

  const handleAddRow = () => {
    setMilestoneRows((prev) => [
      ...prev,
      {
        id: Date.now(),
        custom: "",
        milestones: [],
        selectedOptions: { count: false, digits: false },
        typeId: "",
        categoryId: "",
        subCategoryId: "",
        localCategories: [],
        localSubCategories: [],
      },
    ]);
  };

  const handleTypeChange = async (index: number, value: string) => {
    const updatedRows = [...milestoneRows];
    updatedRows[index].typeId = value;
    updatedRows[index].categoryId = "";
    updatedRows[index].subCategoryId = "";
    updatedRows[index].localCategories = [];
    updatedRows[index].localSubCategories = [];
    await getCategories(value);
    updatedRows[index].localCategories =
      useCurriculumsDataStore.getState().categories;
    setMilestoneRows(updatedRows);
  };

  const handleCategoryChange = async (index: number, value: string) => {
    const updatedRows = [...milestoneRows];
    updatedRows[index].categoryId = value;
    updatedRows[index].subCategoryId = "";
    updatedRows[index].localSubCategories = [];
    await getSubCategories(value);
    updatedRows[index].localSubCategories =
      useCurriculumsDataStore.getState().subCategories;
    setMilestoneRows(updatedRows);
  };

  const handleSubCategoryChange = async (index: number, value: string) => {
    const updatedRows = [...milestoneRows];
    updatedRows[index].subCategoryId = value;
    await getMileStones(value);
    const fetchedMilestones = useCurriculumsDataStore.getState().mileStones;
    updatedRows[index].milestones = fetchedMilestones;
    setMilestoneRows(updatedRows);
  };

  const handleSelectMilestone = (index: number, milestone: MileStone) => {
    const updatedRows = [...milestoneRows];
    updatedRows[index].milestones = [milestone];
    updatedRows[index].selectedMilestoneId = milestone.id;
    updatedRows[index].isCustomMilestone = false;
    setMilestoneRows(updatedRows);
  };

  const handleRemoveSelectedMilestone = (index: number) => {
    const updatedRows = [...milestoneRows];
    updatedRows[index].milestones = [];
    updatedRows[index].selectedMilestoneId = undefined;
    updatedRows[index].isCustomMilestone = false;
    setMilestoneRows(updatedRows);
  };

  const handleAddCustomMilestone = (index: number) => {
    const newRows = [...milestoneRows];
    const trimmed = newRows[index].custom.trim();
    if (trimmed && !newRows[index].milestones.some((m) => m.name === trimmed)) {
      newRows[index].milestones = [{ name: trimmed } as MileStone];
      newRows[index].custom = "";
      newRows[index].selectedMilestoneId = undefined;
      newRows[index].isCustomMilestone = true;
      setMilestoneRows(newRows);
    }
  };

  const handleEditMilestone = async (index: number) => {
    const updatedRows = [...milestoneRows];

    const subCategoryId = updatedRows[index].subCategoryId;

    if (subCategoryId) {
      await getMileStones(subCategoryId);
      const fetchedMilestones = useCurriculumsDataStore.getState().mileStones;
      updatedRows[index].milestones = fetchedMilestones;
    } else {
      updatedRows[index].milestones = [];
    }

    updatedRows[index].selectedMilestoneId = undefined;
    updatedRows[index].isCustomMilestone = false;

    setMilestoneRows(updatedRows);
  };

  const handleCustomChange = (index: number, value: string) => {
    const newRows = [...milestoneRows];
    newRows[index].custom = value;
    setMilestoneRows(newRows);
  };

  const onSubmit: SubmitHandler<FormAuthInputs> = async (data) => {
    const milestonesData = milestoneRows.flatMap((row) =>
      row.milestones.map((milestone) =>
        milestone.id
          ? { milestone_id: milestone.id }
          : {
              name_en: milestone.name,
              curriculum_sub_category_id: row?.subCategoryId,
            }
      )
    );
    const formData = {
      ...data,
      milestones: milestonesData,
      name_en: data.name_en,
    };

    const token = await getTokenFromServerCookies();
    const toastLoading = toast.loading("Loading...");

    try {
      const response = await axios.post(dataURLS.addCurriculum, formData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.update(toastLoading, {
          render: response?.data?.message || "Curriculum Added Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
        reset();
        setMilestoneRows([
          {
            id: Date.now(),
            custom: "",
            milestones: [],
            typeId: "",
            categoryId: "",
            subCategoryId: "",
            localCategories: [] as { id: number; name: string }[],
            localSubCategories: [] as { id: number; name: string }[],
          },
        ]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.update(toastLoading, {
          render: error.response?.data?.message || "Something went wrong!",
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });
        const errorMssgs = error.response?.data?.errors;
        if (errorMssgs) {
          Object.entries(errorMssgs).forEach(([field, messages]) => {
            const messageArray = Array.isArray(messages)
              ? messages
              : [messages];
            setError(field as keyof FormAuthInputs, {
              type: "manual",
              message: messageArray[0],
            });
            toast.error(messageArray[0], {
              autoClose: 2000,
            });
          });
        }
      }
    }
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
          className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
            errors.name_en ? "border-red-500" : ""
          }`}
        />
        {errors.name_en && (
          <p className="text-red-500 text-sm">{errors.name_en.message}</p>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-dark">
            Select Class
          </label>
          <select
            defaultValue={""}
            {...register("class_id", { required: "Class is required" })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
              errors.class_id ? "border-red-500" : ""
            }`}
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
          {errors.class_id && (
            <p className="text-red-500 text-sm">{errors.class_id.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-dark">
            Select Activity
          </label>
          <select
            defaultValue={""}
            {...register("activity_id", { required: "Activity is required" })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
              errors.activity_id ? "border-red-500" : ""
            }`}
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
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-dark">
            Date From
          </label>
          <input
            type="date"
            {...register("date_from", { required: "Start date is required" })}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
              errors.date_from ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.date_from && (
            <p className="text-red-500 text-sm">{errors.date_from.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-dark">
            Date To
          </label>
          <input
            type="date"
            {...register("date_to", { required: "End date is required" })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
              errors.date_to ? "border-red-500" : ""
            }`}
          />
          {errors.date_to && (
            <p className="text-red-500 text-sm">{errors.date_to.message}</p>
          )}
        </div>
      </div>

      {milestoneRows.map((row, index) => (
        <div key={row.id} className="border-b border-indigo-500 py-4">
          <h3 className="text-lg font-semibold mb-3">Milestone #{index + 1}</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-dark">
                Curriculum Type
              </label>
              <select
                value={row.typeId}
                onChange={(e) => handleTypeChange(index, e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              >
                <option value="">Select Type</option>
                {types.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-dark">
                Curriculum Category
              </label>
              <select
                value={row.categoryId}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              >
                <option value="">Select Category</option>
                {row.localCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-dark">
                Curriculum Sub-Category
              </label>
              <select
                value={row.subCategoryId}
                onChange={(e) => handleSubCategoryChange(index, e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              >
                <option value="">Select Sub-Category</option>
                {row.localSubCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4 flex gap-2">
            {row.selectedMilestoneId || row.isCustomMilestone ? (
              <div className="flex items-center gap-2">
                <span className="bg-indigo-500 text-white px-3 py-1 rounded-full">
                  {row.milestones[0]?.name}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    handleEditMilestone(index);
                    handleRemoveSelectedMilestone(index);
                  }}
                  className="text-sm text-blue-600 underline"
                >
                  Edit
                </button>
              </div>
            ) : loadingMileStones ? (
              <LoaderSpinner className="text-center" />
            ) : (
              row?.milestones?.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleSelectMilestone(index, m)}
                  className={`px-4 py-2 rounded-full text-sm border ${
                    row.selectedMilestoneId === m.id
                      ? "bg-indigo-500 text-white border-indigo-500"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {m.name}
                </button>
              ))
            )}
          </div>

          {row?.subCategoryId && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                disabled={row?.selectedMilestoneId ? true : false}
                placeholder="Add your own milestone"
                value={row.custom}
                onChange={(e) => handleCustomChange(index, e.target.value)}
                className="flex-grow px-4 py-2 border rounded-md focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleAddCustomMilestone(index)}
                className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-green-800"
              >
                +
              </button>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddRow}
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 text-sm"
      >
        Add Another Milestone
      </button>

      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded block"
      >
        Add Curriculum
      </button>
    </form>
  );
};

export default AddCurriculumForm;
