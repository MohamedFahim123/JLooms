import { redirect } from "next/navigation";

export default function DashBoardPage() {
  const userType = localStorage.getItem("userType");
  const redirectedRoute =
    userType === "Admin" ? "/dashboard/profile" : "/dashboard/employee-profile";
  redirect(redirectedRoute);
}
