import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data: testimonial, error: err } = await locals.supabase.from('testimonials').select('*').eq('id', params.id).single();
	if (err || !testimonial) throw error(404, 'Testimonial not found');
	return { testimonial };
};

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const form = await request.formData();
		const { error: updateError } = await locals.supabase.from('testimonials').update({
			customer_name: form.get('customer_name') as string,
			content: form.get('content') as string,
			rating: Number(form.get('rating')) || 5,
			avatar_url: form.get('avatar_url') as string || null,
			is_visible: form.get('is_visible') === 'on'
		}).eq('id', params.id);
		if (updateError) return fail(500, { error: updateError.message });
		throw redirect(303, '/admin/testimonials');
	}
};
