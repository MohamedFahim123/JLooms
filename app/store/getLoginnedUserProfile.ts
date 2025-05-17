import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { getTokenFromServerCookies } from "../auth/utils/storeTokenOnServer";
import { baseUrl } from "../utils/baseUrl";
import { useLoginnedUserStore } from "./useCurrLoginnedUser";

export interface UserInterface {
  id: number;
  name: string;
  admin_name: string;
  email: string;
  phone: string;
  address: string;
  address_ar: string;
  address_en: string;
  description: string;
  description_ar: string;
  description_en: string;
  country: string;
  city: string;
  image: string;
  official_registeration: string;
  official_registration_type: string;
  commercial_certification: string;
  commercial_certification_type: string;
  locale: string;
}

export interface UseUserStoreIterface {
  user: UserInterface | null;
  userError: unknown;
  userLoading: boolean;
  getUser: () => Promise<void>;
}

let lastFetchedTime = 0;
const CACHE_EXPIRATION_TIME = 10 * 60 * 1000;

export const useUserStore = create<UseUserStoreIterface>((set) => ({
  user: null,
  userError: null,
  userLoading: false,
  getUser: async () => {
    const { userLoginnedType: userType } = useLoginnedUserStore.getState();
    if (userType === "Admin") {
      const token = await getTokenFromServerCookies();
      const currentTime = new Date().getTime();
      if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
        return;
      }

      set({ userLoading: true });
      try {
        const res = await axios.get(
          `${baseUrl}/school/my-profile?t=${currentTime}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = res?.data?.data?.school || {};
        lastFetchedTime = currentTime;

        set({
          user,
          userError: null,
          userLoading: false,
        });
      } catch (err) {
        set({
          user: null,
          userError: axios.isAxiosError(err)
            ? err.response?.data?.message || "Error fetching user profile"
            : "Unexpected error occurred!",
          userLoading: false,
        });

        if (!axios.isAxiosError(err)) {
          toast.error("Unexpected error occurred!");
        }
      }
    }
  },
}));
