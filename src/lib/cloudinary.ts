import { CLOUDINARY_FOLDER } from '$lib/constants';

/**
 * Build an optimized Cloudinary delivery URL.
 * @param publicId Cloudinary public ID (can include folder prefix)
 * @param options Transformation options
 */
export function cloudinaryUrl(
	publicId: string,
	options: {
		width?: number;
		height?: number;
		crop?: string;
		quality?: string;
		format?: string;
		gravity?: string;
	} = {}
): string {
	const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME ?? 'demo';
	const transforms: string[] = [];

	if (options.width) transforms.push(`w_${options.width}`);
	if (options.height) transforms.push(`h_${options.height}`);
	transforms.push(`c_${options.crop ?? 'fill'}`);
	transforms.push(`q_${options.quality ?? 'auto'}`);
	transforms.push(`f_${options.format ?? 'auto'}`);
	if (options.gravity) transforms.push(`g_${options.gravity}`);

	const transformString = transforms.join(',');
	return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${publicId}`;
}

/**
 * Generate a responsive srcset string for Cloudinary images.
 */
export function cloudinarySrcSet(
	publicId: string,
	widths: number[] = [320, 640, 768, 1024, 1280]
): string {
	return widths
		.map((w) => `${cloudinaryUrl(publicId, { width: w })} ${w}w`)
		.join(', ');
}
