import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const serviceData = {
			title: form.get('title') as string,
			slug: form.get('slug') as string,
			description: form.get('description') as string || null,
			short_description: form.get('short_description') as string || null,
			icon: form.get('icon') as string || null,
			price_range: form.get('price_range') as string || null,
			whatsapp_message: form.get('whatsapp_message') as string || null,
			seo_title: form.get('seo_title') as string || null,
			seo_description: form.get('seo_description') as string || null,
			featured: form.get('featured') === 'on',
			sort_order: Number(form.get('sort_order')) || 0
		};
		const { error } = await locals.supabase.from('services').insert(serviceData);
		if (error) return fail(500, { error: error.message });
		throw redirect(303, '/admin/services');
	}
};
