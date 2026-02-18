<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends HTMLSelectAttributes {
		class?: string;
		value?: string;
		children?: Snippet;
	}

	let { class: className, value = $bindable(''), children, ...restProps }: Props = $props();
</script>

<select
	bind:value
	class={cn(
		'flex h-10 w-full items-center justify-between rounded-[var(--radius)] border border-[var(--input)] bg-transparent px-3 py-2 text-sm ring-offset-[var(--background)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...restProps}
>
	{#if children}{@render children()}{/if}
</select>
