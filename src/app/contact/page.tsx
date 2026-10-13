import { pageMetadata } from '@/lib/seo';
import View from '@/site/pages/Contact';

export default function Page() {
	return <View />;
}

export const metadata = pageMetadata("Demo Concierge", "Try the sample Serenova contact form. Messages are not sent or stored, and business contact details are fictional.", "/contact", true);
