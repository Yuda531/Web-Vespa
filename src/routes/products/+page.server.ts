import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const { supabase } = locals;

	const category = url.searchParams.get('category');
	const status = url.searchParams.get('status');

	let query = supabase
		.from('products')
		.select('*, category:categories(*), images:product_images(*)')
		.order('created_at', { ascending: false });

	if (category) {
		// Filter by category slug
		const { data: cat } = await supabase
			.from('categories')
			.select('id')
			.eq('slug', category)
			.single();
		if (cat) {
			query = query.eq('category_id', cat.id);
		}
	}

	if (status) {
		query = query.eq('status', status);
	}

	const [productsRes, categoriesRes] = await Promise.all([
		query,
		supabase.from('categories').select('*').order('name')
	]);

	return {
		products: productsRes.data ?? [],
		categories: categoriesRes.data ?? [],
		activeCategory: category,
		activeStatus: status
	};
};
