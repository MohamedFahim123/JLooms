import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { getTokenFromServerCookies } from "../auth/utils/storeTokenOnServer";
import { baseUrl } from "../utils/baseUrl";

interface Type {
  id: number;
  name: string;
}
interface Category {
  id: number;
  name: string;
}
interface SubCategory {
  id: number;
  name: string;
}

export interface UseCurriculumsDataStoreIterface {
  types: Type[];
  categories: Category[];
  subCategories: SubCategory[];
  dataTypesError: unknown;
  dataCatError: unknown;
  dataSubCatError: unknown;
  dataLoading: boolean;
  getTypes: () => Promise<void>;
  getCategories: (typeId: string | number) => Promise<void>;
  getSubCategories: (CategoryId: string | number) => Promise<void>;
}

export const useCurriculumsDataStore = create<UseCurriculumsDataStoreIterface>(
  (set) => ({
    types: [],
    categories: [],
    subCategories: [],
    dataTypesError: null,
    dataCatError: null,
    dataSubCatError: null,
    dataLoading: false,

    getTypes: async () => {
      const token = await getTokenFromServerCookies();
      const currentTime = new Date().getTime();

      set({ dataLoading: true });

      try {
        const res = await axios.get(
          `${baseUrl}/school/curriculum-types?t=${currentTime}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const types = res?.data?.data?.types || [];

        set({
          types,
          dataTypesError: null,
          dataLoading: false,
        });
      } catch (err) {
        set({
          types: [],
          dataTypesError: axios.isAxiosError(err)
            ? err.response?.data?.message || "Error fetching types"
            : "Unexpected error occurred!",
          dataLoading: false,
        });

        if (!axios.isAxiosError(err)) {
          toast.error("Unexpected error occurred!");
        }
      }
    },
    getCategories: async (typeId: string | number) => {
      const token = await getTokenFromServerCookies();
      const currentTime = new Date().getTime();
      set({ dataLoading: true });

      try {
        const res = await axios.get(
          `${baseUrl}/school/curriculum-categories/${typeId}?t=${currentTime}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const categories = res?.data?.data?.categories || [];

        set({
          categories,
          dataCatError: null,
          dataLoading: false,
        });
      } catch (err) {
        set({
          categories: [],
          dataCatError: axios.isAxiosError(err)
            ? err.response?.data?.message || "Error fetching Categories"
            : "Unexpected error occurred!",
          dataLoading: false,
        });

        if (!axios.isAxiosError(err)) {
          toast.error("Unexpected error occurred!");
        }
      }
    },
    getSubCategories: async (CategoryId: string | number) => {
      const token = await getTokenFromServerCookies();
      const currentTime = new Date().getTime();
      set({ dataLoading: true });

      try {
        const res = await axios.get(
          `${baseUrl}/school/curriculum-sub-categories/${CategoryId}?t=${currentTime}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const subCategories = res?.data?.data?.sub_categories || [];

        set({
          subCategories,
          dataSubCatError: null,
          dataLoading: false,
        });
      } catch (err) {
        set({
          subCategories: [],
          dataSubCatError: axios.isAxiosError(err)
            ? err.response?.data?.message || "Error fetching Sub-Categories"
            : "Unexpected error occurred!",
          dataLoading: false,
        });

        if (!axios.isAxiosError(err)) {
          toast.error("Unexpected error occurred!");
        }
      }
    },
  })
);