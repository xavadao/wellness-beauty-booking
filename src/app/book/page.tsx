import { pageMetadata } from '@/lib/seo';
import View from '@/site/pages/Book';

export default function Page() {
	return <View />;
}

export const metadata = pageMetadata("Demo Treatment Booking", "Try the fictional Serenova appointment flow with sample practitioner and date choices. No appointment is reserved or email sent.", "/book", false);
