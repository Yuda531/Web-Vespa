<script lang="ts">
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { Upload, X, GripVertical } from 'lucide-svelte';

	interface UploadedImage {
		id?: string;
		url: string;
		public_id: string;
		alt_text: string;
		is_primary: boolean;
		sort_order: number;
		// For staged uploads
		file?: File;
		previewUrl?: string;
	}

	interface Props {
		images?: UploadedImage[];
		uploadEndpoint?: string;
		subfolder?: string;
	}

	let { images = $bindable([]), uploadEndpoint = '/api/admin/upload', subfolder = 'products' }: Props = $props();

	let dragover = $state(false);

	function handleFiles(files: FileList | null) {
		if (!files || files.length === 0) return;

		for (const file of files) {
			// Create local preview URL for immediate display
			const previewUrl = URL.createObjectURL(file);
			
			images = [
				...images,
				{
					url: previewUrl,
					public_id: '', // Will be set after upload on submit
					alt_text: file.name.replace(/\.[^.]+$/, ''),
					is_primary: images.length === 0,
					sort_order: images.length,
					file: file, // Store the actual file for deferred upload
					previewUrl: previewUrl // Mark as pending upload
				}
			];
		}
	}

	function removeImage(idx: number) {
		const wasPrimary = images[idx].is_primary;
		const img = images[idx];
		
		// Revoke preview URL if it exists to prevent memory leaks
		if (img.previewUrl) {
			URL.revokeObjectURL(img.previewUrl);
		}
		
		images = images.filter((_, i) => i !== idx);
		if (wasPrimary && images.length > 0) {
			images[0].is_primary = true;
			images = [...images];
		}
	}

	function setPrimary(idx: number) {
		images = images.map((img, i) => ({ ...img, is_primary: i === idx }));
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		dragover = false;
		handleFiles(e.dataTransfer?.files ?? null);
	}
</script>

<div class="space-y-4">
	<!-- Drop zone -->
	<div
		class={cn(
			'flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-(--radius) border-2 border-dashed p-6 transition-colors',
			dragover ? 'border-[var(--primary)] bg-[var(--primary)]/5' : 'border-[var(--border)] hover:border-[var(--primary)]'
		)}
		ondragover={(e) => { e.preventDefault(); dragover = true; }}
		ondragleave={() => (dragover = false)}
		ondrop={handleDrop}
		onclick={() => document.getElementById('file-input')?.click()}
		onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') document.getElementById('file-input')?.click(); }}
		role="button"
		tabindex="0"
	>
		<Upload class="mb-2 h-8 w-8 text-[var(--muted-foreground)]" />
		<p class="text-sm text-[var(--muted-foreground)]">
			Drag & drop or click to upload
		</p>
	</div>

	<input
		id="file-input"
		type="file"
		accept="image/*"
		multiple
		class="hidden"
		onchange={(e) => handleFiles((e.target as HTMLInputElement).files)}
	/>

	<!-- Uploaded images -->
	{#if images.length > 0}
		<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each images as img, idx}
				<div class="group relative overflow-hidden rounded-(--radius) border border-[var(--border)]">
					<img src={img.url} alt={img.alt_text} class="aspect-square w-full object-cover" />
					<div class="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
						<Button size="sm" variant={img.is_primary ? 'default' : 'secondary'} onclick={() => setPrimary(idx)}>
							{#snippet children()}{img.is_primary ? 'Primary' : 'Set Primary'}{/snippet}
						</Button>
						<Button size="icon" variant="destructive" onclick={() => removeImage(idx)}>
							{#snippet children()}<X class="h-4 w-4" />{/snippet}
						</Button>
					</div>
					{#if img.is_primary}
						<span class="absolute top-2 left-2 rounded bg-[var(--primary)] px-2 py-0.5 text-xs text-white">Primary</span>
					{/if}
				</div>
			{/each}
		</div>
	{/if}

	<!-- Hidden inputs for form submission -->
	<input type="hidden" name="images_json" value={JSON.stringify(images.map(img => ({
		id: img.id,
		url: img.url,
		public_id: img.public_id,
		alt_text: img.alt_text,
		is_primary: img.is_primary,
		sort_order: img.sort_order
	})))} />
</div>
