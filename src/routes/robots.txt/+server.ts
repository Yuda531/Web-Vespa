import { PUBLIC_SITE_URL } from '$env/static/public';

export function GET() {
	const siteUrl = PUBLIC_SITE_URL || 'https://vespa-abas.com';
	const body = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain' }
	});
}
