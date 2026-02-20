<script lang="ts">
	import StatsCard from '$lib/components/admin/StatsCard.svelte';
	import { Package, Wrench, MessageSquare } from 'lucide-svelte';
	import SeoHead from '$lib/components/shared/SeoHead.svelte';

	let { data } = $props();
</script>

<SeoHead title="Admin Dashboard" noindex={true} />

<div>
	<h1 class="font-serif text-2xl font-bold">Dashboard</h1>
	<p class="mt-1 text-sm text-[var(--muted-foreground)]">Overview of your website content</p>

	<div class="mt-6 grid gap-4 sm:grid-cols-3">
		<StatsCard title="Products" value={data.counts.products}>
			{#snippet icon()}<Package class="h-5 w-5" />{/snippet}
		</StatsCard>
		<StatsCard title="Services" value={data.counts.services}>
			{#snippet icon()}<Wrench class="h-5 w-5" />{/snippet}
		</StatsCard>
		<StatsCard title="Testimonials" value={data.counts.testimonials}>
			{#snippet icon()}<MessageSquare class="h-5 w-5" />{/snippet}
		</StatsCard>
	</div>

	<div class="mt-8">
		<h2 class="font-serif text-lg font-semibold">Recent Products</h2>
		<div class="mt-3 rounded-(--radius) border border-[var(--border)] bg-[var(--card)]">
			{#each data.recentProducts as product}
				<a href="/admin/products/{product.id}" class="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 last:border-0 hover:bg-[var(--secondary)]/50 transition-colors">
					<span class="text-sm font-medium">{product.title}</span>
					<span class="text-xs text-[var(--muted-foreground)]">{product.status}</span>
				</a>
			{/each}
			{#if data.recentProducts.length === 0}
				<p class="p-4 text-sm text-[var(--muted-foreground)]">No products yet</p>
			{/if}
		</div>
	</div>
</div>
