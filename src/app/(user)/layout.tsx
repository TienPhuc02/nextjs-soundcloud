import * as React from "react";

import Header from "@/components/home-page/header/app.header";
import Footer from "@/components/home-page/footer/app.footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header
        params={{
          slug: "",
        }}
      />
      {children}
      <Footer />
    </>
  );
}
