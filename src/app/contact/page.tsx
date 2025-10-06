export default function ContactPage() {
  return (
    <div className="card p-6">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <p className="mt-2 text-sm text-neutral-300">For inquiries, partnerships, or support — this is a prototype form.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input className="rounded-md border border-[--color-border] bg-transparent px-3 py-2 text-sm" placeholder="Your name" />
        <input className="rounded-md border border-[--color-border] bg-transparent px-3 py-2 text-sm" placeholder="Email" />
        <textarea className="sm:col-span-2 min-h-32 rounded-md border border-[--color-border] bg-transparent px-3 py-2 text-sm" placeholder="Message" />
        <button className="btn-primary sm:w-max">Send (Mock)</button>
      </div>
    </div>
  );
}


