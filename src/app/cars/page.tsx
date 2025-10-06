"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Provider = {
  id: string;
  name: string;
  plan: "Basic" | "Premium";
  location: string;
};

export type Car = {
  id: string;
  name: string;
  type: "Sedan" | "SUV" | "Hatchback" | "EV";
  hourlyPrice: number;
  monthlyPrice: number;
  providerId: string;
  location: string;
  available: boolean;
  seats: number;
  transmission: "AT" | "MT";
  rangeKm?: number; // for EVs
  image?: string;
};

const providers: Provider[] = [
  { id: "p1", name: "Metro Rentals", plan: "Premium", location: "Delhi" },
  { id: "p2", name: "NCR Drives", plan: "Basic", location: "Gurugram" },
  { id: "p3", name: "Express Wheels", plan: "Premium", location: "Noida" },
];

const initialCars: Car[] = [
  { id: "c1", name: "Hyundai i20", type: "Hatchback", hourlyPrice: 220, monthlyPrice: 18000, providerId: "p1", location: "Delhi", available: true, seats: 5, transmission: "MT", image: "/cars/real/i20.jpg" },
  { id: "c2", name: "Maruti Swift", type: "Hatchback", hourlyPrice: 200, monthlyPrice: 16500, providerId: "p2", location: "Gurugram", available: false, seats: 5, transmission: "MT", image: "/cars/real/swift.jpg" },
  { id: "c3", name: "Tata Nexon EV", type: "EV", hourlyPrice: 350, monthlyPrice: 32000, providerId: "p3", location: "Noida", available: true, seats: 5, transmission: "AT", rangeKm: 300, image: "/cars/real/nexon-ev.jpg" },
  { id: "c4", name: "Honda City", type: "Sedan", hourlyPrice: 320, monthlyPrice: 30000, providerId: "p1", location: "Delhi", available: true, seats: 5, transmission: "AT", image: "/cars/real/city.jpg" },
  { id: "c5", name: "Hyundai Creta", type: "SUV", hourlyPrice: 380, monthlyPrice: 36000, providerId: "p2", location: "Gurugram", available: true, seats: 5, transmission: "AT", image: "/cars/real/creta.jpg" },
  { id: "c6", name: "Mahindra XUV700", type: "SUV", hourlyPrice: 420, monthlyPrice: 42000, providerId: "p3", location: "Noida", available: true, seats: 7, transmission: "AT", image: "/cars/real/xuv700.jpg" },
  { id: "c7", name: "MG ZS EV", type: "EV", hourlyPrice: 450, monthlyPrice: 50000, providerId: "p1", location: "Delhi", available: false, seats: 5, transmission: "AT", rangeKm: 320, image: "/cars/real/mg-zsev.jpg" },
];

