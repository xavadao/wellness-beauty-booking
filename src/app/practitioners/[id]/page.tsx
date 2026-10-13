import { pageMetadata } from '@/lib/seo';
import { getPractitionerById } from '@/site/data/practitioners';
import { practitioners } from '@/site/data/practitioners';
import View from '@/site/pages/PractitionerDetail';

export default function Page() {
	return <View />;
}

export function generateStaticParams() {
  return practitioners.map(({ id }) => ({ id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getPractitionerById(id);
  if (!item) return pageMetadata('Page not found', 'The requested sample page does not exist.', '/practitioners/' + id, false);
  return pageMetadata(`${item.name} — Sample Practitioner`, `Meet ${item.name}, a fictional Serenova practitioner. Explore sample expertise and the demo booking flow.`, '/practitioners/' + id, true, item.image);
}
