import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { resolveRequestLocale } from "@/lib/locale-routing";

export default async function V2Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const requestLocale = resolveRequestLocale(locale);

  if (!requestLocale) {
    notFound();
  }

  setRequestLocale(requestLocale);

  return <>{children}</>;
}
