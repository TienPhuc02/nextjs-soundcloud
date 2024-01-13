"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
const DetailTrackPage = (props: any) => {
  const searchParams = useSearchParams();
  const { params } = props;
  console.log("🚀 ~ DetailTrackPage ~ params:", params);

  const search = searchParams.get("audio");
  console.log("🚀 ~ DetailTrackPage ~ search:", search);
  return <div>DetailTrackPage</div>;
};

export default DetailTrackPage;
