"use client";

import { OPTION } from "@/app/dashboard/classes/[id]/page";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import { teacherInterface } from "@/app/dashboard/utils/interfaces";
import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useState } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// interface SelectedTeacher {
//   class_option_teacher_id: string | number;
//   id: string | number;
//   name: string;
// };

interface SingleClassRowActionsProps {
  allActions: OPTION[];
  allActivities: OPTION[];
  type: "activity" | "action";
  classId: string;
  option: OPTION;
  allowedTeachers: teacherInterface[];
  setCurrActivitiesState: (newState: "adding" | "submit") => void;
  setCurrActionsState: (newState: "adding" | "submit") => void;
  setActivities: (newState: OPTION[]) => void;
  setActions: (newState: OPTION[]) => void;
  actions: OPTION[];
  activities: OPTION[];
}

export default function SingleClassRowOfAction({
  classId,
  option,
  type,
  allActions,
  allActivities,
  setActions,
  setActivities,
  setCurrActionsState,
  setCurrActivitiesState,
  actions,
  activities,
}: SingleClassRowActionsProps) {
  const [editMode, setEditMode] = useState<boolean>(
    option?.id >= 1 ? false : true
  );
  const token = Cookies.get("CLIENT_JLOOMS_TOKEN");
  const [selectedUpdateData, setSelectedUpdateData] = useState<OPTION | null>(
    null
  );
  const [sendingRequest, setSendingRequest] = useState<boolean>(false);

  const handleSelectOptionChange = useCallback(
    (e: { target: { value: string } }) => {
      const value = e.target.value;
      if (type === "action") {
        setSelectedUpdateData(
          allActions?.find((el) => +el.id === +value) || null
        );
      } else if (type === "activity") {
        setSelectedUpdateData(
          allActivities?.find((el) => +el.id === +value) || null
        );
      }
    },
    [allActions, allActivities, type]
  );

  const handleDeleteActionOrActivity = useCallback(() => {
    if (option?.id >= 1) {
      setSendingRequest(true);
      Swal.fire({
        title: `Do you want to Remove ${
          option?.name ? option?.name : option?.action
        } ?`,
        showCancelButton: true,
        confirmButtonColor: "#ff2020",
        confirmButtonText: "Yes, Remove",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const url: string =
            type === "action"
              ? `${dataURLS.removeActionFromClass}/${option?.class_action_id}`
              : `${dataURLS.removeActivityFromClass}/${option?.class_activity_id}`;

          const request = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          setSendingRequest(false);
          const res = await request.json();
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: `${
                option?.name ? option?.name : option?.action
              } has been removed successfully`,
              showConfirmButton: false,
              timer: 1000,
            });
            window.location.reload();
          } else {
            Swal.fire({
              icon: "error",
              title: `Failed to remove ${type}`,
              showConfirmButton: false,
              timer: 1000,
            });
          }
        } else {
          setSendingRequest(false);
        }
      });
    } else {
      if (type === "action") {
        setActions(actions?.filter((action) => action.id >= 1 && action));
        setCurrActionsState("adding");
      } else {
        setActivities(
          activities?.filter((activity) => activity.id >= 1 && activity)
        );
        setCurrActivitiesState("adding");
      }
    }
  }, [
    option,
    type,
    token,
    setActions,
    setCurrActionsState,
    actions,
    setActivities,
    setCurrActivitiesState,
    activities,
  ]);

  const handleEditORAddActionOrActivity = useCallback(() => {
    if (editMode) {
      if (option?.id >= 1) {
        setSendingRequest(true);
        (async () => {
          const loadingToastId = toast.loading("Loading...");
          const data =
            type === "action"
              ? {
                  class_action_id: `${option?.class_action_id}`,
                  action_id: `${selectedUpdateData?.id}`,
                }
              : {
                  class_activity_id: `${option?.class_activity_id}`,
                  activity_id: `${selectedUpdateData?.id}`,
                };

          try {
            const url: string =
              type === "action"
                ? `${dataURLS.editActionInsideClass}`
                : `${dataURLS.editActivityInsideClass}`;

            const response = await axios.post(url, data, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            toast.update(loadingToastId, {
              render: response?.data?.message || "Updated Successfully!",
              type: "success",
              isLoading: false,
              autoClose: 1500,
            });
            window.location.reload();
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
            setSendingRequest(false);
          }
        })();
      } else {
        setSendingRequest(true);
        (async () => {
          const loadingToastId = toast.loading("Loading...");
          const data =
            type === "action"
              ? {
                  class_id: classId,
                  action_id: `${selectedUpdateData?.id}`,
                }
              : {
                  class_id: classId,
                  activity_id: `${selectedUpdateData?.id}`,
                };
          try {
            const url: string =
              option?.id < 1
                ? type === "action"
                  ? `${dataURLS.addActionToClass}`
                  : `${dataURLS.addActivityToClass}`
                : "";

            const response = await axios.post(url, data, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            toast.update(loadingToastId, {
              render: response?.data?.message || "Updated Successfully!",
              type: "success",
              isLoading: false,
              autoClose: 1500,
            });
            window.location.reload();
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
            setSendingRequest(false);
          }
        })();
      }
    } else if (!editMode) {
      setEditMode(true);
    }
  }, [editMode, option, type, selectedUpdateData, classId, token]);

  return (
    <form className="flex justify-between w-full">
      <div>
        {editMode ? (
          type === "action" ? (
            <select
              defaultValue={
                allActions?.find((action) => action?.action === option?.action)
                  ? allActions?.find(
                      (action) => action?.action === option?.action
                    )?.id
                  : ""
              }
              disabled={sendingRequest}
              onChange={handleSelectOptionChange}
              id="actionSelectedToClass"
              className="mb-3 block focus:outline-none appearance-none w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-10 leading-tight focus:shadow-outline"
            >
              <option value={""} disabled>
                Select an Action
              </option>
              {allActions?.map((action) => (
                <option key={action?.id} value={action?.id}>
                  {action?.action}
                </option>
              ))}
            </select>
          ) : (
            <select
              defaultValue={
                allActivities?.find(
                  (activity) => activity.name === option?.name
                )
                  ? allActivities?.find(
                      (activity) => activity.name === option?.name
                    )?.id
                  : ""
              }
              disabled={sendingRequest}
              onChange={handleSelectOptionChange}
              id="activitySelectedToClass"
              className="mb-3 block focus:outline-none appearance-none w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-10 leading-tight focus:shadow-outline"
            >
              <option value={""} disabled>
                Select ab Activity
              </option>
              {allActivities?.map((activity) => (
                <option key={activity?.id} value={activity?.id}>
                  {activity?.name}
                </option>
              ))}
            </select>
          )
        ) : (
          <input
            id="ActionInput"
            disabled
            value={type === "action" ? option?.action : option?.name}
            className={`bg-gray-50 focus-visible:outline-none focus:outline-none border text-sm rounded-lg block w-full p-2.5`}
            type="text"
          />
        )}
      </div>
      <div className={`flex`}>
        <button
          disabled={sendingRequest}
          onClick={handleDeleteActionOrActivity}
          type="button"
          className={`text-[#ff2020] py-2 px-4`}
        >
          <FaRegTrashCan size={22} />
        </button>
        <button
          disabled={sendingRequest}
          onClick={handleEditORAddActionOrActivity}
          type={"button"}
          className={`${
            editMode ? "text-green-700" : "text-blue-700"
          } py-2 px-4`}
        >
          {editMode ? <FaCheck size={22} /> : <FaEdit size={22} />}
        </button>
      </div>
    </form>
  );
}
