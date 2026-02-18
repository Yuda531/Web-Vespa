<script lang="ts">
	import { navigating } from '$app/state';

	const isNavigating = $derived(navigating.to !== null);
</script>

{#if isNavigating}
	<div class="fixed top-0 left-0 right-0 z-[200]">
		<div class="nav-progress-bar h-0.5 bg-[var(--color-accent)]"></div>
	</div>
{/if}

<style>
	.nav-progress-bar {
		animation: nav-progress 2s ease-in-out infinite;
		transform-origin: left;
	}

	@keyframes nav-progress {
		0% {
			transform: scaleX(0);
		}
		50% {
			transform: scaleX(0.7);
		}
		100% {
			transform: scaleX(1);
		}
	}
</style>