export default function CarsPage() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All");
  const [type, setType] = useState("All");
  const [provider, setProvider] = useState("All");
  const [price, setPrice] = useState([0, 500]);
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let mounted = true;
    fetch("/api/cars", { next: { revalidate: 60 } as any })
      .then((r) => r.json())
      .then((json) => {
        if (!mounted || !json?.cars) return;
        const mapped: Car[] = json.cars.map((c: any) => {
          const t = (c.type as Car["type"]) || "Sedan";
          const fallback = t === "EV" ? "/cars/ev.svg" : t === "SUV" ? "/cars/suv.svg" : t === "Sedan" ? "/cars/sedan.svg" : "/cars/hatch.svg";
          const img = ((): string => {
            switch (c.id) {
              case "c1": return "/cars/real/i20.jpg";
              case "c2": return "/cars/real/swift.jpg";
              case "c3": return "/cars/real/nexon-ev.jpg";
              case "c4": return "/cars/real/city.jpg";
              case "c5": return "/cars/real/creta.jpg";
              case "c6": return "/cars/real/xuv700.jpg";
              case "c7": return "/cars/real/mg-zsev.jpg";
              default: return fallback;
            }
          })();
          return {
            id: c.id,
            name: c.name,
            type: t,
            hourlyPrice: c.hourlyPrice,
            monthlyPrice: c.monthlyPrice,
            providerId: c.providerId,
            location: c.location,
            available: Boolean(c.available),
            seats: 5,
            transmission: t === "EV" || t === "SUV" ? "AT" : "MT",
            image: img,
          } satisfies Car;
        });
        setCars((prev) => {
          // prefer API data; fallback to previous for ids not present
          const map = new Map<string, Car>();
          [...mapped, ...prev].forEach((c) => { if (!map.has(c.id)) map.set(c.id, c); });
          return Array.from(map.values());
        });
      })
      .catch(() => {
        // keep initialCars on error
      });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    return cars.filter((c) => {
      const providerName = providers.find((p) => p.id === c.providerId)?.name ?? "";
      if (location !== "All" && c.location !== location) return false;
      if (type !== "All" && c.type !== type) return false;
      if (provider !== "All" && providerName !== provider) return false;
      if (c.hourlyPrice < price[0] || c.hourlyPrice > price[1]) return false;
      if (query && !`${c.name} ${providerName}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, location, type, provider, price]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-xl border border-[--color-border] bg-[--color-card] p-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="grid gap-3 sm:grid-cols-5 w-full">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cars or providers"
            className="rounded-md border border-[--color-border] bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[--color-accent]"
          />
          <select value={location} onChange={(e) => setLocation(e.target.value)} className="rounded-md border border-[--color-border] bg-transparent px-3 py-2 text-sm">
            {['All','Delhi','Gurugram','Noida'].map((l) => (<option key={l} value={l}>{l}</option>))}
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-md border border-[--color-border] bg-transparent px-3 py-2 text-sm">
            {['All','Hatchback','Sedan','SUV','EV'].map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
          <select value={provider} onChange={(e) => setProvider(e.target.value)} className="rounded-md border border-[--color-border] bg-transparent px-3 py-2 text-sm">
            {['All', ...providers.map((p) => p.name)].map((p) => (<option key={p} value={p}>{p}</option>))}
          </select>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={500}
              value={price[1]}
              onChange={(e) => setPrice([0, Number(e.target.value)])}
              className="w-full"
            />
            <span className="text-xs text-neutral-400">₹{price[1]}/hr</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => {
          const providerName = providers.find((p) => p.id === c.providerId)?.name ?? "";
          return (
            <motion.div key={c.id} className="card p-4 flex flex-col gap-3" whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
              <div className="aspect-video w-full overflow-hidden rounded-md border border-[--color-border] bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-full w-full object-cover opacity-80"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    const fallback = c.type === 'EV' ? '/cars/ev.svg' : c.type === 'SUV' ? '/cars/suv.svg' : c.type === 'Sedan' ? '/cars/sedan.svg' : '/cars/hatch.svg';
                    if (target.src.endsWith(fallback)) return;
                    target.src = fallback;
                  }}
                  onLoad={() => setLoaded((s) => ({ ...s, [c.id]: true }))}
                />
                {!loaded[c.id] && (
                  <div className="absolute inset-0 bg-black/40">
                    <div className="absolute inset-0 animate-pulse bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0)_100%)]" />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{c.name}</h3>
                  <p className="text-xs text-neutral-400">{c.type} • {c.seats} seats • {c.transmission}</p>
                  <p className="text-xs text-neutral-400">{providerName} • {c.location}</p>
                </div>
                <span className={`text-xs ${c.available ? 'text-emerald-400' : 'text-neutral-500'}`}>{c.available ? 'Available' : 'Unavailable'}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p><span className="text-[--color-accent] font-semibold">₹{c.hourlyPrice}</span>/hr</p>
                  <p className="text-neutral-400">₹{c.monthlyPrice}/mo</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/cars/${c.id}`} className="rounded-md border border-[--color-border] px-3 py-2 text-xs hover:border-[--color-accent]">Details</Link>
                  <motion.a whileTap={{ scale: 0.97 }} className="btn-primary text-xs" href={{ pathname: "/bookings", query: { carId: c.id } } as unknown as string}>Book Now</motion.a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}


