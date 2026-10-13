import { pageMetadata } from '@/lib/seo';
import View from '@/site/pages/About';

export default function Page() {
	return <View />;
}

export const metadata = pageMetadata("Our Sanctuary Story", "Discover the fictional Serenova sanctuary and its botanical approach to wellness in this sample website.", "/about", true);
