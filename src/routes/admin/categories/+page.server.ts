import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const { data } = await locals.supabase.from('categories').select('*').order('name');
	return { categories: data ?? [] };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const form = await request.formData();
		const name = form.get('name') as string;
		const slug = form.get('slug') as string;
		const description = form.get('description') as string || null;
		const { error } = await locals.supabase.from('categories').insert({ name, slug, description });
		if (error) return fail(500, { error: error.message });
		return { success: true };
	},
	delete: async ({ request, locals }) => {
		const form = await request.formData();
		const id = form.get('id') as string;
		const { error } = await locals.supabase.from('categories').delete().eq('id', id);
		if (error) return fail(500, { error: error.message });
		return { success: true };
	}
};
