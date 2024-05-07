import * as React from "react";
import "@/styles/app.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
