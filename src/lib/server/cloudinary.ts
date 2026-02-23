import { v2 as cloudinary } from 'cloudinary';
import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { CLOUDINARY_FOLDER } from '$lib/constants';

let configured = false;
function ensureConfig() {
	if (!configured) {
		cloudinary.config({
			cloud_name: publicEnv.PUBLIC_CLOUDINARY_CLOUD_NAME,
			api_key: privateEnv.CLOUDINARY_API_KEY,
			api_secret: privateEnv.CLOUDINARY_API_SECRET,
			secure: true
		});
		configured = true;
	}
}

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
	ensureConfig();
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
	ensureConfig();
	await cloudinary.uploader.destroy(publicId);
}

export { cloudinary };
