import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const { data } = await locals.supabase.from('site_settings').select('*');
	const settings: Record<string, string> = {};
	(data ?? []).forEach((s) => { settings[s.key] = s.value; });
	return { settings };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const entries = [
			{ key: 'site_title', value: form.get('site_title') as string },
			{ key: 'site_description', value: form.get('site_description') as string },
			{ key: 'whatsapp_number', value: form.get('whatsapp_number') as string },
			{ key: 'address', value: form.get('address') as string }
		].filter(e => e.value);

		for (const entry of entries) {
			await locals.supabase.from('site_settings').upsert(
				{ key: entry.key, value: entry.value, updated_at: new Date().toISOString() },
				{ onConflict: 'key' }
			);
		}

		return { success: true };
	}
};
