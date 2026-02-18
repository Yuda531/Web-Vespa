import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: products } = await locals.supabase
		.from('products')
		.select('*, category:categories(name), images:product_images(url, is_primary)')
		.order('created_at', { ascending: false });
	return { products: products ?? [] };
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const { error } = await locals.supabase.from('products').delete().eq('id', id);
		if (error) return fail(500, { error: error.message });
		return { success: true };
	}
};
