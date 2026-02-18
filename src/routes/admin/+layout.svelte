<script lang="ts">
	import AdminSidebar from '$lib/components/admin/AdminSidebar.svelte';
	import ToastContainer from '$lib/components/shared/ToastContainer.svelte';
	let { children } = $props();
</script>

<div class="flex h-screen overflow-hidden bg-[var(--background)]">
	<AdminSidebar />
	<div class="flex-1 overflow-y-auto">
		<div class="p-6 lg:p-8">
			{@render children()}
		</div>
	</div>
	<ToastContainer />
</div>
