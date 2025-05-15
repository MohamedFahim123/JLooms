"use client";

import { getTokenFromServerCookies } from "@/app/auth/utils/storeTokenOnServer";
import { OPTION } from "@/app/dashboard/classes/[id]/page";
import { dataURLS } from "@/app/dashboard/utils/dataUrls";
import { teacherInterface } from "@/app/dashboard/utils/interfaces";
import { useLoginnedUserStore } from "@/app/store/useCurrLoginnedUser";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SingleClassRowOfTeacher({
  allowedTeachers,
  setIsAddingTeacher,
  isAddingTeacher,
  allActivities,
  classId,
  teacher,
  onDeleteTeacher,
}: {
  allowedTeachers: teacherInterface[];
  setIsAddingTeacher: React.Dispatch<React.SetStateAction<boolean>>;
  isAddingTeacher: boolean;
  allActivities: OPTION[];
  classId: number;
  teacher?: teacherInterface;
  onDeleteTeacher: (teacherId: number) => void;
}) {
  const [newTeacher, setNewTeacher] = useState<string>("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const handleCancelAddTeacher = () => {
    setIsAddingTeacher(false);
    setNewTeacher("");
    setSelectedActivities([]);
  };
  const { userLoginned } = useLoginnedUserStore();

  const handleSubmitNewTeacher = async () => {
    if (!newTeacher) return toast.error("Please select a teacher.");

    const teacherToAdd = allowedTeachers.find(
      (teacher) => teacher.id === +newTeacher
    );
    if (!teacherToAdd) return;

    const token = await getTokenFromServerCookies();
    const data: {
      teacher_id: number | string;
      class_id: string;
      class_activity: string[];
    } = {
      teacher_id: `${teacherToAdd.id}`,
      class_id: `${classId}`,
      class_activity: selectedActivities,
    };
    try {
      const response = await axios.post(
        `${dataURLS.assignTeacherToClass}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setIsAddingTeacher(false);
        setNewTeacher("");
        setSelectedActivities([]);
        window.location.reload();
      }
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Something went wrong!"
        : "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  };

  const handleAddActivity = (activityId: string) => {
    const activity = allActivities.find(
      (a) => `${a.class_activity_id}` === activityId
    );
    if (activity && !selectedActivities.some((a) => a === activityId)) {
      setSelectedActivities([...selectedActivities, activityId]);
    }
  };

  const handleRemoveActivity = (activityId: string) => {
    setSelectedActivities(selectedActivities.filter((a) => a !== activityId));
  };

  const handleDeleteTeacher = () => {
    if (teacher) {
      onDeleteTeacher(+teacher.id);
    }
  };

  return (
    <>
      {teacher?.name ? (
        <div className="border border-gray-300 p-4 rounded-lg flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold">{teacher.name}</h4>
              <p className="text-sm text-gray-600">{teacher.email}</p>
              <ul>
                {teacher?.activities?.map((activity) => (
                  <li key={activity?.id}>{activity?.name}</li>
                ))}
              </ul>
            </div>
            {userLoginned?.permissions?.includes("Assign Teachers") && (
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteTeacher}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        isAddingTeacher && (
          <div className="border border-gray-300 p-4 rounded-lg flex flex-col gap-2">
            <select
              value={newTeacher}
              onChange={(e) => setNewTeacher(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="" disabled>
                Select a teacher
              </option>
              {allowedTeachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>

            <div className="flex flex-col gap-2">
              <select
                onChange={(e) => handleAddActivity(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Select an Activity</option>
                {allActivities
                  .filter(
                    (activity) =>
                      !selectedActivities.some(
                        (a) => a === `${activity.class_activity_id}`
                      )
                  )
                  .map((activity) => (
                    <option
                      key={activity.id}
                      value={activity.class_activity_id}
                    >
                      {activity.name}
                    </option>
                  ))}
              </select>

              <div className="flex flex-wrap gap-2 mt-2">
                {selectedActivities.map((activityId) => {
                  const activity = allActivities.find(
                    (a) => `${a.class_activity_id}` === activityId
                  );
                  return (
                    <span
                      key={activityId}
                      className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2"
                    >
                      {activity?.name}
                      <button
                        onClick={() => handleRemoveActivity(activityId)}
                        className="ml-2 bg-red-500 text-white rounded-full px-2 py-0.5"
                      >
                        x
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4 mt-2">
              <button
                onClick={handleSubmitNewTeacher}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit
              </button>
              <button
                onClick={handleCancelAddTeacher}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )
      )}
    </>
  );
}
