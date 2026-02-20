<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { AlertTriangle, ArrowLeft } from 'lucide-svelte';

	const statusCode = $derived(page.status);
	const errorMessage = $derived(page.error?.message ?? 'An error occurred');
</script>

<div class="flex min-h-[50vh] flex-col items-center justify-center text-center">
	<div class="rounded-full bg-[var(--destructive)]/10 p-4">
		<AlertTriangle class="h-10 w-10 text-[var(--destructive)]" />
	</div>

	<h1 class="mt-4 font-serif text-2xl font-bold">Error {statusCode}</h1>
	<p class="mt-2 max-w-md text-(--muted-foreground)">{errorMessage}</p>

	<div class="mt-6 flex gap-3">
		<Button href="/admin" variant="default">
			{#snippet children()}Back to Dashboard{/snippet}
		</Button>
		<Button variant="outline" onclick={() => history.back()}>
			{#snippet children()}
				<ArrowLeft class="mr-2 h-4 w-4" />
				Go Back
			{/snippet}
		</Button>
	</div>
</div>
