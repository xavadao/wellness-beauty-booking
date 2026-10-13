import { services } from '@/site/data/services';
import View from '@/site/pages/ServiceDetail';

export default function Page() {
	return <View />;
}

export function generateStaticParams() {
  return services.map(({ id }) => ({ id }));
}

export const dynamicParams = false;
