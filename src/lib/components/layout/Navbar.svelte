<script lang="ts">
	import { cn } from '$lib/utils';
	import { NAV_LINKS, SITE_NAME } from '$lib/constants';
	import { page } from '$app/stores';
	import { Menu, X } from 'lucide-svelte';

	let mobileOpen = $state(false);

	function toggleMobile() {
		mobileOpen = !mobileOpen;
	}

	function closeMobile() {
		mobileOpen = false;
	}
</script>

<nav class="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/80">
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<!-- Logo -->
		<a href="/" class="flex items-center gap-2">
			<span class="font-serif text-xl font-bold text-[var(--primary)]">{SITE_NAME}</span>
		</a>

		<!-- Desktop nav -->
		<div class="hidden items-center gap-1 md:flex">
			{#each NAV_LINKS as link}
				<a
					href={link.href}
					class={cn(
						'rounded-(--radius) px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--secondary)] hover:text-[var(--foreground)]',
						$page.url.pathname === link.href || ($page.url.pathname.startsWith(link.href) && link.href !== '/')
							? 'bg-[var(--secondary)] text-[var(--foreground)]'
							: 'text-[var(--muted-foreground)]'
					)}
				>
					{link.label}
				</a>
			{/each}
		</div>

		<!-- Mobile toggle -->
		<button
			class="inline-flex items-center justify-center rounded-(--radius) p-2 text-[var(--muted-foreground)] hover:bg-[var(--secondary)] md:hidden"
			onclick={toggleMobile}
			aria-label="Toggle menu"
		>
			{#if mobileOpen}
				<X class="h-5 w-5" />
			{:else}
				<Menu class="h-5 w-5" />
			{/if}
		</button>
	</div>

	<!-- Mobile menu -->
	{#if mobileOpen}
		<div class="border-t border-[var(--border)] bg-[var(--background)] md:hidden">
			<div class="space-y-1 px-4 pb-4 pt-2">
				{#each NAV_LINKS as link}
					<a
						href={link.href}
						onclick={closeMobile}
						class={cn(
							'block rounded-(--radius) px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--secondary)]',
							$page.url.pathname === link.href || ($page.url.pathname.startsWith(link.href) && link.href !== '/')
								? 'bg-[var(--secondary)] text-[var(--foreground)]'
								: 'text-[var(--muted-foreground)]'
						)}
					>
						{link.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</nav>
