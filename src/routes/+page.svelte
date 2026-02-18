<script lang="ts">
	import SeoHead from '$lib/components/shared/SeoHead.svelte';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import FeaturedProducts from '$lib/components/sections/FeaturedProducts.svelte';
	import ServicesOverview from '$lib/components/sections/ServicesOverview.svelte';
	import Testimonials from '$lib/components/sections/Testimonials.svelte';
	import CtaSection from '$lib/components/sections/CtaSection.svelte';
	import { localBusinessJsonLd } from '$lib/seo';
	import { SITE_NAME, SITE_DESCRIPTION } from '$lib/constants';

	let { data } = $props();

	const jsonLd = localBusinessJsonLd({
		name: SITE_NAME,
		description: SITE_DESCRIPTION
	});
</script>

<SeoHead
	description={SITE_DESCRIPTION}
	{jsonLd}
/>

<HeroSection />

{#if data.featuredProducts.length > 0}
	<FeaturedProducts products={data.featuredProducts} />
{/if}

{#if data.featuredServices.length > 0}
	<ServicesOverview services={data.featuredServices} />
{/if}

{#if data.testimonials.length > 0}
	<Testimonials testimonials={data.testimonials} />
{/if}

<CtaSection />
