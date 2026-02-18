<script lang="ts">
	import ServiceForm from '$lib/components/admin/ServiceForm.svelte';
	import SeoHead from '$lib/components/shared/SeoHead.svelte';
	let { data } = $props();
</script>

<SeoHead title="Admin - Edit Service" noindex={true} />

<div>
	<h1 class="font-serif text-2xl font-bold">Edit Service</h1>
	<div class="mt-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-6">
		<ServiceForm service={data.service} formAction="?/default" submitLabel="Update Service" />
	</div>
</div>
