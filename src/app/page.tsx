import MainSlider from "@/components/home-page/main-content/main.homepage";
import * as React from "react";
import { Container } from "@mui/material";
export default async function HomePage() {
  const res = await fetch("http://localhost:8000/api/v1/tracks/top", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category: "CHILL",
      limit: 10,
    }),
  });
  console.log("🚀 ~ HomePage ~ res-server:", await res.json());
  return (
    <>
      <Container>
        <MainSlider />
        <MainSlider />
        <MainSlider />
      </Container>
    </>
  );
}
