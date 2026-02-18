<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';

	type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
	type Size = 'default' | 'sm' | 'lg' | 'icon';

	interface Props {
		variant?: Variant;
		size?: Size;
		class?: string;
		children?: Snippet;
		href?: string;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		onclick?: (e: MouseEvent) => void;
		[key: string]: unknown;
	}

	let {
		variant = 'default',
		size = 'default',
		class: className,
		children,
		href,
		...restProps
	}: Props = $props();

	const variantClasses: Record<Variant, string> = {
		default: 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90',
		destructive: 'bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:bg-[var(--destructive)]/90',
		outline: 'border border-[var(--input)] bg-transparent hover:bg-[var(--secondary)] hover:text-[var(--foreground)]',
		secondary: 'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary)]/80',
		ghost: 'hover:bg-[var(--secondary)] hover:text-[var(--foreground)]',
		link: 'text-[var(--primary)] underline-offset-4 hover:underline'
	};

	const sizeClasses: Record<Size, string> = {
		default: 'h-10 px-4 py-2',
		sm: 'h-9 rounded-md px-3',
		lg: 'h-11 rounded-md px-8',
		icon: 'h-10 w-10'
	};

	const baseClasses = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer';
</script>

{#if href}
	<a {href} class={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}>
		{#if children}{@render children()}{/if}
	</a>
{:else}
	<button class={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)} {...restProps}>
		{#if children}{@render children()}{/if}
	</button>
{/if}
