import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { env as publicEnv } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';
import type { Database } from '$lib/types';
import type { Cookies } from '@sveltejs/kit';

/** Creates a Supabase server client with cookie-based session handling */
export function createSupabaseServerClient(cookies: Cookies, fetch: typeof globalThis.fetch) {
	return createServerClient<Database>(publicEnv.PUBLIC_SUPABASE_URL!, publicEnv.PUBLIC_SUPABASE_ANON_KEY!, {
		global: { fetch },
		cookies: {
			getAll() {
				return cookies.getAll();
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value, options }) =>
					cookies.set(name, value, { ...options, path: '/' })
				);
			}
		}
	});
}

/** Admin client with service role key — use only on the server */
export function createSupabaseAdminClient() {
	return createClient<Database>(publicEnv.PUBLIC_SUPABASE_URL!, privateEnv.SUPABASE_SERVICE_ROLE_KEY!, {
		auth: { autoRefreshToken: false, persistSession: false }
	});
}
