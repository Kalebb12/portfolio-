/** Sanity file URL that downloads as "<Name>-CV.pdf" (Sanity's CDN honours `?dl=`). */
export function cvDownloadUrl(cvUrl: string, name?: string | null) {
  const fileName = `${(name ?? "CV").trim().replace(/\s+/g, "-")}-CV.pdf`;
  return `${cvUrl}?dl=${encodeURIComponent(fileName)}`;
}
