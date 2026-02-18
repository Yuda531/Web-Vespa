<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import RichTextEditor from '$lib/components/admin/RichTextEditor.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { slugify } from '$lib/utils';
	import { toasts } from '$lib/stores/toast';
	import type { Service } from '$lib/types';
	import { Loader2 } from 'lucide-svelte';

	interface Props {
		service?: Partial<Service>;
		formAction?: string;
		submitLabel?: string;
	}

	let { service, formAction = '?/save', submitLabel = 'Simpan' }: Props = $props();

	let title = $state(service?.title ?? '');
	let slug = $state(service?.slug ?? '');
	let autoSlug = $state(!service?.slug);
	let submitting = $state(false);

	$effect(() => {
		if (autoSlug && title) {
			slug = slugify(title);
		}
	});
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
				toasts.success('Layanan berhasil disimpan!');
				await update();
			} else if (result.type === 'failure') {
				toasts.error(String(result.data?.error ?? 'Gagal menyimpan layanan'));
			} else {
				await update();
			}
		};
	}}
>
	<div class="grid gap-4 sm:grid-cols-2">
		<div class="space-y-2">
			<Label for="title">Judul *</Label>
			<Input id="title" name="title" bind:value={title} required placeholder="Restorasi Penuh" />
		</div>
		<div class="space-y-2">
			<Label for="slug">Slug *</Label>
			<Input id="slug" name="slug" bind:value={slug} required placeholder="restorasi-penuh" />
		</div>
	</div>

	<div class="space-y-2">
		<Label for="short_description">Deskripsi Singkat</Label>
		<Input id="short_description" name="short_description" value={service?.short_description ?? ''} placeholder="Deskripsi singkat untuk card" />
	</div>

	<div class="space-y-2">
		<Label for="description">Deskripsi</Label>
		<RichTextEditor content={service?.description ?? ''} name="description" placeholder="Tulis deskripsi layanan..." />
	</div>

	<div class="grid gap-4 sm:grid-cols-3">
		<div class="space-y-2">
			<Label for="price_range">Kisaran Harga</Label>
			<Input id="price_range" name="price_range" value={service?.price_range ?? ''} placeholder="Rp 2.000.000 - Rp 5.000.000" />
		</div>
		<div class="space-y-2">
			<Label for="icon">Icon</Label>
			<Input id="icon" name="icon" value={service?.icon ?? ''} placeholder="wrench" />
		</div>
		<div class="space-y-2">
			<Label for="sort_order">Urutan</Label>
			<Input id="sort_order" name="sort_order" type="number" value={service?.sort_order ?? 0} />
		</div>
	</div>

	<Separator />

	<h3 class="font-serif text-lg font-semibold">SEO</h3>
	<div class="grid gap-4 sm:grid-cols-2">
		<div class="space-y-2">
			<Label for="seo_title">SEO Title</Label>
			<Input id="seo_title" name="seo_title" value={service?.seo_title ?? ''} />
		</div>
		<div class="space-y-2">
			<Label for="seo_description">SEO Description</Label>
			<Input id="seo_description" name="seo_description" value={service?.seo_description ?? ''} />
		</div>
	</div>

	<div class="space-y-2">
		<Label for="whatsapp_message">WhatsApp Message</Label>
		<Input id="whatsapp_message" name="whatsapp_message" value={service?.whatsapp_message ?? ''} />
	</div>

	<div class="flex items-center gap-2">
		<input type="checkbox" id="featured" name="featured" checked={service?.featured ?? false} class="rounded" />
		<Label for="featured">Tampilkan di beranda (featured)</Label>
	</div>

	<div class="flex justify-end gap-3">
		<Button variant="outline" href="/admin/services" disabled={submitting}>
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
