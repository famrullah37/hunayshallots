export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-12 text-center">
      {eyebrow && (
        <p className={`mb-3 text-sm font-semibold uppercase tracking-widest ${dark ? "text-golden-yellow" : "text-forest-green"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`mb-4 text-3xl font-bold md:text-4xl ${dark ? "text-white" : "text-gray-900"}`}>
        {title}
        {highlight && (
          <>
            {" "}
            <span className={dark ? "text-golden-yellow" : "text-forest-green"}>{highlight}</span>
          </>
        )}
      </h2>
      <div className="mx-auto mb-4 h-1 w-24 rounded-full bg-golden-yellow"></div>
      {subtitle && (
        <p className={`mx-auto max-w-2xl ${dark ? "text-white/80" : "text-gray-600"}`}>{subtitle}</p>
      )}
    </div>
  );
}
