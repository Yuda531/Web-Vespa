<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Variant = 'default' | 'secondary' | 'destructive' | 'outline';

	interface Props {
		variant?: Variant;
		class?: string;
		children?: Snippet;
	}

	let { variant = 'default', class: className, children }: Props = $props();

	const variantClasses: Record<Variant, string> = {
		default: 'bg-[var(--primary)] text-[var(--primary-foreground)]',
		secondary: 'bg-[var(--secondary)] text-[var(--secondary-foreground)]',
		destructive: 'bg-[var(--destructive)] text-[var(--destructive-foreground)]',
		outline: 'border border-[var(--border)] text-[var(--foreground)]'
	};
</script>

<span class={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors', variantClasses[variant], className)}>
	{#if children}{@render children()}{/if}
</span>
