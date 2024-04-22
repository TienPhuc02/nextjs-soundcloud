"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import WaveTrack from "@/components/track/wave.track";
import { Container } from "@mui/material";
const DetailTrackPage = (props: any) => {
  const searchParams = useSearchParams();
  const { params } = props;
  console.log("🚀 ~ DetailTrackPage ~ params:", params);

  const search = searchParams.get("audio");
  console.log("🚀 ~ DetailTrackPage ~ search:", search);
  return (
    <div>
      <Container>
        <div>
          <WaveTrack />
        </div>
      </Container>
    </div>
  );
};

export default DetailTrackPage;
