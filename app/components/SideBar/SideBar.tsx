"use client";
import { useClassesStore } from "@/app/store/getAllClasses";
import { useCountriesStore } from "@/app/store/getAllCountries";
import { useRulesStore } from "@/app/store/getAllRules";
import { useUserStore } from "@/app/store/getLoginnedUserProfile";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaChalkboardTeacher,
  FaCog,
  FaUser,
} from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdSecurity } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { RiParentFill } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import styles from "./sideBar.module.css";

interface SideBarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function SideBar({ collapsed, setCollapsed }: SideBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { classes, getClasses, classesLoading } = useClassesStore();
  const { rules, getRules, rulesLoading } = useRulesStore();
  const { user, getUser, userLoading } = useUserStore();
  const { countries, getCountries, countriesLoading } = useCountriesStore();

  const getUserProfile = useCallback(() => {
    if (!user && !userLoading) {
      getUser();
    }
  }, [getUser, user, userLoading]);

  const getAllCountries = useCallback(() => {
    if (countries.length === 0 && !countriesLoading) {
      getCountries();
    }
  }, [getCountries, countriesLoading, countries.length]);

  const getAllRules = useCallback(() => {
    if (rules.length === 0 && !rulesLoading) {
      getRules();
    }
  }, [getRules, rulesLoading, rules.length]);

  const getAllClasses = useCallback(() => {
    if (classes.length === 0 && !classesLoading) {
      getClasses();
    }
  }, [getClasses, classesLoading, classes.length]);

  useEffect(() => {
    getAllRules();
    getAllClasses();
    getUserProfile();
    getAllCountries();
  }, [getAllClasses, getAllCountries, getAllRules, getUserProfile]);

  const isActive = (path: string) => pathname.includes(path);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  return (
    <Sidebar
      collapsed={collapsed}
      className={`min-h-screen shadow-lg ${styles.sideBarContainer}`}
    >
      <div className="flex justify-center my-2">
        {collapsed ? (
          <FaArrowAltCircleRight
            className="cursor-pointer"
            size={30}
            onClick={() => setCollapsed(!collapsed)}
          />
        ) : (
          <FaArrowAltCircleLeft
            className="cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
            size={30}
          />
        )}
      </div>
      <Menu>
        <MenuItem
          icon={<FaUser />}
          onClick={() => router.push("/dashboard/profile")}
          className={
            isActive("/dashboard/profile") ? `${styles.activeMenuItem}` : ""
          }
        >
          Profile
        </MenuItem>

        <MenuItem
          icon={<FaChalkboardTeacher />}
          onClick={() => router.push("/dashboard/teachers")}
          className={
            isActive("/dashboard/teachers") ? `${styles.activeMenuItem}` : ""
          }
        >
          Teachers
        </MenuItem>

        <MenuItem
          icon={<PiStudentBold />}
          onClick={() => router.push("/dashboard/students")}
          className={
            isActive("/dashboard/students") ? `${styles.activeMenuItem}` : ""
          }
        >
          Students
        </MenuItem>

        <MenuItem
          icon={<RiParentFill />}
          onClick={() => router.push("/dashboard/parents")}
          className={
            isActive("/dashboard/parents") ? `${styles.activeMenuItem}` : ""
          }
        >
          Parents
        </MenuItem>

        <MenuItem
          icon={<SiGoogleclassroom />}
          onClick={() => router.push("/dashboard/classes")}
          className={
            isActive("/dashboard/classes") ? `${styles.activeMenuItem}` : ""
          }
        >
          Classes
        </MenuItem>

        <SubMenu label="Curriculums" icon={<MdSecurity />}>
          <MenuItem
            onClick={() => router.push("/dashboard/curriculums")}
            className={
              isActive("/dashboard/curriculums")
                ? `${styles.activeMenuItem}`
                : ""
            }
          >
            Curriculums
          </MenuItem>
          <MenuItem
            onClick={() => router.push("/dashboard/curriculums/track")}
            className={
              isActive("/dashboard/curriculums/track")
                ? `${styles.activeMenuItem}`
                : ""
            }
          >
            Track
          </MenuItem>
        </SubMenu>

        <MenuItem
          icon={<FaPeopleGroup />}
          onClick={() => router.push("/dashboard/employees")}
          className={
            isActive("/dashboard/employees") ? `${styles.activeMenuItem}` : ""
          }
        >
          Employees
        </MenuItem>

        <SubMenu label="Settings" icon={<FaCog />}>
          <MenuItem
            onClick={() => router.push("/dashboard/settings/school-details")}
            className={
              isActive("/dashboard/settings/school-details")
                ? `${styles.activeMenuItem}`
                : ""
            }
          >
            School Details
          </MenuItem>
          <MenuItem
            onClick={() => router.push("/dashboard/settings/school-staff")}
            className={
              isActive("/dashboard/settings/school-staff")
                ? `${styles.activeMenuItem}`
                : ""
            }
          >
            School Staff
          </MenuItem>
          <MenuItem
            onClick={() => router.push("/dashboard/settings/school-settings")}
            className={
              isActive("/dashboard/settings/school-settings")
                ? `${styles.activeMenuItem}`
                : ""
            }
          >
            School Settings
          </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
}
