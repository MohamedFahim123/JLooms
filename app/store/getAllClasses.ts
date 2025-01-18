import axios from "axios";
import { create } from "zustand";
import { baseUrl } from "../utils/baseUrl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const token = Cookies.get("CLIENT_JLOOMS_TOKEN");

interface Class {
  id: number;
  name: string;
}

export interface UseClassesStoreIterface {
  classes: Class[];
  classesError: unknown;
  classesLoading: boolean;
  getClasses: () => Promise<void>;
}

let lastFetchedTime = 0;
const CACHE_EXPIRATION_TIME = 10 * 60 * 1000;

export const useClassesStore = create<UseClassesStoreIterface>((set) => ({
  classes: [],
  classesError: null,
  classesLoading: false,
  getClasses: async () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
      return;
    }

    set({ classesLoading: true });

    try {
      const res = await axios.get(
        `${baseUrl}/school/get-all-classes?t=${currentTime}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const classes = res?.data?.data?.classes || [];
      lastFetchedTime = currentTime;

      set({
        classes,
        classesError: null,
        classesLoading: false,
      });
    } catch (err) {
      set({
        classes: [],
        classesError: axios.isAxiosError(err)
          ? err.response?.data?.message || "Error fetching classes"
          : "Unexpected error occurred!",
        classesLoading: false,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
