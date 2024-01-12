import MainSlider from "@/components/home-page/main-content/main.homepage";
import * as React from "react";
import { Container } from "@mui/material";
export default function HomePage() {
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
