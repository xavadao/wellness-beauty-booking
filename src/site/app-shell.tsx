'use client';

import type { ReactNode } from 'react';


import { Outlet, OutletProvider } from '@/lib/router-compat';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			refetchOnWindowFocus: false,
		},
	},
});

function RootLayout() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
}

export default function AppShell({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<OutletProvider outlet={children}><RootLayout /></OutletProvider>
		</QueryClientProvider>
	);
}
