<script lang="ts">
	import { tick } from 'svelte';
	import { cn } from '$lib/utils';
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import RichTextEditor from '$lib/components/admin/RichTextEditor.svelte';
	import { Select } from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import ImageUploader from '$lib/components/admin/ImageUploader.svelte';
	import { PRODUCT_CONDITIONS, PRODUCT_STATUSES } from '$lib/constants';
	import { slugify } from '$lib/utils';
	import { toasts } from '$lib/stores/toast';
	import type { Product, Category } from '$lib/types';
	import { Loader2 } from 'lucide-svelte';

	interface UploadedImage {
		id?: string;
		url: string;
		public_id: string;
		alt_text: string;
		is_primary: boolean;
		sort_order: number;
		file?: File;
		previewUrl?: string;
	}

	interface Props {
		product?: Partial<Product>;
		categories: Category[];
		images?: UploadedImage[];
		imageSubfolder?: string;
		formAction?: string;
		submitLabel?: string;
	}

	let { product, categories, images = $bindable([]), imageSubfolder = 'products', formAction = '?/save', submitLabel = 'Simpan' }: Props = $props();

	let title = $state(product?.title ?? '');
	let slug = $state(product?.slug ?? '');
	let autoSlug = $state(!product?.slug);
	let submitting = $state(false);
	let uploadProgress = $state('');
	let readyToSubmit = $state(false);
	let formEl: HTMLFormElement;

	$effect(() => {
		if (autoSlug && title) {
			slug = slugify(title);
		}
	});

	// Upload pending images before form submission
	async function uploadPendingImages() {
		const pendingImages = images.filter(img => img.file);
		
		if (pendingImages.length === 0) return;

		uploadProgress = `Uploading ${pendingImages.length} image(s)...`;

		for (let i = 0; i < pendingImages.length; i++) {
			const img = pendingImages[i];
			const formData = new FormData();
			formData.append('file', img.file!);
			formData.append('subfolder', imageSubfolder);

			try {
				uploadProgress = `Uploading image ${i + 1} of ${pendingImages.length}...`;
				
				const res = await fetch('/api/admin/upload', {
					method: 'POST',
					body: formData
				});

				if (res.ok) {
					const data = await res.json();
					// Update the image with actual Cloudinary data
					const imgIndex = images.findIndex(x => x.previewUrl === img.previewUrl);
					if (imgIndex !== -1) {
						images[imgIndex] = {
							...images[imgIndex],
							url: data.secure_url,
							public_id: data.public_id,
							file: undefined,
							previewUrl: undefined
						};
					}
				} else {
					throw new Error('Upload failed');
				}
			} catch (e) {
				console.error('Upload failed:', e);
				uploadProgress = '';
				throw new Error(`Failed to upload image: ${img.alt_text}`);
			}
		}

		uploadProgress = '';
	}
</script>

<form
	bind:this={formEl}
	method="POST"
	action={formAction}
	class="space-y-6"
	use:enhance={({ cancel }) => {
		submitting = true;

		// Second pass: images are already uploaded, proceed normally
		if (readyToSubmit) {
			readyToSubmit = false;
			return async ({ result, update }) => {
				submitting = false;
				if (result.type === 'redirect') {
					toasts.success('Produk berhasil disimpan!');
					await update();
				} else if (result.type === 'failure') {
					toasts.error(String(result.data?.error ?? 'Gagal menyimpan produk'));
				} else {
					await update();
				}
			};
		}

		// First pass: cancel submission, upload images, then resubmit
		const pendingImages = images.filter(img => img.file);
		if (pendingImages.length > 0) {
			cancel();
			(async () => {
				try {
					await uploadPendingImages();
					// Wait for Svelte reactivity to update the hidden images_json input
					await tick();
					readyToSubmit = true;
					formEl.requestSubmit();
				} catch (error) {
					submitting = false;
					uploadProgress = '';
					toasts.error(error instanceof Error ? error.message : 'Failed to upload images');
				}
			})();
			return;
		}

		// No pending uploads, proceed normally
		return async ({ result, update }) => {
			submitting = false;
			if (result.type === 'redirect') {
				toasts.success('Produk berhasil disimpan!');
				await update();
			} else if (result.type === 'failure') {
				toasts.error(String(result.data?.error ?? 'Gagal menyimpan produk'));
			} else {
				await update();
			}
		};
	}}
