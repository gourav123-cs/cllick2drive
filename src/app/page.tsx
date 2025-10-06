import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-2xl border border-[--color-border] bg-gradient-to-b from-black to-[#111] p-8 sm:p-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Drive Freedom with <span className="text-[--color-accent]">Click</span>2Drive
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-300">
            Compare cars, see live availability, and book instantly — hourly or monthly. Providers manage fleets with transparent pricing.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/cars" className="btn-primary">Compare & Book</Link>
            <Link href="/providers" className="inline-flex items-center justify-center rounded-md px-4 py-2 border border-[--color-border] bg-[--color-card] hover:border-[--color-accent] transition-colors">Provider Dashboard</Link>
          </div>
        </motion.div>
        <div className="pointer-events-none absolute -inset-x-40 -bottom-40 h-80 rotate-6 bg-[--color-accent]/10 blur-3xl" />
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        <div className="card p-6">
          <h3 className="font-semibold">Compare & Choose</h3>
          <p className="mt-2 text-sm text-neutral-300">Browse cars with hourly and monthly pricing, filter by location, type, and provider.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold">Instant Booking</h3>
          <p className="mt-2 text-sm text-neutral-300">One-click booking with confirmation and simulated payment flow.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold">Empower Providers</h3>
          <p className="mt-2 text-sm text-neutral-300">Manage fleet listings, dynamic pricing, and availability in a simple dashboard.</p>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold">Competitive Edge</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-[--color-border] p-4">
            <h4 className="font-medium text-[--color-accent]">24/7 Roadside Assistance</h4>
            <p className="mt-1 text-sm text-neutral-300">Emergency jumpstart, tire change, and more for premium users.</p>
          </div>
          <div className="rounded-lg border border-[--color-border] p-4">
            <h4 className="font-medium text-[--color-accent]">All-Inclusive Payments</h4>
            <p className="mt-1 text-sm text-neutral-300">Prepaid packages covering tolls, taxes, and fuel — no surprises.</p>
          </div>
          <div className="rounded-lg border border-[--color-border] p-4">
            <h4 className="font-medium text-[--color-accent]">Convenient Pickup & Drop</h4>
            <p className="mt-1 text-sm text-neutral-300">Simulated location picker for Delhi NCR door-to-door delivery.</p>
          </div>
          <div className="rounded-lg border border-[--color-border] p-4">
            <h4 className="font-medium text-[--color-accent]">Provider Plans</h4>
            <p className="mt-1 text-sm text-neutral-300">Basic / Premium tiers with plan comparison to scale your business.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
