<script lang="ts">
	import { buildWhatsAppUrl } from '$lib/whatsapp';
	import { WA_MESSAGES } from '$lib/constants';
	import { MessageCircle } from 'lucide-svelte';
</script>

<a
	href={buildWhatsAppUrl(WA_MESSAGES.general)}
	target="_blank"
	rel="noopener noreferrer"
	class="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:scale-110 hover:bg-green-600 hover:shadow-xl"
	aria-label="Chat via WhatsApp"
>
	<MessageCircle class="h-6 w-6" />
</a>
