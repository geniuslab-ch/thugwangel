'use client';
export default function PrintButton({label}: {label: string}) {
  return (
    <button onClick={() => window.print()} className="no-print rounded-full border border-moon/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] hover:bg-moon hover:text-night">
      {label}
    </button>
  );
}
