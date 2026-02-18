import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data: service, error: err } = await locals.supabase.from('services').select('*').eq('id', params.id).single();
	if (err || !service) throw error(404, 'Service not found');
	return { service };
};

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
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
		const { error: updateError } = await locals.supabase.from('services').update(serviceData).eq('id', params.id);
		if (updateError) return fail(500, { error: updateError.message });
		throw redirect(303, '/admin/services');
	}
};
