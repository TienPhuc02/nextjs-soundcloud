import MainSlider from "@/components/home-page/main-content/main.homepage";
import * as React from "react";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/api";
export default async function HomePage() {
  const res = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    // body: {
    //   categories: "CHILL",
    //   limit: 10,
    // },
  });
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
