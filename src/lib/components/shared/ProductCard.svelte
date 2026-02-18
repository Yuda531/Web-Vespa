<script lang="ts">
	import { cn, formatPrice, getPrimaryImage } from '$lib/utils';
	import { Badge } from '$lib/components/ui/badge';
	import OptimizedImage from '$lib/components/shared/OptimizedImage.svelte';
	import type { Product } from '$lib/types';

	interface Props {
		product: Product;
		class?: string;
	}

	let { product, class: className }: Props = $props();

	const image = $derived(getPrimaryImage(product.images ?? []));

	const statusLabel: Record<string, string> = {
		available: 'Tersedia',
		sold: 'Terjual',
		reserved: 'Dipesan'
	};

	const statusVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
		available: 'default',
		sold: 'destructive',
		reserved: 'secondary'
	};
</script>

<a
	href="/products/{product.slug}"
	class={cn(
		'group block overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1',
		className
	)}
>
	<!-- Image -->
	<div class="sepia-overlay relative aspect-[4/3] overflow-hidden">
		<OptimizedImage
			src={image.url}
			alt={image.alt_text ?? product.title}
			class="h-full w-full transition-transform duration-300 group-hover:scale-105"
			loading="lazy"
		/>
		<div class="absolute top-3 right-3 z-10">
			<Badge variant={statusVariant[product.status]}>{statusLabel[product.status]}</Badge>
		</div>
	</div>

	<!-- Content -->
	<div class="p-4">
		<div class="mb-1 flex items-center gap-2">
			{#if product.year}
				<span class="text-xs text-[var(--muted-foreground)]">{product.year}</span>
			{/if}
			{#if product.condition}
				<span class="text-xs text-[var(--color-accent)]">{product.condition}</span>
			{/if}
		</div>
		<h3 class="font-serif text-lg font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)]">
			{product.title}
		</h3>
		<p class="mt-2 font-semibold text-[var(--primary)]">
			{formatPrice(product.price)}
		</p>
	</div>
</a>
