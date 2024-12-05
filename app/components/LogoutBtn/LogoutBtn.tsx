
import { authEndPoints } from "@/app/auth/utils/authEndPoints";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function LogoutBtn() {
    const TOKEN = Cookies.get('JLOOMS_TOKEN');
    const logout = async () => {
        const loadingToastId = toast.loading('Loading...');
        const fetchRes = await fetch(authEndPoints.logout, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${TOKEN}`,
            },
        });
        const res = await fetchRes.json();
        toast.update(loadingToastId, {
            render: res?.data?.message || 'Logout Successfully!',
            type: 'success',
            isLoading: false,
            autoClose: 1500,
        });
        Cookies.remove('JLOOMS_TOKEN');
        window.location.reload();
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
};