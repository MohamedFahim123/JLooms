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
  setUserLoginned: (user: EmpLoginned | null) => void;
}

export const useLoginnedUserStore = create<UseLoginnedUserStoreIterface>(
  (set) => ({
    userLoginned: null,
    setUserLoginned: (user: EmpLoginned | null) => {
      set({ userLoginned: user });
    },
  })
);
