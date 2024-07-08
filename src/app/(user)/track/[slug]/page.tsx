import React from "react";
import { useSearchParams } from "next/navigation";
import WaveTrack from "@/components/track/wave.track";
import { sendRequest } from "@/utils/api";
import slugify from "slugify";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import Container from "@mui/material/Container";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  console.log("check params slug", params.slug);
  const temp = params?.slug?.split(".html") ?? [];
  console.log(temp[0]);
  const id = temp[0]?.split("-") ?? [];
  console.log(id[id.length - 1]);
  const trackRes = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${
      id[id.length - 1]
    }`,
    method: "GET",
  });

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: trackRes.data?.title,
    description: trackRes.data?.description,
    openGraph: {
      title: "Tien Phuc SoundSloud",
      description: "Beyond Your Coding Skills",
      type: "website",
      images: [
        `https://res.cloudinary.com/dtbn1pdxz/image/upload/v1719462930/SHOPIT/avatars/ojbwoclp4xhmuwyhb5ro.jpg`,
      ],
    },
  };
}

// export default function Page({ params, searchParams }: Props) {}

const DetailTrackPage = async (props: any) => {
  const { params } = props;
  console.log("check params slug", params.slug);
  const temp = params?.slug?.split(".html") ?? [];
  console.log(temp[0]);
  const id = temp[0]?.split("-") ?? [];
  console.log(id[id.length - 1]);

  // Fetch track details
  const trackRes = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id[id.length - 1]}`,
    method: "GET",
    nextOption: { cache: "no-store" },
  });

  // Fetch comments
  const commentsRes = await sendRequest<
    IBackendRes<IModelPaginate<ITrackComment>>
  >({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
    method: "POST",
    queryParams: {
      current: 1,
      pageSize: 10,
      trackId: params.slug,
      sort: "-createdAt",
    },
  });
  // console.log("check commentsRes", commentsRes);
  // // Extract comments array from the paginated response
  // const comments = commentsRes?.data?.result ?? null;

  if (!trackRes?.data) {
    notFound();
  }
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
