import ProfileForm from "@/app/components/ProfileForm/ProfileForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ProfileForm />
    </Suspense>
  );
}
