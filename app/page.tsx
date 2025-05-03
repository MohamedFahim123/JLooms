"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getTokenFromServerCookies } from "./auth/utils/storeTokenOnServer";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const token = await getTokenFromServerCookies();
      if (token) {
        router.push("/dashboard/profile");
      } else {
        router.push("/auth/login");
      }
    })();
  }, [router]);

  return null;
}
