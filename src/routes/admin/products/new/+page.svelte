<script lang="ts">
	import ProductForm from '$lib/components/admin/ProductForm.svelte';
	import SeoHead from '$lib/components/shared/SeoHead.svelte';

	let { data } = $props();
	let images: any[] = $state([]);
</script>

<SeoHead title="Admin - New Product" noindex={true} />

<div>
	<h1 class="font-serif text-2xl font-bold">Add New Product</h1>
	<div class="mt-6 rounded-(--radius) border border-(--border) bg-(--card) p-6">
		<ProductForm categories={data.categories} bind:images formAction="?/create" submitLabel="Create Product" />
	</div>
</div>

