"use client";
import * as React from "react";

import ThemeRegistry from "@/components/theme-registry/theme.registry";
import Header from "@/components/home-page/header/app.header";
import Footer from "@/components/home-page/footer/app.footer";
import { SessionProvider } from "next-auth/react";
export default function NextAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
