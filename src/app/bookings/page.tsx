"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Booking = {
  id: string;
  carId: string;
  name: string;
  pickup: string;
  drop: string;
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const searchParams = useSearchParams();
  const carIdFromQuery = searchParams.get("carId");

  const [name, setName] = useState("");
  const [pickup, setPickup] = useState("Delhi");
  const [drop, setDrop] = useState("Gurugram");

  const handleBook = () => {
    const id = Math.random().toString(36).slice(2);
    setBookings((b) => [{ id, carId: carIdFromQuery ?? "c1", name, pickup, drop }, ...b]);
    setName("");
  };

  const hasQuery = useMemo(() => Boolean(carIdFromQuery), [carIdFromQuery]);

  return (
    <div className="space-y-6">
      <section className="card p-6">
        <h1 className="text-2xl font-semibold">Book a Car</h1>
        <p className="mt-1 text-sm text-neutral-300">Simulated booking flow with instant confirmation. {hasQuery ? `Selected car: ${carIdFromQuery}` : ""}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <input className="rounded-md border border-[--color-border] bg-transparent px-3 py-2 text-sm" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          <select className="rounded-md border border-[--color-border] bg-transparent px-3 py-2 text-sm" value={pickup} onChange={(e) => setPickup(e.target.value)}>
            {['Delhi','Gurugram','Noida'].map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
          <select className="rounded-md border border-[--color-border] bg-transparent px-3 py-2 text-sm" value={drop} onChange={(e) => setDrop(e.target.value)}>
            {['Delhi','Gurugram','Noida'].map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
          <button className="btn-primary" onClick={handleBook}>Confirm Booking</button>
        </div>
        <p className="mt-3 text-xs text-neutral-400">GPS mock below: pickup/drop path visualization.</p>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold">Your Bookings</h2>
        <div className="mt-4 grid gap-3">
          {bookings.length === 0 && (
            <div className="rounded-md border border-[--color-border] p-4 text-sm text-neutral-300">No bookings yet.</div>
          )}
          {bookings.map((b) => (
            <div key={b.id} className="rounded-md border border-[--color-border] p-4 text-sm flex items-center justify-between">
              <div>
                <p className="font-medium">{b.name}</p>
                <p className="text-neutral-400">Car: {b.carId} • {b.pickup} → {b.drop}</p>
              </div>
              <span className="text-emerald-400">Confirmed</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold">Pickup/Drop Visualization (Mock)</h2>
        <div className="mt-4 h-64 w-full rounded-md border border-[--color-border] bg-[conic-gradient(at_50%_120%,#1a1a1a,black)] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,#ff1a1a,transparent_40%)]" />
          <div className="absolute left-6 top-6 flex items-center gap-2 text-xs"><span className="size-2 rounded-full bg-emerald-400" />{pickup}</div>
          <div className="absolute right-6 bottom-6 flex items-center gap-2 text-xs"><span className="size-2 rounded-full bg-[--color-accent]" />{drop}</div>
          <svg className="absolute inset-0" viewBox="0 0 400 256" preserveAspectRatio="none">
            <path d="M40 40 C 120 20, 180 120, 360 216" stroke="url(#g)" strokeWidth="2" fill="none" />
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#ff1a1a" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </div>
  );
}


