import { SITE_NAME } from '$lib/constants';

interface LocalBusinessProps {
	name?: string;
	description?: string;
	url?: string;
	phone?: string;
	address?: {
		street?: string;
		city?: string;
		region?: string;
		postalCode?: string;
		country?: string;
	};
	image?: string;
}

/** Generate JSON-LD for LocalBusiness schema */
export function localBusinessJsonLd(props: LocalBusinessProps): string {
	const data = {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: props.name ?? SITE_NAME,
		description: props.description,
		url: props.url,
		telephone: props.phone,
		image: props.image,
		address: props.address
			? {
					'@type': 'PostalAddress',
					streetAddress: props.address.street,
					addressLocality: props.address.city,
					addressRegion: props.address.region,
					postalCode: props.address.postalCode,
					addressCountry: props.address.country ?? 'ID'
				}
			: undefined
	};
	return JSON.stringify(data);
}

interface ProductJsonLdProps {
	name: string;
	description?: string | null;
	image?: string;
	price?: number | null;
	currency?: string;
	availability?: 'InStock' | 'SoldOut' | 'PreOrder';
	url?: string;
	brand?: string;
	condition?: string;
}

/** Generate JSON-LD for Product schema */
export function productJsonLd(props: ProductJsonLdProps): string {
	const data = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: props.name,
		description: props.description ?? undefined,
		image: props.image,
		url: props.url,
		brand: props.brand ? { '@type': 'Brand', name: props.brand } : { '@type': 'Brand', name: 'Vespa' },
		itemCondition:
			props.condition === 'Original'
				? 'https://schema.org/UsedCondition'
				: props.condition === 'Restored'
					? 'https://schema.org/RefurbishedCondition'
					: 'https://schema.org/UsedCondition',
		offers: props.price
			? {
					'@type': 'Offer',
					price: props.price,
					priceCurrency: props.currency ?? 'IDR',
					availability: `https://schema.org/${props.availability ?? 'InStock'}`,
					seller: { '@type': 'Organization', name: SITE_NAME }
				}
			: undefined
	};
	return JSON.stringify(data);
}

interface ServiceJsonLdProps {
	name: string;
	description?: string | null;
	image?: string;
	url?: string;
	provider?: string;
}

/** Generate JSON-LD for Service schema */
export function serviceJsonLd(props: ServiceJsonLdProps): string {
	const data = {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: props.name,
		description: props.description ?? undefined,
		image: props.image,
		url: props.url,
		provider: {
			'@type': 'LocalBusiness',
			name: props.provider ?? SITE_NAME
		}
	};
	return JSON.stringify(data);
}

interface BreadcrumbItem {
	name: string;
	url: string;
}

/** Generate JSON-LD for BreadcrumbList schema */
export function breadcrumbJsonLd(items: BreadcrumbItem[]): string {
	const data = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url
		}))
	};
	return JSON.stringify(data);
}
