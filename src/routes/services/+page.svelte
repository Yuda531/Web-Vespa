<script lang="ts">
	import SeoHead from '$lib/components/shared/SeoHead.svelte';
	import Breadcrumb from '$lib/components/shared/Breadcrumb.svelte';
	import ServiceCard from '$lib/components/shared/ServiceCard.svelte';

	let { data } = $props();

	const breadcrumbs = [
		{ label: 'Beranda', href: '/' },
		{ label: 'Layanan', href: '/services' }
	];
</script>

<SeoHead
	title="Layanan Restorasi & Perawatan"
	description="Layanan restorasi dan perawatan Vespa klasik profesional. Dari restorasi penuh hingga servis berkala."
/>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<Breadcrumb items={breadcrumbs} class="mb-6" />

	<div class="mb-8">
		<h1 class="font-serif text-3xl font-bold text-[var(--foreground)] sm:text-4xl">Layanan Kami</h1>
		<p class="mt-2 text-[var(--muted-foreground)]">
			Layanan restorasi dan perawatan Vespa klasik oleh tenaga ahli berpengalaman.
		</p>
	</div>

	{#if data.services.length > 0}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.services as service}
				<ServiceCard {service} />
			{/each}
		</div>
	{:else}
		<div class="py-16 text-center">
			<p class="text-lg text-[var(--muted-foreground)]">Belum ada layanan yang tersedia.</p>
		</div>
	{/if}
</div>
