import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { baseUrl } from "../utils/baseUrl";

interface Country {
  id: number;
  name: string;
}

export interface UseCountriesStoreIterface {
  countries: Country[];
  countriesError: unknown;
  countriesLoading: boolean;
  getCountries: () => Promise<void>;
}

let lastFetchedTime = 0;
const CACHE_EXPIRATION_TIME = 10 * 60 * 1000;

export const useCountriesStore = create<UseCountriesStoreIterface>((set) => ({
  countries: [],
  countriesError: null,
  countriesLoading: false,
  getCountries: async () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastFetchedTime < CACHE_EXPIRATION_TIME) {
      return;
    }

    set({ countriesLoading: true });

    try {
      const res = await axios.get(`${baseUrl}/all-countries?t=${currentTime}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const countries = res?.data?.data?.countries || [];
      lastFetchedTime = currentTime;

      set({
        countries,
        countriesError: null,
        countriesLoading: false,
      });
    } catch (err) {
      set({
        countries: [],
        countriesError: axios.isAxiosError(err)
          ? err.response?.data?.message || "Error fetching countries"
          : "Unexpected error occurred!",
        countriesLoading: false,
      });

      if (!axios.isAxiosError(err)) {
        toast.error("Unexpected error occurred!");
      }
    }
  },
}));
