<script lang="ts">
	import SeoHead from '$lib/components/shared/SeoHead.svelte';
	import Breadcrumb from '$lib/components/shared/Breadcrumb.svelte';
	import { SITE_NAME } from '$lib/constants';
	import CtaSection from '$lib/components/sections/CtaSection.svelte';

	const breadcrumbs = [
		{ label: 'Beranda', href: '/' },
		{ label: 'Tentang', href: '/about' }
	];
</script>

<SeoHead
	title="Tentang Kami"
	description="Kisah di balik {SITE_NAME} — passion kami terhadap Vespa klasik dan komitmen kami untuk kualitas terbaik."
/>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<Breadcrumb items={breadcrumbs} class="mb-6" />

	<div class="mx-auto max-w-3xl">
		<h1 class="font-serif text-3xl font-bold text-(--foreground) sm:text-4xl">Tentang {SITE_NAME}</h1>

		<div class="mt-8 space-y-6 text-(--muted-foreground) leading-relaxed">
			<p>
				{SITE_NAME} lahir dari kecintaan mendalam terhadap Vespa klasik — ikon kendaraan roda dua
				yang telah menjadi bagian dari budaya dan gaya hidup sejak puluhan tahun lalu.
			</p>

			<p>
				Kami percaya bahwa setiap Vespa memiliki cerita. Dan kami berdedikasi untuk menjaga cerita
				itu tetap hidup melalui proses restorasi yang teliti, menggunakan suku cadang berkualitas,
				dan sentuhan tangan terampil dari para mekanik berpengalaman kami.
			</p>

			<div class="rounded-(--radius) bg-(--secondary) p-6">
				<h2 class="font-serif text-xl font-bold text-(--foreground)">Mengapa Memilih Kami?</h2>
				<ul class="mt-4 space-y-3">
					<li class="flex gap-3">
						<span class="text-(--color-accent)">&#10003;</span>
						<span>Pengalaman bertahun-tahun dalam restorasi Vespa klasik</span>
					</li>
					<li class="flex gap-3">
						<span class="text-(--color-accent)">&#10003;</span>
						<span>Suku cadang original dan berkualitas tinggi</span>
					</li>
					<li class="flex gap-3">
						<span class="text-(--color-accent)">&#10003;</span>
						<span>Garansi pada setiap unit yang kami jual</span>
					</li>
					<li class="flex gap-3">
						<span class="text-(--color-accent)">&#10003;</span>
						<span>Konsultasi gratis sebelum pembelian</span>
					</li>
					<li class="flex gap-3">
						<span class="text-(--color-accent)">&#10003;</span>
						<span>Layanan purna jual yang terpercaya</span>
					</li>
				</ul>
			</div>

			<p>
				Apakah Anda sedang mencari Vespa pertama Anda, atau menambah koleksi, kami siap membantu
				Anda menemukan unit yang sempurna. Jangan ragu untuk menghubungi kami — kami senang
				berbicara tentang Vespa!
			</p>
		</div>
	</div>
</div>

<CtaSection />
