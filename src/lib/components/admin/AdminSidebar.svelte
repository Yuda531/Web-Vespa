<script lang="ts">
	import { cn } from '$lib/utils';
	import { page } from '$app/stores';
	import { SITE_NAME } from '$lib/constants';
	import { sidebarCollapsed } from '$lib/stores/sidebar';
	import {
		LayoutDashboard,
		Package,
		Wrench,
		MessageSquare,
		FolderTree,
		Settings,
		LogOut,
		ChevronLeft,
		PanelLeftClose,
		PanelLeftOpen
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

<aside
	class={cn(
		'flex h-screen flex-col bg-(--sidebar-background) text-(--sidebar-foreground) transition-all duration-300',
		$sidebarCollapsed ? 'w-16' : 'w-64'
	)}
>
	<!-- Logo -->
	<div class="flex h-16 items-center border-b border-(--sidebar-border) px-4 justify-between">
		{#if !$sidebarCollapsed}
			<div class="flex items-center">
				<span class="font-serif text-lg font-bold text-(--sidebar-primary)">{SITE_NAME}</span>
				<span class="ml-2 text-xs text-(--sidebar-foreground)/60">Admin</span>
			</div>
		{/if}
		<button
			onclick={() => ($sidebarCollapsed = !$sidebarCollapsed)}
			class="p-1 rounded-(--radius) text-(--sidebar-foreground)/60 hover:bg-(--sidebar-accent) hover:text-(--sidebar-foreground) cursor-pointer"
			aria-label="Toggle sidebar"
		>
			{#if $sidebarCollapsed}
				<PanelLeftOpen class="h-5 w-5" />
			{:else}
				<PanelLeftClose class="h-5 w-5" />
			{/if}
		</button>
	</div>

	<!-- Nav -->
	<nav class="flex-1 space-y-1 px-3 py-4">
		{#each links as link}
			<a
				href={link.href}
				title={$sidebarCollapsed ? link.label : undefined}
				class={cn(
					'flex items-center gap-3 rounded-(--radius) px-3 py-2 text-sm transition-colors',
					$sidebarCollapsed && 'justify-center',
					$page.url.pathname === link.href ||
						($page.url.pathname.startsWith(link.href + '/') && link.href !== '/admin')
						? 'bg-(--sidebar-accent) text-(--sidebar-primary)'
						: 'text-(--sidebar-foreground)/80 hover:bg-(--sidebar-accent) hover:text-(--sidebar-foreground)'
				)}
			>
				<link.icon class="h-4 w-4 shrink-0" />
				{#if !$sidebarCollapsed}
					{link.label}
				{/if}
			</a>
		{/each}
	</nav>

	<!-- Footer -->
	<div class="border-t border-(--sidebar-border) p-3 space-y-1">
		<a
			href="/"
			title={$sidebarCollapsed ? 'Back to Site' : undefined}
			class={cn(
				'flex items-center gap-3 rounded-(--radius) px-3 py-2 text-sm text-(--sidebar-foreground)/60 hover:bg-(--sidebar-accent) hover:text-(--sidebar-foreground)',
				$sidebarCollapsed && 'justify-center'
			)}
		>
			<ChevronLeft class="h-4 w-4 shrink-0" />
			{#if !$sidebarCollapsed}
				Back to Site
			{/if}
		</a>
		<form method="POST" action="/auth/logout">
			<button
				type="submit"
				title={$sidebarCollapsed ? 'Logout' : undefined}
				class={cn(
					'flex w-full items-center gap-3 rounded-(--radius) px-3 py-2 text-sm text-(--sidebar-foreground)/60 hover:bg-(--sidebar-accent) hover:text-(--sidebar-foreground) cursor-pointer',
					$sidebarCollapsed && 'justify-center'
				)}
			>
				<LogOut class="h-4 w-4 shrink-0" />
				{#if !$sidebarCollapsed}
					Logout
				{/if}
			</button>
		</form>
	</div>
</aside>
