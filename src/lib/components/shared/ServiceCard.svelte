<script lang="ts">
	import { cn, getPrimaryImage } from '$lib/utils';
	import OptimizedImage from '$lib/components/shared/OptimizedImage.svelte';
	import type { Service } from '$lib/types';
	import { Wrench } from 'lucide-svelte';

	interface Props {
		service: Service;
		class?: string;
	}

	let { service, class: className }: Props = $props();
	const image = $derived(getPrimaryImage(service.images ?? []));
</script>

<a
	href="/services/{service.slug}"
	class={cn(
		'group block overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1',
		className
	)}
>
	<!-- Image or icon fallback -->
	{#if service.images && service.images.length > 0}
		<div class="sepia-overlay relative aspect-[16/10] overflow-hidden">
			<OptimizedImage
				src={image.url}
				alt={image.alt_text ?? service.title}
				class="h-full w-full transition-transform duration-300 group-hover:scale-105"
				loading="lazy"
			/>
		</div>
	{:else}
		<div class="flex aspect-[16/10] items-center justify-center bg-[var(--secondary)]">
			<Wrench class="h-12 w-12 text-[var(--muted-foreground)] transition-transform duration-300 group-hover:scale-110" />
		</div>
	{/if}

	<!-- Content -->
	<div class="p-4">
		<h3 class="font-serif text-lg font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)]">
			{service.title}
		</h3>
		{#if service.short_description}
			<p class="mt-1 text-sm text-[var(--muted-foreground)] line-clamp-2">
				{service.short_description}
			</p>
		{/if}
		{#if service.price_range}
			<p class="mt-2 text-sm font-medium text-[var(--color-accent)]">
				{service.price_range}
			</p>
		{/if}
	</div>
</a>
