import * as React from "react";

import Header from "@/components/home-page/header/app.header";
import Footer from "@/components/home-page/footer/app.footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextJS SoundCloud",
  description:"miêu tả layout tiêu đề."
}
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
      <div style={{ marginBottom: "100px" }}></div>
      <Footer />
    </>
  );
}
