import { create } from "zustand";

interface EmpLoginned {
  city: string;
  country: string;
  email: string;
  id: number;
  image: string;
  name: string;
  permissions: string[];
  phone: string;
  role: string;
  school_id: number;
  school_image: string;
  school_name: string;
  state: string;
  title: string;
  admin_name: string;
}

export interface UseLoginnedUserStoreIterface {
  userLoginned: EmpLoginned | null;
  userLoginnedType: string | null;
  setUserLoginnedType: (user: string) => void;
  setUserLoginned: (user: EmpLoginned | null) => void;
}

export const useLoginnedUserStore = create<UseLoginnedUserStoreIterface>(
  (set) => ({
    userLoginned: null,
    userLoginnedType: null,
    setUserLoginnedType: (user) => {
      if (typeof window !== "undefined" && user) {
        localStorage.setItem("userType", user);
      }
      set({ userLoginnedType: user });
    },
    setUserLoginned: (user: EmpLoginned | null) => {
      set({ userLoginned: user });
    },
  })
);
