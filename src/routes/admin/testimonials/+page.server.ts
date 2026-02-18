import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const { data } = await locals.supabase.from('testimonials').select('*').order('created_at', { ascending: false });
	return { testimonials: data ?? [] };
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const { error } = await locals.supabase.from('testimonials').delete().eq('id', id);
		if (error) return fail(500, { error: error.message });
		return { success: true };
	},
	toggleVisibility: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const is_visible = formData.get('is_visible') === 'true';
		const { error } = await locals.supabase.from('testimonials').update({ is_visible: !is_visible }).eq('id', id);
		if (error) return fail(500, { error: error.message });
		return { success: true };
	}
};
