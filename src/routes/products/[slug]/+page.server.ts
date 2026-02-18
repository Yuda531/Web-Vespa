import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { supabase } = locals;

	const { data: product, error: err } = await supabase
		.from('products')
		.select('*, category:categories(*), images:product_images(*)')
		.eq('slug', params.slug)
		.single();

	if (err || !product) {
		throw error(404, 'Produk tidak ditemukan');
	}

	// Related products from same category
	const { data: related } = await supabase
		.from('products')
		.select('*, images:product_images(*)')
		.eq('category_id', product.category_id)
		.neq('id', product.id)
		.eq('status', 'available')
		.limit(3);

	return {
		product,
		relatedProducts: related ?? []
	};
};
