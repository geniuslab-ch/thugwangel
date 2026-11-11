'use client';
import {useState} from 'react';

export default function CopyButton({text, label, done}: {text: string; label: string; done: string}) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={async () => { try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1800); } catch {} }}
      className="no-print inline-flex min-h-11 items-center rounded-full border border-line px-4 text-xs font-bold uppercase tracking-[0.15em] text-mist hover:border-violet hover:text-moon"
    >
      {ok ? `✓ ${done}` : label}
    </button>
  );
}
