import { pageMetadata } from '@/lib/seo';
import View from '@/site/pages/Practitioners';

export default function Page() {
	return <View />;
}

export const metadata = pageMetadata("Meet the Practitioners", "Explore four fictional Serenova practitioner profiles, sample expertise and signature treatments.", "/practitioners", true);
