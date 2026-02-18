import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: categories } = await locals.supabase.from('categories').select('*').order('name');
	return { categories: categories ?? [] };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const form = await request.formData();
		const productData = {
			title: form.get('title') as string,
			slug: form.get('slug') as string,
			description: form.get('description') as string || null,
			price: form.get('price') ? Number(form.get('price')) : null,
			year: form.get('year') ? Number(form.get('year')) : null,
			condition: form.get('condition') as string || null,
			status: (form.get('status') as string) || 'available',
			category_id: form.get('category_id') as string || null,
			whatsapp_message: form.get('whatsapp_message') as string || null,
			seo_title: form.get('seo_title') as string || null,
			seo_description: form.get('seo_description') as string || null,
			featured: form.get('featured') === 'on'
		};

		const { data: product, error } = await locals.supabase
			.from('products')
			.insert(productData)
			.select()
			.single();

		if (error) return fail(500, { error: error.message });

		// Handle images
		const imagesJson = form.get('images_json') as string;
		if (imagesJson) {
			try {
				const images = JSON.parse(imagesJson);
				if (images.length > 0) {
					const imageRecords = images.map((img: any, idx: number) => ({
						product_id: product.id,
						cloudinary_public_id: img.public_id,
						url: img.url,
						alt_text: img.alt_text || null,
						sort_order: idx,
						is_primary: img.is_primary ?? idx === 0
					}));
					await locals.supabase.from('product_images').insert(imageRecords);
				}
			} catch (e) { /* ignore parse errors */ }
		}

		throw redirect(303, '/admin/products');
	}
};
