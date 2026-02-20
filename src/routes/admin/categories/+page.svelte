<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '$lib/components/ui/table';
	import { Trash2 } from 'lucide-svelte';
	import { slugify } from '$lib/utils';
	import SeoHead from '$lib/components/shared/SeoHead.svelte';

	let { data } = $props();
	let name = $state('');
	let slug = $state('');

	$effect(() => {
		slug = slugify(name);
	});
</script>

<SeoHead title="Admin - Categories" noindex={true} />

<div>
	<h1 class="font-serif text-2xl font-bold">Categories</h1>

	<div class="mt-6 rounded-(--radius) border border-(--border) bg-(--card) p-6">
		<h2 class="font-serif text-lg font-semibold mb-4">Add Category</h2>
		<form method="POST" action="?/create" use:enhance class="flex gap-3 items-end">
			<div class="flex-1 space-y-1">
				<Label for="name">Name</Label>
				<Input id="name" name="name" bind:value={name} required placeholder="Sprint" />
			</div>
			<div class="flex-1 space-y-1">
				<Label for="slug">Slug</Label>
				<Input id="slug" name="slug" bind:value={slug} required placeholder="sprint" />
			</div>
			<Button type="submit">
				{#snippet children()}Add{/snippet}
			</Button>
		</form>
	</div>

	<div class="mt-6 rounded-(--radius) border border-(--border) bg-(--card)">
		<Table>
			{#snippet children()}
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Slug</TableHead>
						<TableHead class="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{#each data.categories as category}
						<TableRow>
							<TableCell class="font-medium">{category.name}</TableCell>
							<TableCell class="text-(--muted-foreground)">{category.slug}</TableCell>
							<TableCell class="text-right">
								<form method="POST" action="?/delete" use:enhance>
									<input type="hidden" name="id" value={category.id} />
									<Button size="icon" variant="ghost" type="submit" onclick={(e) => { if (!confirm('Delete category?')) e.preventDefault(); }}>
										{#snippet children()}<Trash2 class="h-4 w-4 text-[var(--destructive)]" />{/snippet}
									</Button>
								</form>
							</TableCell>
						</TableRow>
					{/each}
					{#if data.categories.length === 0}
						<TableRow>
							<TableCell class="text-center text-(--muted-foreground)" colspan="3">No categories yet</TableCell>
						</TableRow>
					{/if}
				</TableBody>
			{/snippet}
		</Table>
	</div>
</div>
