<script lang="ts">
	import WhatsappButton from '$lib/components/shared/WhatsappButton.svelte';
	import { WA_MESSAGES } from '$lib/constants';
</script>

<section class="vintage-grain bg-(--primary) py-16 lg:py-20">
	<div class="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="font-serif text-3xl font-bold text-white sm:text-4xl">
			Siap Memiliki Vespa Impian?
		</h2>
		<p class="mt-4 text-lg text-white/80">
			Hubungi kami sekarang melalui WhatsApp untuk konsultasi gratis. Kami siap membantu Anda menemukan Vespa yang sempurna.
		</p>
		<div class="mt-8">
			<WhatsappButton message={WA_MESSAGES.general} size="lg" class="bg-white text-green-700 hover:bg-gray-100">
				{#snippet children()}
					Chat Sekarang
				{/snippet}
			</WhatsappButton>
		</div>
	</div>
</section>
