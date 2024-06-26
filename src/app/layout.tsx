import * as React from "react";

import ThemeRegistry from "@/components/theme-registry/theme.registry";
import Header from "@/components/home-page/header/app.header";
import Footer from "@/components/home-page/footer/app.footer";
import NextAuthWrapper from "@/lib/wrapper.next-auth";
import { ToastProvider } from "@/utils/toast";
import { TrackContextProvider } from "@/lib/track.wrapper";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NextAuthWrapper>
            <ToastProvider>
              <TrackContextProvider>{children}</TrackContextProvider>
            </ToastProvider>
          </NextAuthWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
