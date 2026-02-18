<script lang="ts">
	import TestimonialForm from '$lib/components/admin/TestimonialForm.svelte';
	import SeoHead from '$lib/components/shared/SeoHead.svelte';
</script>

<SeoHead title="Admin - New Testimonial" noindex={true} />

<div>
	<h1 class="font-serif text-2xl font-bold">Add New Testimonial</h1>
	<div class="mt-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-6">
		<TestimonialForm formAction="?/default" submitLabel="Create Testimonial" />
	</div>
</div>
