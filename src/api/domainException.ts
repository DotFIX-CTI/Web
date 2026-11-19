export function DomainException(error: any, fallback: string): string {
  const data = error?.response?.data;
  if (typeof data === "string" && data.trim()) return data;
  if (data?.message) return data.message;
  if (data?.title) return data.title;
  return error?.message || fallback;
}
