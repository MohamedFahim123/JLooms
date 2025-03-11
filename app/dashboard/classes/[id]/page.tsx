import ActionOrActivitySection from "@/app/components/ActionOrActivitySection/ActionOrActivitySection";
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { dataURLS } from "../../utils/dataUrls";
import { teacherInterface } from "../../utils/interfaces";

export const metadata: Metadata = {
  title: `Class Details`,
};

interface ParamsProps {
  id: string;
}

interface classDetailsProps {
  params: Promise<ParamsProps>;
}

export interface OPTION {
  icon: string;
  id: number;
  type: string;
  name_ar: string;
  name_en: string;
  action: string;
  teachers: teacherInterface[];
  name: string;
  class_activity_id?: number | string;
  class_action_id?: number | string;
}

interface ClassDetails {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
  number_of_students: number;
  actions: OPTION[];
  activities: OPTION[];
  teachers: teacherInterface[];
}

const cache: {
  actions?: { data: unknown; timestamp: number };
  activities?: { data: unknown; timestamp: number };
} = {};

const CACHE_EXPIRATION_TIME = 15 * 60 * 1000;

async function fetchWithCache(
  url: string,
  token: string,
  cacheKey: "actions" | "activities"
) {
  const now = Date.now();
  if (
    cache[cacheKey] &&
    now - cache[cacheKey].timestamp < CACHE_EXPIRATION_TIME
  ) {
    return cache[cacheKey].data;
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  cache[cacheKey] = {
    data,
    timestamp: now,
  };

  return data;
}

export default async function ClassDetailsPage({ params }: classDetailsProps) {
  const { id } = await params;
  const cookiesData = await cookies();
  const token = cookiesData.get("CLIENT_JLOOMS_TOKEN")?.value;
  const request = await fetch(
    `${dataURLS.singleClass}/${id}?t=${new Date().getTime()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const responseData = await request.json();
  const classDetails: ClassDetails = responseData?.data;

  const actionArray: OPTION[] = classDetails?.actions;
  const activityArray: OPTION[] = classDetails?.activities;
  const teachers: teacherInterface[] = classDetails?.teachers || [];

  const allowedTeachersRequest = await fetch(
    `${dataURLS.allowedTeachers}?t=${new Date().getTime()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const allowedReponse = await allowedTeachersRequest.json();
  const allowedTeachers = allowedReponse?.data?.teachers;

  const actions = await fetchWithCache(
    dataURLS.getActions,
    token ? token : "",
    "actions"
  );
  const activities = await fetchWithCache(
    dataURLS.getActivities,
    token ? token : "",
    "activities"
  );

  console.log(classDetails)

  return (
    <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
      <DashBoardPageHead text={classDetails?.name_en || "Class Name Unknown"} />
      <ActionOrActivitySection
        teachers={teachers}
        id={id}
        allActions={actions?.data?.actions}
        allActivities={activities?.data?.activities}
        actionArray={actionArray}
        activityArray={activityArray}
        allowedTeachers={allowedTeachers}
      />
    </div>
  );
}
