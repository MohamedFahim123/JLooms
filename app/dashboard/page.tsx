import { redirect } from "next/navigation";

export default function DashBoardPage() {
    return redirect('/dashboard/profile');
};