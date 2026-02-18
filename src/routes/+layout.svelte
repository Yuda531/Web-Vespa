<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import WhatsappFab from '$lib/components/shared/WhatsappFab.svelte';
	import ToastContainer from '$lib/components/shared/ToastContainer.svelte';
	import NavigationProgress from '$lib/components/shared/NavigationProgress.svelte';
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';

	let { children } = $props();
</script>

<NavigationProgress />

<div class="flex min-h-screen flex-col">
	<Navbar />
	<main class="flex-1">
		{#key page.url.pathname}
			<div in:fade={{ duration: 200, delay: 100 }} out:fade={{ duration: 100 }}>
				{@render children()}
			</div>
		{/key}
	</main>
	<Footer />
	<WhatsappFab />
	<ToastContainer />
</div>
