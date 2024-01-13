import MainSlider from "@/components/home-page/main-content/main.homepage";
import * as React from "react";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/api";
export default async function HomePage() {
  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      category: "CHILL",
      limit: 10,
    },
  });
  const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      category: "WORKOUT",
      limit: 10,
    },
  });
  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      category: "PARTY",
      limit: 10,
    },
  });
  return (
    <>
      <Container>
        <MainSlider data={chills?.data ?? []} title={"Chill Tracks"} />
        <MainSlider data={workouts?.data ?? []} title={"Workout Tracks"} />
        <MainSlider data={party?.data ?? []} title={"Party Tracks"} />
      </Container>
    </>
  );
}
