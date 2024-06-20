import React from "react";
import { useSearchParams } from "next/navigation";
import WaveTrack from "@/components/track/wave.track";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/api";
const DetailTrackPage = async (props: any) => {
  const searchParams = useSearchParams();
  const { params } = props;
  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `http://localhost:8080/api/v1/tracks/${params.slug}`,
    method: "GET",
  });
  // console.log("🚀 ~ DetailTrackPage ~ params:", params);

  const search = searchParams.get("audio");
  // console.log("🚀 ~ DetailTrackPage ~ search:", search);
  return (
    <div>
      <Container>
        <div>
          <WaveTrack track={res?.data ?? null} />
        </div>
      </Container>
    </div>
  );
};

export default DetailTrackPage;
