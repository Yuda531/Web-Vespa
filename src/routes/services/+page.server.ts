import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase } = locals;

	const { data: services } = await supabase
		.from('services')
		.select('*, images:service_images(*)')
		.order('sort_order', { ascending: true });

	return {
		services: services ?? []
	};
};
