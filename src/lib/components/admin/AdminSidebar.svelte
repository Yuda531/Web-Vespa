<script lang="ts">
	import { cn } from '$lib/utils';
	import { page } from '$app/stores';
	import { SITE_NAME } from '$lib/constants';
	import {
		LayoutDashboard,
		Package,
		Wrench,
		MessageSquare,
		FolderTree,
		Settings,
		LogOut,
		ChevronLeft
	} from 'lucide-svelte';

	const links = [
		{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
		{ href: '/admin/products', label: 'Products', icon: Package },
		{ href: '/admin/services', label: 'Services', icon: Wrench },
		{ href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
		{ href: '/admin/categories', label: 'Categories', icon: FolderTree },
		{ href: '/admin/settings', label: 'Settings', icon: Settings }
	];
</script>

<aside class="flex h-screen w-64 flex-col bg-[var(--sidebar-background)] text-[var(--sidebar-foreground)]">
	<!-- Logo -->
	<div class="flex h-16 items-center border-b border-[var(--sidebar-border)] px-6">
		<span class="font-serif text-lg font-bold text-[var(--sidebar-primary)]">{SITE_NAME}</span>
		<span class="ml-2 text-xs text-[var(--sidebar-foreground)]/60">Admin</span>
	</div>

	<!-- Nav -->
	<nav class="flex-1 space-y-1 px-3 py-4">
		{#each links as link}
			<a
				href={link.href}
				class={cn(
					'flex items-center gap-3 rounded-[var(--radius)] px-3 py-2 text-sm transition-colors',
					$page.url.pathname === link.href ||
						($page.url.pathname.startsWith(link.href + '/') && link.href !== '/admin')
						? 'bg-[var(--sidebar-accent)] text-[var(--sidebar-primary)]'
						: 'text-[var(--sidebar-foreground)]/80 hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-foreground)]'
				)}
			>
				<link.icon class="h-4 w-4" />
				{link.label}
			</a>
		{/each}
	</nav>

	<!-- Footer -->
	<div class="border-t border-[var(--sidebar-border)] p-3 space-y-1">
		<a
			href="/"
			class="flex items-center gap-3 rounded-[var(--radius)] px-3 py-2 text-sm text-[var(--sidebar-foreground)]/60 hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-foreground)]"
		>
			<ChevronLeft class="h-4 w-4" />
			Back to Site
		</a>
		<form method="POST" action="/auth/logout">
			<button
				type="submit"
				class="flex w-full items-center gap-3 rounded-[var(--radius)] px-3 py-2 text-sm text-[var(--sidebar-foreground)]/60 hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-foreground)] cursor-pointer"
			>
				<LogOut class="h-4 w-4" />
				Logout
			</button>
		</form>
	</div>
</aside>
