<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		class?: string;
		lines?: number;
	}

	let { class: className, lines = 3 }: Props = $props();
</script>

<div class={cn('animate-pulse space-y-3', className)}>
	{#each Array(lines) as _, i}
		<div
			class={cn(
				'rounded bg-(--muted)',
				i === lines - 1 ? 'h-4 w-3/4' : 'h-4 w-full'
			)}
		></div>
	{/each}
</div>
