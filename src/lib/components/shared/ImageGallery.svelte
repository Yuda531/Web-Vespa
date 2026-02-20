<script lang="ts">
	import { cn } from '$lib/utils';
	import OptimizedImage from '$lib/components/shared/OptimizedImage.svelte';
	import type { ProductImage, ServiceImage } from '$lib/types';

	interface Props {
		images: (ProductImage | ServiceImage)[];
		class?: string;
	}

	let { images, class: className }: Props = $props();

	let selectedIndex = $state(0);

	const sorted = $derived([...images].sort((a, b) => a.sort_order - b.sort_order));
	const selectedImage = $derived(sorted[selectedIndex]);
</script>

<div class={cn('space-y-3', className)}>
	<!-- Main image -->
	{#if selectedImage}
		<div class="relative aspect-[4/3] overflow-hidden rounded-(--radius) border border-[var(--border)]">
			{#key selectedImage.url}
				<OptimizedImage
					src={selectedImage.url}
					alt={selectedImage.alt_text ?? 'Vespa image'}
					class="h-full w-full"
					loading="eager"
				/>
			{/key}
		</div>
	{/if}

	<!-- Thumbnails -->
	{#if sorted.length > 1}
		<div class="flex gap-2 overflow-x-auto pb-1">
			{#each sorted as img, idx}
				<button
					onclick={() => (selectedIndex = idx)}
					class={cn(
						'h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200 cursor-pointer',
						idx === selectedIndex
							? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/30 scale-105'
							: 'border-transparent opacity-70 hover:opacity-100'
					)}
				>
					<img
						src={img.url}
						alt={img.alt_text ?? 'Thumbnail'}
						class="h-full w-full object-cover"
						loading="lazy"
						decoding="async"
					/>
				</button>
			{/each}
		</div>
	{/if}
</div>
