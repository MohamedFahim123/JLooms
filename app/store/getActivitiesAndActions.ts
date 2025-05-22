import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { getTokenFromServerCookies } from "../auth/utils/storeTokenOnServer";
import { baseUrl } from "../utils/baseUrl";

interface Action {
  id: number;
  name: string;
  icon: string;
}
interface Activity {
  id: number;
  name: string;
  icon: string;
}

let lastFetchedTimeAction = 0;
let lastFetchedTimeActivity = 0;
const CACHE_EXPIRATION_TIME = 10 * 60 * 1000;

export interface UseActionsAndActivityStoreIterface {
  actions: Action[];
  activities: Activity[];
  dataError: unknown;
  dataLoading: boolean;
  getActions: () => Promise<void>;
  getActivities: () => Promise<void>;
}

export const useActionsAndActivityStore =
  create<UseActionsAndActivityStoreIterface>((set) => ({
    actions: [],
    activities: [],
    dataError: null,
    dataLoading: false,

    getActions: async () => {
      const token = await getTokenFromServerCookies();
      const currentTime = new Date().getTime();
      if (currentTime - lastFetchedTimeAction < CACHE_EXPIRATION_TIME) {
        return;
      }
      set({ dataLoading: true });

      try {
        const res = await axios.get(
          `${baseUrl}/school/actions?t=${currentTime}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const actions = res?.data?.data?.actions || [];
        lastFetchedTimeAction = currentTime;
        set({
          actions,
          dataError: null,
          dataLoading: false,
        });
      } catch (err) {
        set({
          actions: [],
          dataError: axios.isAxiosError(err)
            ? err.response?.data?.message || "Error fetching Actions"
            : "Unexpected error occurred!",
          dataLoading: false,
        });

        if (!axios.isAxiosError(err)) {
          toast.error("Unexpected error occurred!");
        }
      }
    },
    getActivities: async () => {
      const token = await getTokenFromServerCookies();
      const currentTime = new Date().getTime();
      if (currentTime - lastFetchedTimeActivity < CACHE_EXPIRATION_TIME) {
        return;
      }
      set({ dataLoading: true });

      try {
        const res = await axios.get(
          `${baseUrl}/school/activities?t=${currentTime}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const activities = res?.data?.data?.activities || [];
        lastFetchedTimeActivity = currentTime;

        set({
          activities,
          dataError: null,
          dataLoading: false,
        });
      } catch (err) {
        set({
          activities: [],
          dataError: axios.isAxiosError(err)
            ? err.response?.data?.message || "Error fetching Activities"
            : "Unexpected error occurred!",
          dataLoading: false,
        });

        if (!axios.isAxiosError(err)) {
          toast.error("Unexpected error occurred!");
        }
      }
    },
  }));
