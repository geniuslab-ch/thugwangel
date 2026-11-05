export default function SectionHeading({kicker, title, id, as: Tag = 'h2', className = ''}: {
  kicker: string;
  title: string;
  id?: string;
  as?: 'h1' | 'h2';
  className?: string;
}) {
  // Last word rendered in italic serif for the cinematic contrast
  const words = title.trim().split(' ');
  const last = words.pop();
  return (
    <div className={className}>
      <p className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.3em] text-violet">{kicker}</p>
      <Tag id={id} className="font-display text-[clamp(1.8rem,8.4vw,3.75rem)] leading-[1.02] hyphens-auto break-words font-black tracking-tight uppercase text-balance">
        {words.join(' ')}{' '}
        <span className="font-serif italic normal-case font-normal text-glow tracking-normal">{last}</span>
      </Tag>
    </div>
  );
}
