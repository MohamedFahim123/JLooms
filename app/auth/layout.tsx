"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import RegisterStepProgress, {
  Step,
} from "../components/RegisterStepProgress/RegisterStepProgress";
import styles from "./authStyles.module.css";
import { getTokenFromServerCookies } from "./utils/storeTokenOnServer";
import { useLoginnedUserStore } from "../store/useCurrLoginnedUser";

const steps2: Step[] = [
  {
    title: "Your details",
    subtitle: "Name and email",
    isCompleted: true,
    isActive: false,
  },
  {
    title: "Choose a password",
    subtitle: "Choose a secure password",
    isCompleted: false,
    isActive: true,
  },
  {
    title: "Upload school’s document",
    subtitle: "For account verification",
    isCompleted: false,
    isActive: false,
  },
];

const steps3: Step[] = [
  {
    title: "Your details",
    subtitle: "Name and email",
    isCompleted: true,
    isActive: false,
  },
  {
    title: "Choose a password",
    subtitle: "Choose a secure password",
    isCompleted: true,
    isActive: false,
  },
  {
    title: "Upload school’s document",
    subtitle: "For account verification",
    isCompleted: false,
    isActive: true,
  },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userLoginned } = useLoginnedUserStore();
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const token = await getTokenFromServerCookies();
      if (token) {
        if (userLoginned?.admin_name) {
          router.push("/dashboard/profile");
        } else {
          router.push("/dashboard/employee-profile");
        }
        return;
      }
    })();
  }, [router, userLoginned?.admin_name]);

  return (
    <div className={`${styles.auth_layout}`}>
      <div
        className={`${pathName === "/auth/login" && styles.paddingBlockNone} ${
          styles.auth_container
        }`}
      >
        {children}
      </div>
      {(pathName === "/auth/register/step2" ||
        pathName === "/auth/register/step3") && (
        <div className={styles.registerSteps}>
          <RegisterStepProgress
            steps={pathName === "/auth/register/step3" ? steps3 : steps2}
          />
        </div>
      )}
    </div>
  );
}
