<script lang="ts">
	import ServiceForm from '$lib/components/admin/ServiceForm.svelte';
	import SeoHead from '$lib/components/shared/SeoHead.svelte';
</script>

<SeoHead title="Admin - New Service" noindex={true} />

<div>
	<h1 class="font-serif text-2xl font-bold">Add New Service</h1>
	<div class="mt-6 rounded-(--radius) border border-(--border) bg-(--card) p-6">
		<ServiceForm formAction="?/default" submitLabel="Create Service" />
	</div>
</div>
