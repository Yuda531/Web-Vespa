<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '$lib/components/ui/card';
	import { SITE_NAME } from '$lib/constants';
	import SeoHead from '$lib/components/shared/SeoHead.svelte';

	let { form } = $props();
</script>

<SeoHead title="Login Admin" noindex={true} />

<div class="flex min-h-[80vh] items-center justify-center px-4">
	<Card class="w-full max-w-md">
		<CardHeader class="text-center">
			<CardTitle class="text-2xl">{SITE_NAME}</CardTitle>
			<CardDescription>Masuk ke panel admin</CardDescription>
		</CardHeader>
		<CardContent>
			<form method="POST" use:enhance class="space-y-4">
				{#if form?.error}
					<div class="rounded-[var(--radius)] bg-red-50 p-3 text-sm text-red-600">
						{form.error}
					</div>
				{/if}

				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder="admin@example.com"
						value={form?.email ?? ''}
						required
					/>
				</div>

				<div class="space-y-2">
					<Label for="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="••••••••"
						required
					/>
				</div>

				<Button type="submit" class="w-full">
					{#snippet children()}Masuk{/snippet}
				</Button>
			</form>
		</CardContent>
		<CardFooter class="justify-center">
			<a href="/" class="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
				&larr; Kembali ke beranda
			</a>
		</CardFooter>
	</Card>
</div>