>
	<div>
		<h3 class="font-serif text-lg font-semibold mb-4">Images</h3>
		<ImageUploader bind:images subfolder={imageSubfolder} />
	</div>

	<Separator />
	<div class="grid gap-4 sm:grid-cols-2">
		<div class="space-y-2">
			<Label for="title">Judul *</Label>
			<Input id="title" name="title" bind:value={title} required placeholder="Vespa Sprint 150" />
		</div>
		<div class="space-y-2">
			<Label for="slug">Slug *</Label>
			<Input id="slug" name="slug" bind:value={slug} required placeholder="vespa-sprint-150" />
			<button type="button" class="text-xs text-(--muted-foreground) hover:underline cursor-pointer" onclick={() => { autoSlug = !autoSlug; }}>
				{autoSlug ? 'Edit slug manually' : 'Auto-generate slug'}
			</button>
		</div>
	</div>

	<div class="grid gap-4 sm:grid-cols-3">
		<div class="space-y-2">
			<Label for="price">Harga (IDR)</Label>
			<Input id="price" name="price" type="number" value={String(product?.price ?? '')} placeholder="25000000" />
		</div>
		<div class="space-y-2">
			<Label for="year">Tahun</Label>
			<Input id="year" name="year" type="number" value={String(product?.year ?? '')} placeholder="1972" />
		</div>
		<div class="space-y-2">
			<Label for="category_id">Kategori</Label>
			<Select id="category_id" name="category_id" value={product?.category_id ?? ''}>
				<option value="">-- Pilih --</option>
				{#each categories as cat}
					<option value={cat.id}>{cat.name}</option>
				{/each}
			</Select>
		</div>
	</div>

	<div class="grid gap-4 sm:grid-cols-2">
		<div class="space-y-2">
			<Label for="condition">Kondisi</Label>
			<Select id="condition" name="condition" value={product?.condition ?? ''}>
				<option value="">-- Pilih --</option>
				{#each PRODUCT_CONDITIONS as cond}
					<option value={cond}>{cond}</option>
				{/each}
			</Select>
		</div>
		<div class="space-y-2">
			<Label for="status">Status</Label>
			<Select id="status" name="status" value={product?.status ?? 'available'}>
				{#each PRODUCT_STATUSES as s}
					<option value={s}>{s}</option>
				{/each}
			</Select>
		</div>
	</div>

	<div class="space-y-2">
		<Label for="description">Deskripsi</Label>
		<RichTextEditor content={product?.description ?? ''} name="description" placeholder="Tulis deskripsi produk..." />
	</div>

	<Separator />

	<h3 class="font-serif text-lg font-semibold">SEO</h3>
	<div class="grid gap-4 sm:grid-cols-2">
		<div class="space-y-2">
			<Label for="seo_title">SEO Title</Label>
			<Input id="seo_title" name="seo_title" value={product?.seo_title ?? ''} placeholder="Custom page title" />
		</div>
		<div class="space-y-2">
			<Label for="seo_description">SEO Description</Label>
			<Input id="seo_description" name="seo_description" value={product?.seo_description ?? ''} placeholder="Custom meta description" />
		</div>
	</div>

	<div class="space-y-2">
		<Label for="whatsapp_message">WhatsApp Message</Label>
		<Input id="whatsapp_message" name="whatsapp_message" value={product?.whatsapp_message ?? ''} placeholder="Custom WA message (leave empty for default)" />
	</div>

	<div class="flex items-center gap-2">
		<input type="checkbox" id="featured" name="featured" checked={product?.featured ?? false} class="rounded" />
		<Label for="featured">Tampilkan di beranda (featured)</Label>
	</div>

	<div class="flex justify-end gap-3">
		<Button variant="outline" href="/admin/products" disabled={submitting}>
			{#snippet children()}Batal{/snippet}
		</Button>
		<Button type="submit" disabled={submitting}>
			{#snippet children()}
				{#if submitting}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
					{uploadProgress || 'Menyimpan...'}
				{:else}
					{submitLabel}
				{/if}
			{/snippet}
		</Button>
	</div>
</form>
