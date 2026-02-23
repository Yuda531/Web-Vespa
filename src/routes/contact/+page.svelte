<script lang="ts">
	import SeoHead from '$lib/components/shared/SeoHead.svelte';
	import Breadcrumb from '$lib/components/shared/Breadcrumb.svelte';
	import WhatsappButton from '$lib/components/shared/WhatsappButton.svelte';
	import { WA_MESSAGES, SITE_NAME } from '$lib/constants';
	import { MapPin, Phone, Clock } from 'lucide-svelte';

	const breadcrumbs = [
		{ label: 'Beranda', href: '/' },
		{ label: 'Kontak', href: '/contact' }
	];
</script>

<SeoHead
	title="Kontak"
	description="Hubungi {SITE_NAME} untuk konsultasi, pembelian Vespa, atau layanan restorasi. Kami siap membantu!"
/>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<Breadcrumb items={breadcrumbs} class="mb-6" />

	<div class="mx-auto max-w-3xl">
		<h1 class="font-serif text-3xl font-bold text-(--foreground) sm:text-4xl">Hubungi Kami</h1>
		<p class="mt-2 text-(--muted-foreground)">
			Kami senang mendengar dari Anda. Hubungi kami melalui WhatsApp untuk respons tercepat.
		</p>

		<div class="mt-8 grid gap-6 sm:grid-cols-2">
			<!-- WhatsApp CTA -->
			<div class="rounded-(--radius) border border-(--border) bg-(--card) p-6">
				<h2 class="font-serif text-lg font-semibold text-(--foreground)">WhatsApp</h2>
				<p class="mt-2 text-sm text-(--muted-foreground)">
					Cara tercepat untuk menghubungi kami. Klik tombol di bawah untuk langsung chat.
				</p>
				<div class="mt-4">
					<WhatsappButton message={WA_MESSAGES.general} />
				</div>
			</div>

			<!-- Address -->
			<div class="rounded-(--radius) border border-(--border) bg-(--card) p-6">
				<h2 class="font-serif text-lg font-semibold text-(--foreground)">Lokasi</h2>
				<div class="mt-4 space-y-3 text-sm text-(--muted-foreground)">
					<div class="flex items-start gap-2">
						<MapPin class="mt-0.5 h-4 w-4 flex-shrink-0" />
						<span>Cipedes, Kec. Paseh, Kabupaten Bandung, Jawa Barat 40383</span>
					</div>
					<div class="flex items-start gap-2">
						<Phone class="mt-0.5 h-4 w-4 flex-shrink-0" />
						<span>+62 813-8062-5291</span>
					</div>
					<div class="flex items-start gap-2">
						<Clock class="mt-0.5 h-4 w-4 flex-shrink-0" />
						<span>Senin - Sabtu, 09:00 - 17:00 WIB</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
