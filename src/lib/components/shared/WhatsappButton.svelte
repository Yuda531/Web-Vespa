<script lang="ts">
	import { cn } from '$lib/utils';
	import { buildWhatsAppUrl } from '$lib/whatsapp';
	import { MessageCircle } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		message: string;
		class?: string;
		variant?: 'default' | 'outline';
		size?: 'default' | 'lg';
		children?: Snippet;
	}

	let { message, class: className, variant = 'default', size = 'default', children }: Props = $props();

	const href = $derived(buildWhatsAppUrl(message));

	const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-medium transition-colors cursor-pointer';
	const variantClasses = {
		default: 'bg-green-600 text-white hover:bg-green-700',
		outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50'
	};
	const sizeClasses = {
		default: 'px-4 py-2 text-sm',
		lg: 'px-6 py-3 text-base'
	};
</script>

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
>
	<MessageCircle class={size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
	{#if children}
		{@render children()}
	{:else}
		Chat via WhatsApp
	{/if}
</a>
