<script lang="ts">
	import ServiceCard from '$lib/components/shared/ServiceCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight } from 'lucide-svelte';
	import type { Service } from '$lib/types';

	interface Props {
		services: Service[];
	}

	let { services }: Props = $props();
</script>

<section class="bg-[var(--secondary)]/50 py-16 lg:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<p class="text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">Layanan Kami</p>
			<h2 class="mt-2 font-serif text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
				Restorasi & Perawatan
			</h2>
			<p class="mt-3 text-[var(--muted-foreground)]">
				Percayakan Vespa Anda pada tangan ahli. Dari restorasi penuh hingga perawatan berkala.
			</p>
		</div>

		<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each services as service}
				<ServiceCard {service} />
			{/each}
		</div>

		<div class="mt-8 text-center">
			<Button href="/services" variant="outline">
				{#snippet children()}
					Semua Layanan
					<ArrowRight class="h-4 w-4" />
				{/snippet}
			</Button>
		</div>
	</div>
</section>
