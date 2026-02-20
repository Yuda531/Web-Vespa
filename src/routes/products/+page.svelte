<script lang="ts">
	import SeoHead from '$lib/components/shared/SeoHead.svelte';
	import Breadcrumb from '$lib/components/shared/Breadcrumb.svelte';
	import ProductCard from '$lib/components/shared/ProductCard.svelte';
	import { Button } from '$lib/components/ui/button';

	let { data } = $props();

	const breadcrumbs = [
		{ label: 'Beranda', href: '/' },
		{ label: 'Produk', href: '/products' }
	];
</script>

<SeoHead
	title="Koleksi Vespa"
	description="Jelajahi koleksi Vespa klasik kami — Sprint, PX, Primavera, dan lainnya. Semua dalam kondisi terbaik."
/>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<Breadcrumb items={breadcrumbs} class="mb-6" />

	<div class="mb-8">
		<h1 class="font-serif text-3xl font-bold text-(--foreground) sm:text-4xl">Koleksi Vespa</h1>
		<p class="mt-2 text-(--muted-foreground)">
			Temukan Vespa klasik impian Anda dari koleksi kami yang telah direstorasi dengan penuh perhatian.
		</p>
	</div>

	<!-- Filters -->
	<div class="mb-8 flex flex-wrap gap-2">
		<Button
			href="/products"
			variant={!data.activeCategory && !data.activeStatus ? 'default' : 'outline'}
			size="sm"
		>
			{#snippet children()}Semua{/snippet}
		</Button>
		{#each data.categories as category}
			<Button
				href="/products?category={category.slug}"
				variant={data.activeCategory === category.slug ? 'default' : 'outline'}
				size="sm"
			>
				{#snippet children()}{category.name}{/snippet}
			</Button>
		{/each}
		<span class="mx-2 self-center text-[var(--border)]">|</span>
		<Button
			href="/products?status=available"
			variant={data.activeStatus === 'available' ? 'default' : 'outline'}
			size="sm"
		>
			{#snippet children()}Tersedia{/snippet}
		</Button>
		<Button
			href="/products?status=sold"
			variant={data.activeStatus === 'sold' ? 'default' : 'outline'}
			size="sm"
		>
			{#snippet children()}Terjual{/snippet}
		</Button>
	</div>

	<!-- Product Grid -->
	{#if data.products.length > 0}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.products as product}
				<ProductCard {product} />
			{/each}
		</div>
	{:else}
		<div class="py-16 text-center">
			<p class="text-lg text-(--muted-foreground)">Belum ada produk yang tersedia.</p>
		</div>
	{/if}
</div>
