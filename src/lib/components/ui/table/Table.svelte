<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: className, children }: Props = $props();
</script>

<div class={cn('relative w-full overflow-auto', className)}>
	<table class="w-full caption-bottom text-sm">
		{#if children}{@render children()}{/if}
	</table>
</div>
