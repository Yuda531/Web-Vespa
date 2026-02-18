import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import { uploadToCloudinary } from '$lib/server/cloudinary';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { session } = await locals.safeGetSession();
	if (!session) throw error(401, 'Unauthorized');

	const formData = await request.formData();
	const file = formData.get('file') as File;
	const subfolder = (formData.get('subfolder') as string) || 'general';

	if (!file) throw error(400, 'No file provided');

	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	try {
		const result = await uploadToCloudinary(buffer, subfolder);
		return json(result);
	} catch (err) {
		console.error('Upload error:', err);
		throw error(500, 'Upload failed');
	}
};
