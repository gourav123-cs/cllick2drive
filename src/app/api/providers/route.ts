import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    { id: "p1", name: "Metro Rentals", plan: "Premium", location: "Delhi" },
    { id: "p2", name: "NCR Drives", plan: "Basic", location: "Gurugram" },
    { id: "p3", name: "Express Wheels", plan: "Premium", location: "Noida" },
  ];
  const res = NextResponse.json({ providers: data });
  res.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
  return res;
}


