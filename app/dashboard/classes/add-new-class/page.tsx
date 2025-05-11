import AddNewClassForm from "@/app/components/AddNewClassForm/AddNewClassForm";
import DashBoardPageHead from "@/app/components/DashBoardPageHead/DashBoardPageHead";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { dataURLS } from "../../utils/dataUrls";
import Loader from "@/app/components/Loader/Loader";

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

export const metadata: Metadata = {
  title: "Add New Class",
  description: "Add New Class to your school",
};

export default async function page() {
  const cookiesData = await cookies();
  const token = cookiesData.get("CLIENT_JLOOMS_TOKEN")?.value;

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

  if (
    actions?.data?.actions?.length === 0 ||
    activities?.data?.activities?.length === 0
  ) {
    return <Loader />;
  }

  return (
    <div className="mx-auto py-6 bg-white rounded-lg">
      <DashBoardPageHead text="Add New Class" />
      <AddNewClassForm
        actions={actions?.data?.actions}
        activities={activities?.data?.activities}
      />
    </div>
  );
}
