<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { buildWhatsAppUrl } from '$lib/whatsapp';
	import { WA_MESSAGES } from '$lib/constants';
	import { MessageCircle, ArrowRight } from 'lucide-svelte';
	import OptimizedImage from '$lib/components/shared/OptimizedImage.svelte';
</script>

<section class="vintage-grain relative overflow-hidden bg-[var(--color-dark)]">
	<!-- Background with sepia overlay -->
	<div class="sepia-overlay absolute inset-0">
		<div class="absolute inset-0 bg-gradient-to-r from-[var(--color-dark)] via-[var(--color-dark)]/80 to-transparent"></div>
	</div>

	<div class="relative mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-12">
		<div class="max-w-2xl">
			<p class="text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
				Klasik. Otentik. Terpercaya.
			</p>
			<h1 class="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
				Temukan Vespa <br />
				<span class="text-[var(--color-accent)]">Impian Anda</span>
			</h1>
			<p class="mt-6 max-w-lg text-lg text-gray-300">
				Koleksi Vespa klasik pilihan — direstorasi dengan penuh perhatian, siap menemani perjalanan Anda.
			</p>
			<div class="mt-8 flex flex-wrap gap-4">
				<Button href="/products" size="lg">
					{#snippet children()}
						Lihat Koleksi
						<ArrowRight class="h-4 w-4" />
					{/snippet}
				</Button>
				<a
					href={buildWhatsAppUrl(WA_MESSAGES.general)}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex h-11 items-center gap-2 rounded-[var(--radius)] border-2 border-green-500 px-8 text-sm font-medium text-green-400 transition-colors hover:bg-green-500/10"
				>
					<MessageCircle class="h-4 w-4" />
					Hubungi Kami
				</a>
			</div>
		</div>
		<div class="hidden lg:block">
			<div class="relative">
				<OptimizedImage
					src="https://res.cloudinary.com/dmzmtojd8/image/upload/v1771218811/vespa-abas/products/qbpvuxbjkfop6aujhdqf.jpg"
					alt="Vespa Klasik"
					class="rounded-[var(--radius)] shadow-2xl"
				/>
			</div>
		</div>
	</div>
</section>
