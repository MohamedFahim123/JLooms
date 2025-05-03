"use server";

import { cookies } from "next/headers";

export async function setServerCookie(name: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function getTokenFromServerCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get("CLIENT_JLOOMS_TOKEN")?.value;
  return token;
}

export async function removeTokenFromServerCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("CLIENT_JLOOMS_TOKEN");
}
