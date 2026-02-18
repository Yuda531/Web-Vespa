<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '$lib/components/ui/table';
	import { Badge } from '$lib/components/ui/badge';
	import { formatPrice } from '$lib/utils';
	import { toasts } from '$lib/stores/toast';
	import { Plus, Pencil, Trash2, Loader2 } from 'lucide-svelte';
	import SeoHead from '$lib/components/shared/SeoHead.svelte';

	let { data } = $props();
	let deletingId = $state<string | null>(null);
</script>

<SeoHead title="Admin - Products" noindex={true} />

<div>
	<div class="flex items-center justify-between">
		<h1 class="font-serif text-2xl font-bold">Products</h1>
		<Button href="/admin/products/new">
			{#snippet children()}<Plus class="h-4 w-4" /> Add Product{/snippet}
		</Button>
	</div>

	<div class="mt-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)]">
		<Table>
			{#snippet children()}
				<TableHeader>
					<TableRow>
						<TableHead>Title</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Status</TableHead>
						<TableHead class="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{#each data.products as product}
						<TableRow>
							<TableCell class="font-medium">{product.title}</TableCell>
							<TableCell>{product.category?.name ?? '-'}</TableCell>
							<TableCell>{formatPrice(product.price)}</TableCell>
							<TableCell>
								<Badge variant={product.status === 'available' ? 'default' : product.status === 'sold' ? 'destructive' : 'secondary'}>
									{#snippet children()}{product.status}{/snippet}
								</Badge>
							</TableCell>
							<TableCell class="text-right">
								<div class="flex justify-end gap-2">
									<Button size="icon" variant="ghost" href="/admin/products/{product.id}">
										{#snippet children()}<Pencil class="h-4 w-4" />{/snippet}
									</Button>
									<form
										method="POST"
										action="?/delete"
										use:enhance={() => {
											deletingId = product.id;
											return async ({ result, update }) => {
												deletingId = null;
												if (result.type === 'success') {
													toasts.success('Produk berhasil dihapus');
													await update();
												} else {
													toasts.error('Gagal menghapus produk');
												}
											};
										}}
									>
										<input type="hidden" name="id" value={product.id} />
										<Button size="icon" variant="ghost" type="submit" disabled={deletingId === product.id} onclick={(e) => { if (!confirm('Hapus produk ini?')) e.preventDefault(); }}>
											{#snippet children()}
												{#if deletingId === product.id}
													<Loader2 class="h-4 w-4 animate-spin" />
												{:else}
													<Trash2 class="h-4 w-4 text-[var(--destructive)]" />
												{/if}
											{/snippet}
										</Button>
									</form>
								</div>
							</TableCell>
						</TableRow>
					{/each}
					{#if data.products.length === 0}
						<TableRow>
							<TableCell class="text-center text-[var(--muted-foreground)]" colspan="5">No products found</TableCell>
						</TableRow>
					{/if}
				</TableBody>
			{/snippet}
		</Table>
	</div>
</div>
