<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '$lib/components/ui/table';
	import { Plus, Pencil, Trash2 } from 'lucide-svelte';
	import SeoHead from '$lib/components/shared/SeoHead.svelte';

	let { data } = $props();
</script>

<SeoHead title="Admin - Services" noindex={true} />

<div>
	<div class="flex items-center justify-between">
		<h1 class="font-serif text-2xl font-bold">Services</h1>
		<Button href="/admin/services/new">
			{#snippet children()}<Plus class="h-4 w-4" /> Add Service{/snippet}
		</Button>
	</div>
	<div class="mt-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)]">
		<Table>
			{#snippet children()}
				<TableHeader>
					<TableRow>
						<TableHead>Title</TableHead>
						<TableHead>Price Range</TableHead>
						<TableHead>Order</TableHead>
						<TableHead class="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{#each data.services as service}
						<TableRow>
							<TableCell class="font-medium">{service.title}</TableCell>
							<TableCell>{service.price_range ?? '-'}</TableCell>
							<TableCell>{service.sort_order}</TableCell>
							<TableCell class="text-right">
								<div class="flex justify-end gap-2">
									<Button size="icon" variant="ghost" href="/admin/services/{service.id}">
										{#snippet children()}<Pencil class="h-4 w-4" />{/snippet}
									</Button>
									<form method="POST" action="?/delete" use:enhance>
										<input type="hidden" name="id" value={service.id} />
										<Button size="icon" variant="ghost" type="submit" onclick={(e) => { if (!confirm('Delete?')) e.preventDefault(); }}>
											{#snippet children()}<Trash2 class="h-4 w-4 text-[var(--destructive)]" />{/snippet}
										</Button>
									</form>
								</div>
							</TableCell>
						</TableRow>
					{/each}
					{#if data.services.length === 0}
						<TableRow>
							<TableCell class="text-center text-[var(--muted-foreground)]" colspan="4">No services found</TableCell>
						</TableRow>
					{/if}
				</TableBody>
			{/snippet}
		</Table>
	</div>
</div>
