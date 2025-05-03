"use client";

import { getTokenFromServerCookies } from "@/app/auth/utils/storeTokenOnServer";
import { OPTION } from "@/app/dashboard/classes/[id]/page";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import { teacherInterface } from "@/app/dashboard/utils/interfaces";
import axios from "axios";
import { useCallback, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { toast } from "react-toastify";
import SingleClassRowOfAction from "../SingleClassRowOfAction/SingleClassRowOfAction";
import SingleClassRowOfTeacher from "../SingleClassRowOfTeacher/SingleClassRowOfTeacher";

interface ActionOrActivitySectionProps {
  allowedTeachers: teacherInterface[];
  actionArray: OPTION[];
  activityArray: OPTION[];
  allActivities: OPTION[];
  allActions: OPTION[];
  id: string;
  teachers: teacherInterface[];
}

export default function ActionOrActivitySection({
  allActivities,
  allActions,
  actionArray,
  allowedTeachers,
  activityArray,
  id,
  teachers,
}: ActionOrActivitySectionProps) {
  const [currActionsState, setCurrActionsState] = useState<"adding" | "submit">(
    "adding"
  );
  const [isAddingTeacher, setIsAddingTeacher] = useState<boolean>(false);
  const [currTeachersState, setCurrTeachersState] = useState<
    "adding" | "submit"
  >("adding");
  const [currActivitiesState, setCurrActivitiesState] = useState<
    "adding" | "submit"
  >("adding");

  const [actions, setActions] = useState<OPTION[]>(actionArray);
  const [activities, setActivities] = useState<OPTION[]>(activityArray);
  const [currTeachers, setCurrTeachers] =
    useState<teacherInterface[]>(teachers);

  const handleDeleteTeacher = async (teacherId: number) => {
    const token = await getTokenFromServerCookies();
    const toastLoader = toast.loading("Removing teacher...");
    const data: { teacher_id: string; class_id: string } = {
      teacher_id: `${teacherId}`,
      class_id: `${id}`,
    };
    try {
      const res = await axios.post(`${dataURLS.removeTeacherFromClass}`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        toast.dismiss(toastLoader);
        toast.success(res.data.message || "Teacher removed successfully!");
        window.location.reload();
      }
    } catch (error) {
      const errMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Something went wrong!"
        : "An unexpected error occurred.";
      toast.dismiss(toastLoader);
      toast.error(errMessage);
    }
  };

  const handleAddMoreActionOrActivityOrTeacher = useCallback(
    (type: "Action" | "Activity" | "Teacher") => {
      if (type === "Action") {
        setActions([
          ...actions,
          {
            id: Math.random(),
            name_ar: "",
            name_en: "",
            teachers: [],
            icon: "",
            type: "",
            action: "",
            name: "",
            class_activity_id: "",
            class_action_id: "",
          },
        ]);
        setCurrActionsState("submit");
      } else if (type === "Activity") {
        setActivities([
          ...activities,
          {
            id: Math.random(),
            name_ar: "",
            name_en: "",
            teachers: [],
            icon: "",
            action: "",
            type: "",
            name: "",
            class_activity_id: "",
            class_action_id: "",
          },
        ]);
        setCurrActivitiesState("submit");
      } else if (type === "Teacher") {
        setCurrTeachers([
          ...currTeachers,
          {
            class_option_teacher_id: Math.random(),
            name: "",
            email: "",
            phone: "",
            image: "",
            status: "",
            gender: "",
            locale: "",
            id: Math.random(),
            activities: [],
          },
        ]);
        setCurrTeachersState("submit");
        setIsAddingTeacher(true);
      }
    },
    [actions, activities, currTeachers]
  );

  return (
    <div className="px-6 pt-4 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-12 mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
          <span className="flex items-center justify-center w-14 h-14 bg-[#EBECFA] rounded-lg">
            <FaGraduationCap size={32} className="text-[#8A8A8A]" />
          </span>
          Teachers
        </h3>

        {currTeachers.map((teacher, idx) => (
          <div
            key={teacher?.id}
            className={`${
              idx + 1 !== currTeachers.length && "border-y border-t-0"
            } py-6`}
          >
            <SingleClassRowOfTeacher
              allowedTeachers={allowedTeachers}
              setIsAddingTeacher={setIsAddingTeacher}
              isAddingTeacher={isAddingTeacher}
              allActivities={activityArray}
              classId={+id}
              teacher={teacher}
              onDeleteTeacher={handleDeleteTeacher}
            />
          </div>
        ))}

        {!isAddingTeacher && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handleAddMoreActionOrActivityOrTeacher("Teacher")}
              type="button"
              className={`m-auto border-y border-x ${
                currTeachersState === "adding"
                  ? "hover:bg-white border-blue-700 text-white hover:text-blue-700 rounded-lg bg-blue-700"
                  : "hover:bg-white text-white hover:text-green-700 rounded-lg bg-green-700 border-green-700"
              } border-x border-y transition-all duration-300 font-semibold py-2 px-4`}
            >
              Add Teacher
            </button>
          </div>
        )}
      </div>
      <div className="lg:col-span-12 mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
          <span className="flex items-center justify-center w-14 h-14 bg-[#EBECFA] rounded-lg">
            <FaGraduationCap size={32} className="text-[#8A8A8A]" />
          </span>
          Actions
        </h3>
        {actions
          ? actions?.map((option: OPTION, idx) => (
              <div
                key={option?.id}
                className={`${
                  idx + 1 !== actions.length && "border-y border-t-0"
                } py-6`}
              >
                <SingleClassRowOfAction
                  setActivities={setActivities}
                  setActions={setActions}
                  setCurrActivitiesState={setCurrActivitiesState}
                  setCurrActionsState={setCurrActionsState}
                  actions={actions}
                  activities={activities}
                  allActions={allActions}
                  allActivities={allActivities}
                  classId={id}
                  allowedTeachers={allowedTeachers}
                  option={option}
                  type={"action"}
                />
              </div>
            ))
          : actionArray?.map((option: OPTION, idx) => (
              <div
                key={option.id}
                className={`${
                  idx + 1 !== actionArray.length && "border-y border-t-0"
                } py-6`}
              >
                <SingleClassRowOfAction
                  setActivities={setActivities}
                  setActions={setActions}
                  setCurrActivitiesState={setCurrActivitiesState}
                  setCurrActionsState={setCurrActionsState}
                  actions={actions}
                  activities={activities}
                  allActions={allActions}
                  allActivities={allActivities}
                  classId={id}
                  allowedTeachers={allowedTeachers}
                  option={option}
                  type={"action"}
                />
              </div>
            ))}
        {currActionsState === "adding" && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => {
                handleAddMoreActionOrActivityOrTeacher("Action");
              }}
              type={"button"}
              className={`m-auto border-y border-x ${
                currActionsState === "adding"
                  ? "hover:bg-white border-blue-700 text-white hover:text-blue-700 rounded-lg bg-blue-700"
                  : "hover:bg-white text-white hover:text-green-700 rounded-lg bg-green-700 border-green-700"
              } border-x border-y transition-all duration-300 font-semibold py-2 px-4`}
            >
              Add Action
            </button>
          </div>
        )}
      </div>
      <div className="lg:col-span-12 mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
          <span className="flex items-center justify-center w-14 h-14 bg-[#EBECFA] rounded-lg">
            <FaGraduationCap size={32} className="text-[#8A8A8A]" />
          </span>
          Activities / Subjects
        </h3>
        {activities
          ? activities?.map((option: OPTION, idx) => (
              <div
                key={option.id}
                className={`${
                  idx + 1 !== activities?.length && "border-y border-t-0"
                } py-6`}
              >
                <SingleClassRowOfAction
                  setActivities={setActivities}
                  setActions={setActions}
                  setCurrActivitiesState={setCurrActivitiesState}
                  setCurrActionsState={setCurrActionsState}
                  actions={actions}
                  activities={activities}
                  allActions={allActions}
                  allActivities={allActivities}
                  classId={id}
                  allowedTeachers={allowedTeachers}
                  option={option}
                  type={"activity"}
                />
              </div>
            ))
          : activityArray?.map((option: OPTION, idx) => (
              <div
                key={option?.id}
                className={`${
                  idx + 1 !== activityArray?.length && "border-y border-t-0"
                } py-6`}
              >
                <SingleClassRowOfAction
                  setActivities={setActivities}
                  setActions={setActions}
                  setCurrActivitiesState={setCurrActivitiesState}
                  setCurrActionsState={setCurrActionsState}
                  actions={actions}
                  activities={activities}
                  allActions={allActions}
                  allActivities={allActivities}
                  classId={id}
                  allowedTeachers={allowedTeachers}
                  option={option}
                  type={"activity"}
                />
              </div>
            ))}
        {currActivitiesState === "adding" && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => {
                handleAddMoreActionOrActivityOrTeacher("Activity");
              }}
              type={"button"}
              className={`m-auto border-y border-x ${
                currActivitiesState === "adding"
                  ? "hover:bg-white border-blue-700 text-white hover:text-blue-700 rounded-lg bg-blue-700"
                  : "hover:bg-white text-white hover:text-green-700 rounded-lg bg-green-700 border-green-700"
              } border-x border-y transition-all duration-300 font-semibold py-2 px-4`}
            >
              Add Activity
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
