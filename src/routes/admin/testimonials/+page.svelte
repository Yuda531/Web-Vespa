<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '$lib/components/ui/table';
	import { Badge } from '$lib/components/ui/badge';
	import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-svelte';
	import SeoHead from '$lib/components/shared/SeoHead.svelte';
	let { data } = $props();
</script>

<SeoHead title="Admin - Testimonials" noindex={true} />

<div>
	<div class="flex items-center justify-between">
		<h1 class="font-serif text-2xl font-bold">Testimonials</h1>
		<Button href="/admin/testimonials/new">
			{#snippet children()}<Plus class="h-4 w-4" /> Add Testimonial{/snippet}
		</Button>
	</div>
	<div class="mt-6 rounded-(--radius) border border-[var(--border)] bg-[var(--card)]">
		<Table>
			{#snippet children()}
				<TableHeader>
					<TableRow>
						<TableHead>Customer</TableHead>
						<TableHead>Rating</TableHead>
						<TableHead>Visible</TableHead>
						<TableHead class="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{#each data.testimonials as testimonial}
						<TableRow>
							<TableCell class="font-medium">{testimonial.customer_name}</TableCell>
							<TableCell>{testimonial.rating}/5</TableCell>
							<TableCell>
								<form method="POST" action="?/toggleVisibility" use:enhance>
									<input type="hidden" name="id" value={testimonial.id} />
									<input type="hidden" name="is_visible" value={testimonial.is_visible} />
									<button type="submit" class="cursor-pointer">
										{#if testimonial.is_visible}
											<Badge variant="default">{#snippet children()}<Eye class="h-3 w-3 mr-1" /> Visible{/snippet}</Badge>
										{:else}
											<Badge variant="secondary">{#snippet children()}<EyeOff class="h-3 w-3 mr-1" /> Hidden{/snippet}</Badge>
										{/if}
									</button>
								</form>
							</TableCell>
							<TableCell class="text-right">
								<div class="flex justify-end gap-2">
									<Button size="icon" variant="ghost" href="/admin/testimonials/{testimonial.id}">
										{#snippet children()}<Pencil class="h-4 w-4" />{/snippet}
									</Button>
									<form method="POST" action="?/delete" use:enhance>
										<input type="hidden" name="id" value={testimonial.id} />
										<Button size="icon" variant="ghost" type="submit" onclick={(e) => { if (!confirm('Delete?')) e.preventDefault(); }}>
											{#snippet children()}<Trash2 class="h-4 w-4 text-[var(--destructive)]" />{/snippet}
										</Button>
									</form>
								</div>
							</TableCell>
						</TableRow>
					{/each}
					{#if data.testimonials.length === 0}
						<TableRow>
							<TableCell class="text-center text-[var(--muted-foreground)]" colspan="4">No testimonials found</TableCell>
						</TableRow>
					{/if}
				</TableBody>
			{/snippet}
		</Table>
	</div>
</div>
