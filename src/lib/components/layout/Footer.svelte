<script lang="ts">
	import { SITE_NAME, NAV_LINKS, WA_NUMBER, WA_MESSAGES } from '$lib/constants';
	import { buildWhatsAppUrl } from '$lib/whatsapp';
	import { MessageCircle } from 'lucide-svelte';
</script>

<footer class="border-t border-[var(--border)] bg-[var(--color-dark)] text-[var(--color-secondary)]">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid gap-8 md:grid-cols-3">
			<!-- Brand -->
			<div>
				<h3 class="font-serif text-xl font-bold text-white">{SITE_NAME}</h3>
				<p class="mt-2 text-sm text-gray-400">
					Jual beli dan restorasi Vespa klasik berkualitas. Klasik. Otentik. Terpercaya.
				</p>
			</div>

			<!-- Links -->
			<div>
				<h4 class="font-serif text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">Navigasi</h4>
				<ul class="mt-4 space-y-2">
					{#each NAV_LINKS as link}
						<li>
							<a href={link.href} class="text-sm text-gray-400 transition-colors hover:text-white">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact -->
			<div>
				<h4 class="font-serif text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">Hubungi Kami</h4>
				<div class="mt-4 space-y-3">
					<a
						href={buildWhatsAppUrl(WA_MESSAGES.general)}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-[var(--radius)] bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
					>
						<MessageCircle class="h-4 w-4" />
						Chat via WhatsApp
					</a>
					<p class="text-sm text-gray-400">
						Kami siap membantu Anda menemukan Vespa impian.
					</p>
				</div>
			</div>
		</div>

		<div class="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
			<p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
		</div>
	</div>
</footer>
