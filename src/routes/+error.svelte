<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import SeoHead from '$lib/components/shared/SeoHead.svelte';
	import { SITE_NAME } from '$lib/constants';
	import { Home, ArrowLeft, RefreshCw } from 'lucide-svelte';

	const statusCode = $derived(page.status);
	const errorMessage = $derived(page.error?.message ?? 'Terjadi kesalahan');

	const is404 = $derived(statusCode === 404);

	const title = $derived(
		is404 ? 'Halaman Tidak Ditemukan' : 'Terjadi Kesalahan'
	);
	const description = $derived(
		is404
			? 'Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.'
			: 'Maaf, terjadi kesalahan pada server. Silakan coba lagi nanti.'
	);
</script>

<SeoHead title="{statusCode} — {title}" noindex={true} />

<div class="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
	<!-- Decorative vintage element -->
	<div class="relative mb-8">
		<div class="font-serif text-[8rem] font-bold leading-none text-[var(--primary)]/10 sm:text-[12rem]">
			{statusCode}
		</div>
		<div class="absolute inset-0 flex items-center justify-center">
			<div class="rounded-full border-2 border-[var(--color-accent)] p-6">
				{#if is404}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-12 w-12 text-[var(--color-accent)]">
						<circle cx="11" cy="11" r="8" />
						<line x1="21" y1="21" x2="16.65" y2="16.65" />
						<line x1="8" y1="11" x2="14" y2="11" />
					</svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-12 w-12 text-[var(--color-accent)]">
						<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
						<line x1="12" y1="9" x2="12" y2="13" />
						<line x1="12" y1="17" x2="12.01" y2="17" />
					</svg>
				{/if}
			</div>
		</div>
	</div>

	<h1 class="font-serif text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
		{title}
	</h1>

	<p class="mx-auto mt-4 max-w-md text-lg text-[var(--muted-foreground)]">
		{description}
	</p>

	{#if !is404 && errorMessage}
		<p class="mx-auto mt-2 max-w-md text-sm text-[var(--muted-foreground)]/70">
			Detail: {errorMessage}
		</p>
	{/if}

	<!-- Actions -->
	<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
		<Button href="/" variant="default" size="lg">
			{#snippet children()}
				<Home class="mr-2 h-4 w-4" />
				Kembali ke Beranda
			{/snippet}
		</Button>

		{#if !is404}
			<Button variant="outline" size="lg" onclick={() => location.reload()}>
				{#snippet children()}
					<RefreshCw class="mr-2 h-4 w-4" />
					Coba Lagi
				{/snippet}
			</Button>
		{:else}
			<Button variant="outline" size="lg" onclick={() => history.back()}>
				{#snippet children()}
					<ArrowLeft class="mr-2 h-4 w-4" />
					Halaman Sebelumnya
				{/snippet}
			</Button>
		{/if}
	</div>

	<!-- Vintage decorative line -->
	<div class="mt-12 flex items-center gap-4">
		<div class="h-px w-16 bg-[var(--border)]"></div>
		<span class="font-serif text-sm italic text-[var(--muted-foreground)]">{SITE_NAME}</span>
		<div class="h-px w-16 bg-[var(--border)]"></div>
	</div>
</div>
