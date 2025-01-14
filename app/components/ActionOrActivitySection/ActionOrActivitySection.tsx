"use client";

import { OPTION } from "@/app/dashboard/classes/[id]/page";
import SingleClassRowOfAction from "../SingleClassRowOfAction/SingleClassRowOfAction";
import { FaGraduationCap } from "react-icons/fa";
import { teacherInterface } from "@/app/dashboard/utils/interfaces";
import { useState } from "react";

interface ActionOrActivitySectionProps {
  allowedTeachers: teacherInterface[];
  actionArray: OPTION[];
  activityArray: OPTION[];
  allActivities: OPTION[];
  allActions: OPTION[];
  id: string;
}

export default function ActionOrActivitySection({
  allActivities,
  allActions,
  actionArray,
  allowedTeachers,
  activityArray,
  id,
}: ActionOrActivitySectionProps) {
  const [currActionsState, setCurrActionsState] = useState<"adding" | "submit">(
    "adding"
  );
  const [currActivitiesState, setCurrActivitiesState] = useState<
    "adding" | "submit"
  >("adding");
  const [actions, setActions] = useState<OPTION[]>(actionArray);
  const [activities, setActivities] = useState<OPTION[]>(activityArray);
  useState<boolean>(false);

  const handleAddMoreActionOrActivity = (type: "Action" | "Activity") => {
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
          classs_action_id: "",
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
          classs_action_id: "",
        },
      ]);
      setCurrActivitiesState("submit");
    }
  };

  return (
    <div className="px-6 pt-4 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
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
                handleAddMoreActionOrActivity("Action");
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
          Activities
        </h3>
        {activities
          ? activities?.map((option: OPTION, idx) => (
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
                  type={"activity"}
                />
              </div>
            ))
          : activityArray?.map((option: OPTION, idx) => (
              <div
                key={option?.id}
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
                  type={"activity"}
                />
              </div>
            ))}
        {currActivitiesState === "adding" && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => {
                handleAddMoreActionOrActivity("Activity");
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
