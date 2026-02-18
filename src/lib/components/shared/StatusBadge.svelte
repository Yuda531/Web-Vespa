<script lang="ts">
	import { cn } from '$lib/utils';
	import { Badge } from '$lib/components/ui/badge';

	interface Props {
		status: 'available' | 'sold' | 'reserved' | string;
		class?: string;
	}

	let { status, class: className }: Props = $props();

	const config: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' }> = {
		available: { label: 'Tersedia', variant: 'default' },
		sold: { label: 'Terjual', variant: 'destructive' },
		reserved: { label: 'Dipesan', variant: 'secondary' }
	};

	const item = $derived(config[status] ?? { label: status, variant: 'secondary' as const });
</script>

<Badge variant={item.variant} class={className}>{item.label}</Badge>
