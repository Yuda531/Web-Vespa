<script lang="ts">
	import { cn } from '$lib/utils';
	import { ChevronRight } from 'lucide-svelte';
	import { breadcrumbJsonLd } from '$lib/seo';

	interface BreadcrumbItem {
		label: string;
		href: string;
	}

	interface Props {
		items: BreadcrumbItem[];
		class?: string;
	}

	let { items, class: className }: Props = $props();

	const jsonLd = $derived(
		breadcrumbJsonLd(items.map((item) => ({ name: item.label, url: item.href })))
	);
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<nav aria-label="Breadcrumb" class={cn('flex items-center gap-1 text-sm text-[var(--muted-foreground)]', className)}>
	{#each items as item, idx}
		{#if idx > 0}
			<ChevronRight class="h-3 w-3" />
		{/if}
		{#if idx === items.length - 1}
			<span class="text-[var(--foreground)]">{item.label}</span>
		{:else}
			<a href={item.href} class="transition-colors hover:text-[var(--foreground)]">{item.label}</a>
		{/if}
	{/each}
</nav>
