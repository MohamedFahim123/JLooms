import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { getTokenFromServerCookies } from "../auth/utils/storeTokenOnServer";
import { baseUrl } from "../utils/baseUrl";

interface Rule {
  id: number;
  name: string;
}

export interface UseRulesStoreIterface {
  rules: Rule[];
  rulesError: unknown;
  rulesLoading: boolean;
  getRules: () => Promise<void>;
}

let lastFetchedTime = 0;
const CACHE_EXPIRATION_TIME = 10 * 60 * 1000;

export const useRulesStore = create<UseRulesStoreIterface>((set) => ({
  rules: [],
  rulesError: null,
  rulesLoading: false,
  getRules: async () => {
    const token = await getTokenFromServerCookies();
    const currentTime = new Date().getTime();
    if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
      return;
    }

    set({ rulesLoading: true });

    try {
      const res = await axios.get(`${baseUrl}/school/roles?t=${currentTime}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const rules = res?.data?.data?.roles || [];
      lastFetchedTime = currentTime;

      set({
        rules,
        rulesError: null,
        rulesLoading: false,
      });
    } catch (err) {
      set({
        rules: [],
        rulesError: axios.isAxiosError(err)
          ? err.response?.data?.message || "Error fetching rules"
          : "Unexpected error occurred!",
        rulesLoading: false,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
