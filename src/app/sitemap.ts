import type { MetadataRoute } from 'next';
import { site } from '@/lib/seo';
import { services } from '@/site/data/services';
import { practitioners } from '@/site/data/practitioners';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/services", "/practitioners", "/about", "/contact", ...services.map(({ id }) => `/services/${id}`), ...practitioners.map(({ id }) => `/practitioners/${id}`),];
  return paths.map((path) => ({ url: new URL(path, site.url).toString() }));
}
