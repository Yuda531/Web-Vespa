<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import SeoHead from '$lib/components/shared/SeoHead.svelte';

	let { data, form } = $props();
</script>

<SeoHead title="Admin - Settings" noindex={true} />

<div>
	<h1 class="font-serif text-2xl font-bold">Site Settings</h1>

	{#if form?.success}
		<div class="mt-4 rounded-(--radius) bg-green-50 p-3 text-sm text-green-600">
			Settings saved successfully
		</div>
	{/if}

	<div class="mt-6 rounded-(--radius) border border-[var(--border)] bg-[var(--card)] p-6">
		<form method="POST" use:enhance class="space-y-6">
			<div class="space-y-2">
				<Label for="site_title">Site Title</Label>
				<Input id="site_title" name="site_title" value={data.settings.site_title ?? ''} placeholder="Vespa Abas" />
			</div>
			<div class="space-y-2">
				<Label for="site_description">Site Description</Label>
				<Textarea id="site_description" name="site_description" value={data.settings.site_description ?? ''} rows={3} />
			</div>
			<div class="space-y-2">
				<Label for="whatsapp_number">WhatsApp Number</Label>
				<Input id="whatsapp_number" name="whatsapp_number" value={data.settings.whatsapp_number ?? ''} placeholder="6281380625291" />
			</div>
			<div class="space-y-2">
				<Label for="address">Address</Label>
				<Textarea id="address" name="address" value={data.settings.address ?? ''} rows={2} />
			</div>
			<Button type="submit">
				{#snippet children()}Save Settings{/snippet}
			</Button>
		</form>
	</div>
</div>
