type SectionPlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
};

export function SectionPlaceholder({
  eyebrow,
  title,
  description,
  bullets,
}: SectionPlaceholderProps) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-8">
      <p className="text-sm font-medium tracking-[0.24em] text-white/40 uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-white">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
        {description}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {bullets.map((bullet) => (
          <div
            key={bullet}
            className="rounded-2xl border border-white/10 bg-black/10 px-4 py-4 text-sm leading-6 text-white/75"
          >
            {bullet}
          </div>
        ))}
      </div>
    </section>
  );
}
