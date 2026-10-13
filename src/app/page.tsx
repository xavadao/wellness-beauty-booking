import { pageMetadata } from '@/lib/seo';
import View from '@/site/pages/Home';

export default function Page() {
	return <View />;
}

export const metadata = pageMetadata("Wellness, Refined \u2014 Demo", "Explore the fictional Serenova sanctuary, sample beauty treatments and practitioner profiles. Booking is a demonstration only.", "/", true);
