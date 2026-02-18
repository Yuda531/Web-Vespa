<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { toasts } from '$lib/stores/toast';
	import type { Testimonial } from '$lib/types';
	import { Loader2 } from 'lucide-svelte';

	interface Props {
		testimonial?: Partial<Testimonial>;
		formAction?: string;
		submitLabel?: string;
	}

	let { testimonial, formAction = '?/save', submitLabel = 'Simpan' }: Props = $props();
	let submitting = $state(false);
</script>

<form
	method="POST"
	action={formAction}
	class="space-y-6"
	use:enhance={() => {
		submitting = true;
		return async ({ result, update }) => {
			submitting = false;
			if (result.type === 'redirect') {
				toasts.success('Testimoni berhasil disimpan!');
				await update();
			} else if (result.type === 'failure') {
				toasts.error(String(result.data?.error ?? 'Gagal menyimpan testimoni'));
			} else {
				await update();
			}
		};
	}}
>
	<div class="grid gap-4 sm:grid-cols-2">
		<div class="space-y-2">
			<Label for="customer_name">Nama Pelanggan *</Label>
			<Input id="customer_name" name="customer_name" value={testimonial?.customer_name ?? ''} required placeholder="John Doe" />
		</div>
		<div class="space-y-2">
			<Label for="rating">Rating (1-5) *</Label>
			<Input id="rating" name="rating" type="number" min="1" max="5" value={String(testimonial?.rating ?? 5)} required />
		</div>
	</div>

	<div class="space-y-2">
		<Label for="content">Testimoni *</Label>
		<Textarea id="content" name="content" rows={4} value={testimonial?.content ?? ''} required placeholder="Testimoni pelanggan..." />
	</div>

	<div class="space-y-2">
		<Label for="avatar_url">Avatar URL</Label>
		<Input id="avatar_url" name="avatar_url" value={testimonial?.avatar_url ?? ''} placeholder="https://..." />
	</div>

	<div class="flex items-center gap-2">
		<input type="checkbox" id="is_visible" name="is_visible" checked={testimonial?.is_visible ?? true} class="rounded" />
		<Label for="is_visible">Tampilkan di website</Label>
	</div>

	<div class="flex justify-end gap-3">
		<Button variant="outline" href="/admin/testimonials" disabled={submitting}>
			{#snippet children()}Batal{/snippet}
		</Button>
		<Button type="submit" disabled={submitting}>
			{#snippet children()}
				{#if submitting}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
					Menyimpan...
				{:else}
					{submitLabel}
				{/if}
			{/snippet}
		</Button>
	</div>
</form>
