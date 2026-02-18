import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { supabase } = locals;

	const { data: service, error: err } = await supabase
		.from('services')
		.select('*, images:service_images(*)')
		.eq('slug', params.slug)
		.single();

	if (err || !service) {
		throw error(404, 'Layanan tidak ditemukan');
	}

	return { service };
};
