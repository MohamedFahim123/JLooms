import { redirect } from "next/navigation";
import { useLoginnedUserStore } from "../store/useCurrLoginnedUser";

export default function DashBoardPage() {
  const { userLoginnedType } = useLoginnedUserStore.getState();
  const redirectedRoute =
    userLoginnedType === "Admin"
      ? "/dashboard/profile"
      : "/dashboard/employee-profile";
  redirect(redirectedRoute);
}
