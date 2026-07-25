export function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12">
      <p className="mb-2 font-mono text-sm text-accent-cyan">
        <span className="text-accent-violet">{index}</span> {subtitle}
      </p>
      <h2 className="text-gradient text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <div className="mt-4 h-px w-24 animate-pulse-glow bg-gradient-to-r from-accent-violet via-fuchsia-500 to-accent-cyan" />
    </div>
  );
}
