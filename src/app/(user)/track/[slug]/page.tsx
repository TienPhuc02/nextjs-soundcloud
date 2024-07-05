import React from "react";
import { useSearchParams } from "next/navigation";
import WaveTrack from "@/components/track/wave.track";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const trackRes = await sendRequest<IBackendRes<ITrackTop>>({
    url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
    method: "GET",
  });

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: trackRes.data?.title,
    description: trackRes.data?.description,
  };
}

// export default function Page({ params, searchParams }: Props) {}

const DetailTrackPage = async (props: any) => {
  const { params } = props;
  // Fetch track details
  const trackRes = await sendRequest<IBackendRes<ITrackTop>>({
    url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
    method: "GET",
    nextOption: { cache: "no-store" },
  });

  // Fetch comments
  const commentsRes = await sendRequest<
    IBackendRes<IModelPaginate<ITrackComment>>
  >({
    url: `http://localhost:8000/api/v1/tracks/comments`,
    method: "POST",
    queryParams: {
      current: 1,
      pageSize: 10,
      trackId: params.slug,
      sort: "-createdAt",
    },
  });
  console.log("check commentsRes", commentsRes);
  // // Extract comments array from the paginated response
  // const comments = commentsRes?.data?.result ?? null;

  return (
    <div>
      <Container>
        <div>
          <WaveTrack
            track={trackRes?.data ?? null}
            commentsRes={commentsRes.data?.result ?? []}
          />
        </div>
      </Container>
    </div>
  );
};

export default DetailTrackPage;
