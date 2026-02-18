import type { RequestHandler } from './$types';
import { PUBLIC_SITE_URL } from '$env/static/public';

export const GET: RequestHandler = async ({ locals }) => {
	const { supabase } = locals;

	const [productsRes, servicesRes] = await Promise.all([
		supabase.from('products').select('slug, updated_at').order('updated_at', { ascending: false }),
		supabase.from('services').select('slug, updated_at').order('updated_at', { ascending: false })
	]);

	const products = productsRes.data ?? [];
	const services = servicesRes.data ?? [];
	const siteUrl = PUBLIC_SITE_URL || 'https://vespa-abas.com';

	const staticPages = [
		{ url: '', priority: '1.0', changefreq: 'weekly' },
		{ url: '/products', priority: '0.9', changefreq: 'daily' },
		{ url: '/services', priority: '0.8', changefreq: 'weekly' },
		{ url: '/about', priority: '0.5', changefreq: 'monthly' },
		{ url: '/contact', priority: '0.5', changefreq: 'monthly' }
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
	.map(
		(page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
${products
	.map(
		(p) => `  <url>
    <loc>${siteUrl}/products/${p.slug}</loc>
    <lastmod>${new Date(p.updated_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
	)
	.join('\n')}
${services
	.map(
		(s) => `  <url>
    <loc>${siteUrl}/services/${s.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
