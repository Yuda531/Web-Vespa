<script lang="ts">
	import ProductCard from '$lib/components/shared/ProductCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight } from 'lucide-svelte';
	import type { Product } from '$lib/types';

	interface Props {
		products: Product[];
	}

	let { products }: Props = $props();
</script>

<section class="py-16 lg:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-end justify-between">
			<div>
				<p class="text-sm font-medium uppercase tracking-widest text-(--color-accent)">Koleksi Kami</p>
				<h2 class="mt-2 font-serif text-3xl font-bold text-(--foreground) sm:text-4xl">
					Vespa Pilihan
				</h2>
			</div>
			<Button href="/products" variant="ghost" class="hidden sm:inline-flex">
				{#snippet children()}
					Lihat Semua
					<ArrowRight class="h-4 w-4" />
				{/snippet}
			</Button>
		</div>

		<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each products as product}
				<ProductCard {product} />
			{/each}
		</div>

		<div class="mt-8 text-center sm:hidden">
			<Button href="/products" variant="outline">
				{#snippet children()}
					Lihat Semua Koleksi
					<ArrowRight class="h-4 w-4" />
				{/snippet}
			</Button>
		</div>
	</div>
</section>
