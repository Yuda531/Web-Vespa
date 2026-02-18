<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		src: string;
		alt: string;
		class?: string;
		width?: number;
		height?: number;
		loading?: 'lazy' | 'eager';
		decoding?: 'async' | 'auto' | 'sync';
		sizes?: string;
		aspectRatio?: string;
	}

	let {
		src,
		alt,
		class: className,
		width,
		height,
		loading = 'lazy',
		decoding = 'async',
		sizes,
		aspectRatio,
		...restProps
	}: Props = $props();

	let loaded = $state(false);
	let error = $state(false);
</script>

<div
	class={cn(
		'relative overflow-hidden bg-[var(--muted)]',
		className
	)}
	style={aspectRatio ? `aspect-ratio: ${aspectRatio}` : undefined}
>
	{#if !loaded && !error}
		<div class="absolute inset-0 animate-pulse bg-[var(--muted)]"></div>
	{/if}

	{#if error}
		<div class="absolute inset-0 flex items-center justify-center bg-[var(--muted)]">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-8 w-8 text-[var(--muted-foreground)]">
				<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
				<circle cx="8.5" cy="8.5" r="1.5" />
				<polyline points="21 15 16 10 5 21" />
			</svg>
		</div>
	{:else}
		<img
			{src}
			{alt}
			{width}
			{height}
			{loading}
			{decoding}
			{sizes}
			class={cn(
				'h-full w-full object-cover transition-opacity duration-300',
				loaded ? 'opacity-100' : 'opacity-0'
			)}
			onload={() => (loaded = true)}
			onerror={() => (error = true)}
			{...restProps}
		/>
	{/if}
</div>
