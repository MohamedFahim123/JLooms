import { redirect } from "next/navigation";

export default function MainLoginPage() {
    redirect('/auth/login');
};