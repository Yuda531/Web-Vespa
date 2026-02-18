import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase } = locals;

	const [productsRes, servicesRes, testimonialsRes] = await Promise.all([
		supabase
			.from('products')
			.select('*, category:categories(*), images:product_images(*)')
			.eq('featured', true)
			.eq('status', 'available')
			.order('created_at', { ascending: false })
			.limit(6),
		supabase
			.from('services')
			.select('*, images:service_images(*)')
			.eq('featured', true)
			.order('sort_order', { ascending: true })
			.limit(3),
		supabase
			.from('testimonials')
			.select('*')
			.eq('is_visible', true)
			.order('created_at', { ascending: false })
			.limit(6)
	]);

	return {
		featuredProducts: productsRes.data ?? [],
		featuredServices: servicesRes.data ?? [],
		testimonials: testimonialsRes.data ?? []
	};
};
