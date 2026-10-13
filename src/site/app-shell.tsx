'use client';

import type { ReactNode } from 'react';
/**
 * App Component — Serenova Eco-Luxury Wellness Platform
 *
 * Routing: React Router v7 library mode — createBrowserRouter + RouterProvider.
 * - Import from 'react-router' only. Never from 'react-router-dom'.
 * - Use createBrowserRouter (data router). Do NOT use <BrowserRouter> or <HashRouter>.
 */

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
