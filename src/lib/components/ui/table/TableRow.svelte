<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props { class?: string; children?: Snippet; }
	let { class: className, children }: Props = $props();
</script>
<tr class={cn('border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)]/50 data-[state=selected]:bg-[var(--muted)]', className)}>
	{#if children}{@render children()}{/if}
</tr>
