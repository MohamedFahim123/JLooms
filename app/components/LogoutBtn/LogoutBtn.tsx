import { authEndPoints } from "@/app/auth/utils/authEndPoints";
import {
  getTokenFromServerCookies,
  removeTokenFromServerCookies,
} from "@/app/auth/utils/storeTokenOnServer";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export default function LogoutBtn() {
  const logout = async () => {
    const token = await getTokenFromServerCookies();
    const userType = localStorage.getItem("userType");
    const loadingToastId = toast.loading("Loading...");
    const fetchRes = await fetch(
      userType === "Admin"
        ? authEndPoints.logout
        : authEndPoints.employee_logout,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await fetchRes.json();
    toast.update(loadingToastId, {
      render: res?.data?.message || "Logout Successfully!",
      type: "success",
      isLoading: false,
      autoClose: 1500,
    });
    await removeTokenFromServerCookies();
    Cookies.remove("CLIENT_JLOOMS_TOKEN");
    redirect("/auth/login");
  };

  return (
    <button
      onClick={logout}
      type="button"
      className={`
                flex items-center gap-2 
                px-4 py-2
                outline-none 
                bg-red-500 text-white
                rounded-lg 
                hover:bg-white transition-all duration-300 
                hover:text-red-500
                active:bg-white 
                shadow-md
                focus:outline-none 
            `}
    >
      <FaSignOutAlt size={18} />
      Logout
    </button>
  );
}
