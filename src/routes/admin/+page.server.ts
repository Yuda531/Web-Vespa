import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase } = locals;
	const [products, services, testimonials] = await Promise.all([
		supabase.from('products').select('id', { count: 'exact', head: true }),
		supabase.from('services').select('id', { count: 'exact', head: true }),
		supabase.from('testimonials').select('id', { count: 'exact', head: true })
	]);
	const { data: recentProducts } = await supabase
		.from('products')
		.select('id, title, status, created_at')
		.order('created_at', { ascending: false })
		.limit(5);
	return {
		counts: {
			products: products.count ?? 0,
			services: services.count ?? 0,
			testimonials: testimonials.count ?? 0
		},
		recentProducts: recentProducts ?? []
	};
};
