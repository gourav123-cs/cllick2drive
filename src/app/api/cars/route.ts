import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    { id: "c1", name: "Hyundai i20", type: "Hatchback", hourlyPrice: 220, monthlyPrice: 18000, providerId: "p1", location: "Delhi", available: true },
    { id: "c2", name: "Maruti Swift", type: "Hatchback", hourlyPrice: 200, monthlyPrice: 16500, providerId: "p2", location: "Gurugram", available: false },
    { id: "c3", name: "Tata Nexon EV", type: "EV", hourlyPrice: 350, monthlyPrice: 32000, providerId: "p3", location: "Noida", available: true },
  ];
  const res = NextResponse.json({ cars: data });
  res.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=600");
  return res;
}


