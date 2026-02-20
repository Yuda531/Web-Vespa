import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
	const [productRes, categoriesRes] = await Promise.all([
		locals.supabase.from('products').select('*, images:product_images(*)').eq('id', params.id).single(),
		locals.supabase.from('categories').select('*').order('name')
	]);
	if (productRes.error || !productRes.data) throw error(404, 'Product not found');
	return { product: productRes.data, categories: categoriesRes.data ?? [] };
};

export const actions: Actions = {
	update: async ({ request, locals, params }) => {
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
			featured: form.get('featured') === 'on',
			updated_at: new Date().toISOString()
		};

		const { error: updateError } = await locals.supabase.from('products').update(productData).eq('id', params.id);
		if (updateError) return fail(500, { error: updateError.message });

		// Handle images
		const imagesJson = form.get('images_json') as string;
		if (imagesJson) {
			try {
				const images = JSON.parse(imagesJson);
				// Filter out images with missing Cloudinary data
				const validImages = images.filter((img: any) => img.public_id && img.url);
				if (validImages.length !== images.length) {
					console.warn(`[product/update] Filtered out ${images.length - validImages.length} image(s) with missing public_id or url`);
				}
				// Prepare image records before deleting old ones
				const imageRecords = validImages.map((img: any, idx: number) => ({
					product_id: params.id,
					cloudinary_public_id: img.public_id,
					url: img.url,
					alt_text: img.alt_text || null,
					sort_order: idx,
					is_primary: img.is_primary ?? idx === 0
				}));
				// Delete old images, then insert new ones
				await locals.supabase.from('product_images').delete().eq('product_id', params.id);
				if (imageRecords.length > 0) {
					const { error: imgError } = await locals.supabase.from('product_images').insert(imageRecords);
					if (imgError) {
						console.error('[product/update] Failed to insert images:', imgError);
						return fail(500, { error: 'Failed to save product images: ' + imgError.message });
					}
				}
			} catch (e) {
				console.error('[product/update] Failed to process images_json:', e);
				return fail(500, { error: 'Failed to process image data' });
			}
		}

		throw redirect(303, '/admin/products');
	}
};
