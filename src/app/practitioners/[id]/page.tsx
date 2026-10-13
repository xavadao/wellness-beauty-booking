import { practitioners } from '@/site/data/practitioners';
import View from '@/site/pages/PractitionerDetail';

export default function Page() {
	return <View />;
}

export function generateStaticParams() {
  return practitioners.map(({ id }) => ({ id }));
}

export const dynamicParams = false;
