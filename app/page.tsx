'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const TOKEN = Cookies.get('SERVER_JLOOMS_TOKEN');
    if (TOKEN) {
      router.push('/dashboard/profile');
    } else {
      router.push('/auth/login');
    };
  }, [router]);

  return null;
};