type Props = {
  children: React.ReactNode;
  /** "content" = 720px prose column, "wide" = 1100px grid column */
  width?: "content" | "wide";
  className?: string;
};

export function Container({ children, width = "wide", className = "" }: Props) {
  const max = width === "content" ? "max-w-content" : "max-w-wide";
  return <div className={`mx-auto w-full ${max} px-4 sm:px-6 ${className}`}>{children}</div>;
}
