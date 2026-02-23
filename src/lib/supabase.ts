import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import { env } from '$env/dynamic/public';
import type { Database } from '$lib/types';

export function createSupabaseBrowserClient(
	fetch: typeof globalThis.fetch
) {
	return createBrowserClient<Database>(env.PUBLIC_SUPABASE_URL!, env.PUBLIC_SUPABASE_ANON_KEY!, {
		global: { fetch },
		isSingleton: true
	});
}
