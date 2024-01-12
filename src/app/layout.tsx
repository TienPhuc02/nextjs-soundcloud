import * as React from "react";

import ThemeRegistry from "@/components/theme-registry/theme.registry";
import Header from "@/components/home-page/header/app.header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Header />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
