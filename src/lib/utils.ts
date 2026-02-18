import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes with clsx */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/** Format number as Indonesian Rupiah */
export function formatPrice(price: number | null | undefined): string {
	if (price == null) return 'Hubungi kami';
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(price);
}

/** Generate URL-safe slug from text */
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/** Get primary image from an array of images */
export function getPrimaryImage(images: { url: string; is_primary: boolean; alt_text?: string | null }[]): { url: string; alt_text: string } {
	const primary = images.find((img) => img.is_primary) ?? images[0];
	return {
		url: primary?.url ?? '/og-image.jpg',
		alt_text: primary?.alt_text ?? 'Vespa'
	};
}

/** Truncate text to a given length */
export function truncate(text: string, length: number = 150): string {
	if (text.length <= length) return text;
	return text.slice(0, length).trimEnd() + '...';
}
