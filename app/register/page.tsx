import { redirect } from "next/navigation";

export default function MainRegisterPage() {
    redirect('/auth/register/step1');
};