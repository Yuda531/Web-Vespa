<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		count?: number;
		class?: string;
	}

	let { count = 3, class: className }: Props = $props();
</script>

<div class={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}>
	{#each Array(count) as _}
		<div class="overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] shadow-sm">
			<!-- Image skeleton -->
			<div class="aspect-[16/10] animate-pulse bg-[var(--muted)]"></div>
			<!-- Content skeleton -->
			<div class="space-y-3 p-4">
				<div class="h-5 w-3/4 animate-pulse rounded bg-[var(--muted)]"></div>
				<div class="h-3 w-full animate-pulse rounded bg-[var(--muted)]"></div>
				<div class="h-3 w-1/2 animate-pulse rounded bg-[var(--muted)]"></div>
			</div>
		</div>
	{/each}
</div>
