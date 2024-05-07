import MainSlider from "@/components/home-page/main-content/main.homepage";
import * as React from "react";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function HomePage() {
  //dựa vào thông tin của người dùng để xem có call API hay không -> thông tin người dùng được lưu trong session -> get session

  const session = await getServerSession(authOptions);
  console.log(">> check session:", session);
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
