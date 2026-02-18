import { WA_NUMBER } from '$lib/constants';

/**
 * Build a WhatsApp deep-link URL.
 * @param message Pre-filled message text (will be URI-encoded)
 * @param phoneNumber Override the default WA number if needed
 */
export function buildWhatsAppUrl(message: string, phoneNumber: string = WA_NUMBER): string {
	return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
