'use client'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaUser, FaBook, FaChalkboardTeacher, FaCog, FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useRouter, usePathname } from 'next/navigation';
import styles from './sideBar.module.css';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

interface SideBarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

export default function SideBar({ collapsed, setCollapsed }: SideBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (path: string) => pathname.includes(path);

  return (
    <Sidebar collapsed={collapsed} className={`h-screen shadow-lg ${styles.sideBarContainer}`}>
      <div
        className='flex justify-center my-2'
      >
        {
          collapsed ?
            <FaArrowAltCircleRight className='cursor-pointer' size={30} onClick={() => setCollapsed(!collapsed)} />
            :
            <FaArrowAltCircleLeft className='cursor-pointer' onClick={() => setCollapsed(!collapsed)} size={30} />
        }
      </div>
      <Menu >
        <MenuItem
          icon={<FaUser />}
          onClick={() => router.push('/dashboard/profile')}
          className={isActive('/dashboard/profile') ? `${styles.activeMenuItem}` : ''}
        >
          Profile
        </MenuItem>

        <SubMenu
          className={isActive('/dashboard/settings') ? `${styles.activeMenuItem}` : ''}
          label="Settings"
          icon={<FaCog />}
        >
          <MenuItem
            onClick={() => router.push('/dashboard/settings/school-details')}
            className={isActive('/dashboard/settings/school-details') ? `${styles.activeMenuItem}` : ''}
          >
            School Details
          </MenuItem>
          <MenuItem
            onClick={() => router.push('/dashboard/settings/school-staff')}
            className={isActive('/dashboard/settings/school-staff') ? `${styles.activeMenuItem}` : ''}
          >
            School Staff
          </MenuItem>
          <MenuItem
            onClick={() => router.push('/dashboard/settings/school-settings')}
            className={isActive('/dashboard/settings/school-settings') ? `${styles.activeMenuItem}` : ''}
          >
            School Settings
          </MenuItem>
        </SubMenu>

        <MenuItem
          icon={<FaChalkboardTeacher />}
          onClick={() => router.push('/dashboard/teachers')}
          className={isActive('/dashboard/teachers') ? `${styles.activeMenuItem}` : ''}
        >
          Teachers
        </MenuItem>

        <MenuItem
          icon={<FaBook />}
          onClick={() => router.push('/dashboard/students')}
          className={isActive('/dashboard/students') ? `${styles.activeMenuItem}` : ''}
        >
          Students
        </MenuItem>

        <MenuItem
          icon={<FaBook />}
          onClick={() => router.push('/dashboard/classes')}
          className={isActive('/dashboard/classes') ? `${styles.activeMenuItem}` : ''}
        >
          Classes
        </MenuItem>

        <MenuItem
          icon={<FaBell />}
          onClick={() => router.push('/dashboard/events')}
          className={isActive('/dashboard/events') ? `${styles.activeMenuItem}` : ''}
        >
          Events
        </MenuItem>

        <MenuItem
          icon={<FaBell />}
          onClick={() => router.push('/dashboard/notifications')}
          className={isActive('/dashboard/notifications') ? `${styles.activeMenuItem}` : ''}
        >
          Notifications
        </MenuItem>

        <MenuItem
          icon={<FaSignOutAlt />}
          onClick={() => router.push('/dashboard/requests')}
          className={isActive('/dashboard/requests') ? `${styles.activeMenuItem}` : ''}
        >
          Requests
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
