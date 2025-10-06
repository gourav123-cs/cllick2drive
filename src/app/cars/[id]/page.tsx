import Link from "next/link";
import { motion } from "framer-motion";

async function getCar(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/cars/${id}`, { next: { revalidate: 120 } as any });
  if (!res.ok) return null;
  const json = await res.json();
  return json.car as { id: string; name: string; type: string } | null;
}

export default async function CarDetails({ params }: { params: { id: string } }) {
  const car = await getCar(params.id);
  if (!car) {
    return <div className="card p-6">Car not found.</div>;
  }
  const fallback = car.type === 'EV' ? '/cars/ev.svg' : car.type === 'SUV' ? '/cars/suv.svg' : car.type === 'Sedan' ? '/cars/sedan.svg' : '/cars/hatch.svg';
  const map: Record<string, string> = {
    c1: "/cars/real/i20.jpg",
    c2: "/cars/real/swift.jpg",
    c3: "/cars/real/nexon-ev.jpg",
    c4: "/cars/real/city.jpg",
    c5: "/cars/real/creta.jpg",
    c6: "/cars/real/xuv700.jpg",
    c7: "/cars/real/mg-zsev.jpg",
  };
  const hero = map[params.id] ?? fallback;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{car.name}</h1>
        <Link href={{ pathname: "/bookings", query: { carId: params.id } }} className="btn-primary">Book Now</Link>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <motion.div className="card p-4 lg:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="relative aspect-video w-full overflow-hidden rounded-md border border-[--color-border] bg-black/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero}
              alt={car.name}
              className="h-full w-full object-cover opacity-90"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src.endsWith(fallback)) return;
                target.src = fallback;
              }}
            />
          </div>
        </motion.div>
        <div className="space-y-4">
          <div className="card p-4">
            <h3 className="font-medium">Specifications</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-neutral-300">
              <li>5 seats</li>
              <li>{car.type === 'Sedan' || car.type === 'SUV' ? 'AT' : 'MT'}</li>
              <li>{car.type}</li>
            </ul>
          </div>
          <div className="card p-4">
            <h3 className="font-medium">Features</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-neutral-300">
              <li>Airbags</li>
              <li>ABS</li>
              <li>Bluetooth</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


