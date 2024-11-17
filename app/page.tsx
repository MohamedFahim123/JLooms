import { redirect } from "next/navigation";

export default function Home() {
  const token = '1';
  if (token) {
    redirect('/dashboard');
  } else if (!token) {
    redirect('/auth/login');
  };
};