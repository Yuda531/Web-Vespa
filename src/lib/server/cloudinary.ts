import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '$env/static/private';
import { PUBLIC_CLOUDINARY_CLOUD_NAME } from '$env/static/public';
import { CLOUDINARY_FOLDER } from '$lib/constants';

cloudinary.config({
	cloud_name: PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
	secure: true
});

/**
 * Upload a file buffer to Cloudinary.
 * @param fileBuffer The file data as Buffer
 * @param subfolder Subfolder within vespa-abas/ (e.g. "products", "services")
 * @returns Upload result with public_id and secure_url
 */
export async function uploadToCloudinary(
	fileBuffer: Buffer,
	subfolder: string = 'general'
): Promise<{ public_id: string; secure_url: string }> {
	return new Promise((resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			{
				folder: `${CLOUDINARY_FOLDER}/${subfolder}`,
				resource_type: 'image',
				transformation: [{ quality: 'auto', fetch_format: 'auto' }]
			},
			(error, result) => {
				if (error) reject(error);
				else if (result) resolve({ public_id: result.public_id, secure_url: result.secure_url });
				else reject(new Error('Upload returned no result'));
			}
		);
		uploadStream.end(fileBuffer);
	});
}

/**
 * Delete an image from Cloudinary by public ID.
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
	await cloudinary.uploader.destroy(publicId);
}

export { cloudinary };
