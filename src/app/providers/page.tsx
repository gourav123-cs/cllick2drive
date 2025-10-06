"use client";
import { useState } from "react";

type ProviderPlan = "Basic" | "Premium";

export default function ProvidersPage() {
  const [plan, setPlan] = useState<ProviderPlan>("Basic");
  return (
    <div className="space-y-8">
      <section className="card p-6">
        <h1 className="text-2xl font-semibold">Provider Dashboard (Mock)</h1>
        <p className="mt-2 text-sm text-neutral-300">List, update, and manage your cars. Toggle availability and set dynamic pricing.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <input className="rounded-md border border-[--color-border] bg-transparent px-3 py-2 text-sm" placeholder="Car name" />
          <input className="rounded-md border border-[--color-border] bg-transparent px-3 py-2 text-sm" placeholder="Hourly price (₹)" />
          <button className="btn-primary">Add Car (Mock)</button>
        </div>
        <div className="mt-4 grid gap-2">
          {[{id:'c1', name:'Hyundai i20', price:220, status:'Available'}, {id:'c2', name:'Swift', price:200, status:'Unavailable'}].map((x) => (
            <div key={x.id} className="flex items-center justify-between rounded-md border border-[--color-border] p-3 text-sm">
              <div>
                <p className="font-medium">{x.name}</p>
                <p className="text-neutral-400">₹{x.price}/hr</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={x.status==='Available' ? 'text-emerald-400' : 'text-neutral-500'}>{x.status}</span>
                <button className="rounded-md border border-[--color-border] px-2 py-1 hover:border-[--color-accent]">Toggle</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold">Provider Plans</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className={`rounded-xl border p-5 ${plan==='Basic' ? 'border-[--color-accent]' : 'border-[--color-border]'} bg-[--color-card]`}>
            <h3 className="font-medium">Basic</h3>
            <p className="mt-1 text-sm text-neutral-300">List up to 10 cars, standard support.</p>
            <button className="mt-3 rounded-md border border-[--color-border] px-3 py-2 text-sm hover:border-[--color-accent]" onClick={() => setPlan('Basic')}>Choose Basic</button>
          </div>
          <div className={`rounded-xl border p-5 ${plan==='Premium' ? 'border-[--color-accent]' : 'border-[--color-border]'} bg-[--color-card]`}>
            <h3 className="font-medium text-[--color-accent]">Premium</h3>
            <p className="mt-1 text-sm text-neutral-300">Unlimited cars, priority support, roadside assistance integration.</p>
            <button className="mt-3 btn-primary" onClick={() => setPlan('Premium')}>Choose Premium</button>
          </div>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold">Plan Comparison</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-neutral-400">
              <tr>
                <th className="py-2">Feature</th>
                <th className="py-2">Basic</th>
                <th className="py-2">Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[--color-border]"><td className="py-2">Cars limit</td><td>10</td><td>Unlimited</td></tr>
              <tr className="border-t border-[--color-border]"><td className="py-2">Support</td><td>Standard</td><td>Priority</td></tr>
              <tr className="border-t border-[--color-border]"><td className="py-2">Roadside assistance</td><td>—</td><td>Included</td></tr>
              <tr className="border-t border-[--color-border]"><td className="py-2">Dynamic pricing</td><td>Manual</td><td>Advanced</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold">Communication</h2>
        <div className="mt-3 rounded-md border border-[--color-border] bg-black/30 p-4 text-sm text-neutral-300">Mock chat coming soon…</div>
      </section>
    </div>
  );
}


