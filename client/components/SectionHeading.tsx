/** Old-portfolio heading style: light lead word(s) + extra-bold key word, e.g. "My **Projects**". */
export function SectionHeading({
  lead,
  strong,
  as: Tag = "h2",
  id,
  className = "",
}: {
  lead?: string;
  strong: string;
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}) {
  return (
    <Tag id={id} className={`text-[28px] font-normal leading-tight tracking-[-0.02em] md:text-5xl ${className}`}>
      {lead && <>{lead} </>}
      <span className="font-extrabold">{strong}</span>
    </Tag>
  );
}
