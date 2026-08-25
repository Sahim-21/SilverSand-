import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PublicShell } from "@/components/public-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { getPublicPricing } from "@/lib/pricing/fetch";
import { lodgingBusinessJsonLd, websiteJsonLd } from "@/lib/seo/json-ld";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pricing = await getPublicPricing();

  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={lodgingBusinessJsonLd(pricing)} />
      <div className="public-site flex flex-1 flex-col">
        <PublicShell>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </PublicShell>
      </div>
    </>
  );
}
