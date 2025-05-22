import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { getTokenFromServerCookies } from "../auth/utils/storeTokenOnServer";
import { baseUrl } from "../utils/baseUrl";

interface MileStone {
  id: number;
  name: string;
}

export interface UseMileStonesStoreIterface {
  mileStones: MileStone[];
  mileStonesError: unknown;
  mileStonesLoading: boolean;
  getMileStones: () => Promise<void>;
}

let lastFetchedTime = 0;
const CACHE_EXPIRATION_TIME = 10 * 60 * 1000;

export const useMileStonesStore = create<UseMileStonesStoreIterface>((set) => ({
  mileStones: [],
  mileStonesError: null,
  mileStonesLoading: false,
  getMileStones: async () => {
    const token = await getTokenFromServerCookies();
    const currentTime = new Date().getTime();
    if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
      return;
    }

    set({ mileStonesLoading: true });

    try {
      const res = await axios.get(
        `${baseUrl}/school/all-milestones?t=${currentTime}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const mileStones = res?.data?.data?.mileStones || [];
      lastFetchedTime = currentTime;

      set({
        mileStones,
        mileStonesError: null,
        mileStonesLoading: false,
      });
    } catch (err) {
      set({
        mileStones: [],
        mileStonesError: axios.isAxiosError(err)
          ? err.response?.data?.message || "Error fetching mileStones"
          : "Unexpected error occurred!",
        mileStonesLoading: false,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
