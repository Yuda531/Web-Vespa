<script lang="ts">
	import TestimonialForm from '$lib/components/admin/TestimonialForm.svelte';
	import SeoHead from '$lib/components/shared/SeoHead.svelte';
	let { data } = $props();
</script>

<SeoHead title="Admin - Edit Testimonial" noindex={true} />

<div>
	<h1 class="font-serif text-2xl font-bold">Edit Testimonial</h1>
	<div class="mt-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-6">
		<TestimonialForm testimonial={data.testimonial} formAction="?/default" submitLabel="Update Testimonial" />
	</div>
</div>
