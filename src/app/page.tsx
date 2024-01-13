import MainSlider from "@/components/home-page/main-content/main.homepage";
import * as React from "react";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/api";
export default async function HomePage() {
  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      categories: "CHILL",
      limit: 10,
    },
  });
  const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      categories: "WORKOUT",
      limit: 10,
    },
  });
  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      categories: "PARTY",
      limit: 10,
    },
  });
  return (
    <>
      <Container>
        <MainSlider data={chills?.data ?? []} />
        <MainSlider data={workouts?.data ?? []} />
        <MainSlider data={party?.data ?? []} />
      </Container>
    </>
  );
}
