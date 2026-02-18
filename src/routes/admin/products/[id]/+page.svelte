<script lang="ts">
	import ProductForm from '$lib/components/admin/ProductForm.svelte';
	import SeoHead from '$lib/components/shared/SeoHead.svelte';

	let { data } = $props();
	let images = $state(
		(data.product.images ?? []).map((img: any) => ({
			id: img.id,
			url: img.url,
			public_id: img.cloudinary_public_id,
			alt_text: img.alt_text ?? '',
			is_primary: img.is_primary,
			sort_order: img.sort_order
		}))
	);
</script>

<SeoHead title="Admin - Edit Product" noindex={true} />

<div>
	<h1 class="font-serif text-2xl font-bold">Edit Product</h1>
	<div class="mt-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-6">
		<ProductForm product={data.product} categories={data.categories} bind:images formAction="?/update" submitLabel="Update Product" />
	</div>
</div>

