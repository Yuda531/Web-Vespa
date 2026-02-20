<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		value: string | number;
		description?: string;
		icon?: Snippet;
		class?: string;
	}

	let { title, value, description, icon, class: className }: Props = $props();
</script>

<div class={cn('rounded-(--radius) border border-[var(--border)] bg-[var(--card)] p-6', className)}>
	<div class="flex items-center justify-between">
		<p class="text-sm font-medium text-[var(--muted-foreground)]">{title}</p>
		{#if icon}
			<div class="text-[var(--muted-foreground)]">
				{@render icon()}
			</div>
		{/if}
	</div>
	<p class="mt-2 text-3xl font-bold text-[var(--foreground)]">{value}</p>
	{#if description}
		<p class="mt-1 text-xs text-[var(--muted-foreground)]">{description}</p>
	{/if}
</div>
