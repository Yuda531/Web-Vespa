<script lang="ts">
	import { toasts, type Toast, type ToastType } from '$lib/stores/toast';
	import { fly, fade } from 'svelte/transition';
	import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-svelte';

	let toastList: Toast[] = $state([]);

	toasts.subscribe((value) => {
		toastList = value;
	});

	const iconMap = {
		success: CheckCircle,
		error: AlertCircle,
		warning: AlertTriangle,
		info: Info
	} as Record<ToastType, any>;

	const colorMap: Record<ToastType, string> = {
		success: 'bg-green-50 border-green-200 text-green-800',
		error: 'bg-red-50 border-red-200 text-red-800',
		warning: 'bg-amber-50 border-amber-200 text-amber-800',
		info: 'bg-blue-50 border-blue-200 text-blue-800'
	};

	const iconColorMap: Record<ToastType, string> = {
		success: 'text-green-500',
		error: 'text-red-500',
		warning: 'text-amber-500',
		info: 'text-blue-500'
	};
</script>

{#if toastList.length > 0}
	<div class="fixed top-4 right-4 z-100 flex flex-col gap-2">
		{#each toastList as toast (toast.id)}
			{@const IconComponent = iconMap[toast.type]}
			<div
				class="flex min-w-75 max-w-105 items-start gap-3 rounded-lg border p-4 shadow-lg {colorMap[toast.type]}"
				in:fly={{ x: 100, duration: 250 }}
				out:fade={{ duration: 150 }}
				role="alert"
			>
				<IconComponent
					class="mt-0.5 h-5 w-5 shrink-0 {iconColorMap[toast.type]}"
				/>
				<p class="flex-1 text-sm font-medium">{toast.message}</p>
				<button
					class="shrink-0 rounded-md p-0.5 opacity-60 hover:opacity-100 transition-opacity"
					onclick={() => toasts.remove(toast.id)}
				>
					<X class="h-4 w-4" />
				</button>
			</div>
		{/each}
	</div>
{/if}
