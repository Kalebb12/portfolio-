/** Small mono label for stack items, categories and write-up tags. */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded border border-current px-2 py-0.5 font-mono text-xs">
      {children}
    </span>
  );
}
