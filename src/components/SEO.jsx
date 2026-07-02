import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, keywords, url, image }) {
  const siteName = "RG Tours & Travels";
  const baseUrl = "https://www.rgtravels.pk";
  const defaultImage = `${baseUrl}/og-image.jpg`;
  const fullTitle = title
    ? `${title} | ${siteName}`
    : `${siteName} — Hajj & Umrah Specialists`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={`${baseUrl}${url || ""}`} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${baseUrl}${url || ""}`} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
}
