import { pageMetadata } from '@/lib/seo';
import { getServiceById } from '@/site/data/services';
import { services } from '@/site/data/services';
import View from '@/site/pages/ServiceDetail';

export default function Page() {
	return <View />;
}

export function generateStaticParams() {
  return services.map(({ id }) => ({ id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getServiceById(id);
  if (!item) return pageMetadata('Page not found', 'The requested sample page does not exist.', '/services/' + id, false);
  return pageMetadata(`${item.name} — Sample Treatment`, `Explore ${item.name}, an illustrative Serenova treatment with sample duration and price. This demo does not reserve appointments.`, '/services/' + id, true, item.image);
}
