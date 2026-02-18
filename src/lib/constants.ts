export const WA_NUMBER = '6281380625291';

export const SITE_NAME = 'Vespa Abas';
export const SITE_DESCRIPTION =
	'Jual beli dan restorasi Vespa klasik berkualitas. Temukan Vespa impian Anda — Sprint, PX, Primavera, dan lainnya.';
export const SITE_TAGLINE = 'Klasik. Otentik. Terpercaya.';

export const WA_MESSAGES = {
	product: (title: string, year?: number | null) =>
		`Halo, saya tertarik dengan ${title}${year ? ` (${year})` : ''}. Apakah masih tersedia?`,
	service: (title: string) => `Halo, saya ingin konsultasi tentang layanan ${title}.`,
	general: 'Halo, saya ingin bertanya tentang Vespa. Bisa dibantu?'
} as const;

export const CLOUDINARY_FOLDER = 'vespa-abas';

export const NAV_LINKS = [
	{ href: '/', label: 'Beranda' },
	{ href: '/products', label: 'Produk' },
	{ href: '/services', label: 'Layanan' },
	{ href: '/about', label: 'Tentang' },
	{ href: '/contact', label: 'Kontak' }
] as const;

export const PRODUCT_CONDITIONS = ['Restored', 'Original', 'Project'] as const;
export const PRODUCT_STATUSES = ['available', 'sold', 'reserved'] as const;
