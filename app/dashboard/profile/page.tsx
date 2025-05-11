import Loader from "@/app/components/Loader/Loader";
import ProfileForm from "@/app/components/ProfileForm/ProfileForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <Suspense fallback={<Loader />}>
      <ProfileForm />
    </Suspense>
  );
}
