import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const { error } = await locals.supabase.from('testimonials').insert({
			customer_name: form.get('customer_name') as string,
			content: form.get('content') as string,
			rating: Number(form.get('rating')) || 5,
			avatar_url: form.get('avatar_url') as string || null,
			is_visible: form.get('is_visible') === 'on'
		});
		if (error) return fail(500, { error: error.message });
		throw redirect(303, '/admin/testimonials');
	}
};
