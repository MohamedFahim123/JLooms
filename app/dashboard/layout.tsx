'use client';
import React, { useEffect, useState } from 'react';
import { LayoutInterface } from '../utils/interfaces';
import SideBar from '../components/SideBar/SideBar';
import { FaBell } from 'react-icons/fa';
import styles from './dashboardMain.module.css';
import Image from 'next/image';
import logo from '@/public/Ellipse6.svg';
import { useRouter } from 'next/navigation';
import LogoutBtn from '../components/LogoutBtn/LogoutBtn';
import Cookies from 'js-cookie';

export default function Layout({ children }: LayoutInterface) {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('CLIENT_JLOOMS_TOKEN');
        if (!token) {
            router.push('/auth/login');
            return;
        };
    }, [router]);

    return (
        <div className="flex min-h-screen">
            <div className={`${styles.sideBarContainer} ${collapsed ? 'w-20' : 'w-62'}`}>
                <div className={`flex flex-col items-center py-4`}>
                    <Image src={logo} alt="Join Looms Logo" />
                    <h2 className={`font-semibold ${styles.dashBoardMainColor} ${collapsed && 'hidden'}`}>
                        Sample Inter. school
                    </h2>
                </div >
                <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
            </div >
            <div className={`flex flex-col flex-1 ${styles.sideBarContainer}`}>
                <header className="flex justify-between items-center px-6 py-4">
                    <h1 className={`text-2xl font-bold ${styles.dashBoardMainColor}`}>Hello, Moe 👋</h1>
                    <div className="flex items-center gap-4">
                        <button type="button" onClick={() => router.push('/dashboard/notifications')} className={styles.dashBoardMainColor}>
                            <FaBell size={24} />
                        </button>
                        <LogoutBtn />
                    </div>
                </header >
                <main className="flex-1 px-6 pt-6">
                    <div className={`bg-white ${styles.contentRadius}`}>
                        {children}
                    </div>
                </main >
            </div >
        </div >
    );
}
