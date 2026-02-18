import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const { data } = await locals.supabase.from('services').select('*').order('sort_order');
	return { services: data ?? [] };
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const { error } = await locals.supabase.from('services').delete().eq('id', id);
		if (error) return fail(500, { error: error.message });
		return { success: true };
	}
};
