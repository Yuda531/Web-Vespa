<script lang="ts">
	import SeoHead from '$lib/components/shared/SeoHead.svelte';
	import Breadcrumb from '$lib/components/shared/Breadcrumb.svelte';
	import ImageGallery from '$lib/components/shared/ImageGallery.svelte';
	import PriceTag from '$lib/components/shared/PriceTag.svelte';
	import StatusBadge from '$lib/components/shared/StatusBadge.svelte';
	import WhatsappButton from '$lib/components/shared/WhatsappButton.svelte';
	import ProductCard from '$lib/components/shared/ProductCard.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { productJsonLd } from '$lib/seo';
	import { WA_MESSAGES } from '$lib/constants';
	import { getPrimaryImage } from '$lib/utils';
	import { Calendar, Wrench, Tag } from 'lucide-svelte';

	let { data } = $props();

	const product = $derived(data.product);
	const primaryImage = $derived(getPrimaryImage(product.images ?? []));

	const waMessage = $derived(
		product.whatsapp_message ?? WA_MESSAGES.product(product.title, product.year)
	);

	const statusMap: Record<string, 'InStock' | 'SoldOut' | 'PreOrder'> = {
		available: 'InStock',
		sold: 'SoldOut',
		reserved: 'PreOrder'
	};

	const jsonLd = $derived(
		productJsonLd({
			name: product.title,
			description: product.description,
			image: primaryImage.url,
			price: product.price,
			availability: statusMap[product.status],
			condition: product.condition,
			url: `/products/${product.slug}`
		})
	);

	const breadcrumbs = $derived([
		{ label: 'Beranda', href: '/' },
		{ label: 'Produk', href: '/products' },
		{ label: product.title, href: `/products/${product.slug}` }
	]);
</script>

<SeoHead
	title={product.seo_title ?? product.title}
	description={product.seo_description ?? product.description ?? undefined}
	ogImage={primaryImage.url}
	ogType="product"
	{jsonLd}
/>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<Breadcrumb items={breadcrumbs} class="mb-6" />

	<div class="grid gap-8 lg:grid-cols-2">
		<!-- Image Gallery -->
		<ImageGallery images={product.images ?? []} />

		<!-- Product Details -->
		<div>
			<div class="mb-2 flex items-center gap-3">
				<StatusBadge status={product.status} />
				{#if product.category}
					<span class="text-sm text-(--muted-foreground)">{product.category.name}</span>
				{/if}
			</div>

			<h1 class="font-serif text-3xl font-bold text-(--foreground) sm:text-4xl">
				{product.title}
			</h1>

			<PriceTag price={product.price} size="lg" class="mt-4 block" />

			<Separator class="my-6" />

			<!-- Specs -->
			<div class="grid grid-cols-2 gap-4">
				{#if product.year}
					<div class="flex items-center gap-2 text-sm">
						<Calendar class="h-4 w-4 text-(--muted-foreground)" />
						<span class="text-(--muted-foreground)">Tahun:</span>
						<span class="font-medium">{product.year}</span>
					</div>
				{/if}
				{#if product.condition}
					<div class="flex items-center gap-2 text-sm">
						<Wrench class="h-4 w-4 text-(--muted-foreground)" />
						<span class="text-(--muted-foreground)">Kondisi:</span>
						<span class="font-medium">{product.condition}</span>
					</div>
				{/if}
				{#if product.category}
					<div class="flex items-center gap-2 text-sm">
						<Tag class="h-4 w-4 text-(--muted-foreground)" />
						<span class="text-(--muted-foreground)">Kategori:</span>
						<span class="font-medium">{product.category.name}</span>
					</div>
				{/if}
			</div>

			<Separator class="my-6" />

			<!-- Description -->
			{#if product.description}
				<div class="prose prose-sm max-w-none text-(--muted-foreground)">
					{@html product.description}
				</div>
			{/if}

			<!-- CTA -->
			<div class="mt-8">
				<WhatsappButton message={waMessage} size="lg" class="w-full sm:w-auto">
					{#snippet children()}
						Tanya tentang Vespa ini
					{/snippet}
				</WhatsappButton>
			</div>
		</div>
	</div>

	<!-- Related Products -->
	{#if data.relatedProducts.length > 0}
		<Separator class="my-12" />
		<div>
			<h2 class="font-serif text-2xl font-bold text-(--foreground)">Produk Serupa</h2>
			<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.relatedProducts as product}
					<ProductCard {product} />
				{/each}
			</div>
		</div>
	{/if}
</div>
