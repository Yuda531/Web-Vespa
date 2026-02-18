<script lang="ts">
	import SeoHead from '$lib/components/shared/SeoHead.svelte';
	import Breadcrumb from '$lib/components/shared/Breadcrumb.svelte';
	import ImageGallery from '$lib/components/shared/ImageGallery.svelte';
	import WhatsappButton from '$lib/components/shared/WhatsappButton.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { serviceJsonLd } from '$lib/seo';
	import { WA_MESSAGES } from '$lib/constants';
	import { getPrimaryImage } from '$lib/utils';

	let { data } = $props();

	const service = $derived(data.service);
	const primaryImage = $derived(getPrimaryImage(service.images ?? []));

	const waMessage = $derived(
		service.whatsapp_message ?? WA_MESSAGES.service(service.title)
	);

	const jsonLd = $derived(
		serviceJsonLd({
			name: service.title,
			description: service.description,
			image: primaryImage.url,
			url: `/services/${service.slug}`
		})
	);

	const breadcrumbs = $derived([
		{ label: 'Beranda', href: '/' },
		{ label: 'Layanan', href: '/services' },
		{ label: service.title, href: `/services/${service.slug}` }
	]);
</script>

<SeoHead
	title={service.seo_title ?? service.title}
	description={service.seo_description ?? service.short_description ?? undefined}
	ogImage={primaryImage.url}
	{jsonLd}
/>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<Breadcrumb items={breadcrumbs} class="mb-6" />

	<div class="grid gap-8 lg:grid-cols-2">
		<!-- Images -->
		{#if service.images && service.images.length > 0}
			<ImageGallery images={service.images} />
		{/if}

		<!-- Details -->
		<div class={service.images && service.images.length > 0 ? '' : 'lg:col-span-2 max-w-3xl'}>
			<h1 class="font-serif text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
				{service.title}
			</h1>

			{#if service.price_range}
				<p class="mt-2 text-lg font-medium text-[var(--color-accent)]">
					{service.price_range}
				</p>
			{/if}

			<Separator class="my-6" />

			{#if service.description}
				<div class="prose prose-sm max-w-none text-[var(--muted-foreground)]">
					{@html service.description}
				</div>
			{/if}

			<div class="mt-8">
				<WhatsappButton message={waMessage} size="lg">
					{#snippet children()}
						Konsultasi Layanan Ini
					{/snippet}
				</WhatsappButton>
			</div>
		</div>
	</div>
</div>
