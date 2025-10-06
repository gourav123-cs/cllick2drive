import { NextResponse } from "next/server";

const DB = [
  { id: "c1", name: "Hyundai i20", type: "Hatchback", hourlyPrice: 220, monthlyPrice: 18000, providerId: "p1", location: "Delhi", available: true },
  { id: "c2", name: "Maruti Swift", type: "Hatchback", hourlyPrice: 200, monthlyPrice: 16500, providerId: "p2", location: "Gurugram", available: false },
  { id: "c3", name: "Tata Nexon EV", type: "EV", hourlyPrice: 350, monthlyPrice: 32000, providerId: "p3", location: "Noida", available: true },
  { id: "c4", name: "Honda City", type: "Sedan", hourlyPrice: 320, monthlyPrice: 30000, providerId: "p1", location: "Delhi", available: true },
  { id: "c5", name: "Hyundai Creta", type: "SUV", hourlyPrice: 380, monthlyPrice: 36000, providerId: "p2", location: "Gurugram", available: true },
  { id: "c6", name: "Mahindra XUV700", type: "SUV", hourlyPrice: 420, monthlyPrice: 42000, providerId: "p3", location: "Noida", available: true },
  { id: "c7", name: "MG ZS EV", type: "EV", hourlyPrice: 450, monthlyPrice: 50000, providerId: "p1", location: "Delhi", available: false },
];

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const car = DB.find((c) => c.id === params.id);
  if (!car) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const res = NextResponse.json({ car });
  res.headers.set("Cache-Control", "public, s-maxage=120, stale-while-revalidate=600");
  return res;
}


