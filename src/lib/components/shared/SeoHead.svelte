<script lang="ts">
	import { SITE_NAME, SITE_DESCRIPTION } from '$lib/constants';

	interface Props {
		title?: string;
		description?: string;
		ogImage?: string;
		ogType?: string;
		canonicalUrl?: string;
		jsonLd?: string;
		noindex?: boolean;
	}

	let {
		title,
		description = SITE_DESCRIPTION,
		ogImage = '/og-image.jpg',
		ogType = 'website',
		canonicalUrl,
		jsonLd,
		noindex = false
	}: Props = $props();

	const pageTitle = $derived(title ? `${title} | ${SITE_NAME}` : SITE_NAME);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={description} />

	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}

	{#if canonicalUrl}
		<link rel="canonical" href={canonicalUrl} />
	{/if}

	<!-- Open Graph -->
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={ogType} />
	<meta property="og:image" content={ogImage} />
	{#if canonicalUrl}
		<meta property="og:url" content={canonicalUrl} />
	{/if}

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />

	<!-- JSON-LD -->
	{#if jsonLd}
		{@html `<script type="application/ld+json">${jsonLd}</script>`}
	{/if}
</svelte:head>
