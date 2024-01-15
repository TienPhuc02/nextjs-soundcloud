import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest, response: NextResponse) {
  const url = new URL(request.url);
  console.log("🚀 ~ GET ~ url:", url);
  const searchParams = new URLSearchParams(url.searchParams);
  console.log("🚀 ~ GET ~ searchParams:", searchParams);
  const fileName = searchParams.get("audio");
  console.log("🚀 ~ GET ~ fileName:", fileName);
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${fileName}`
  );
}
