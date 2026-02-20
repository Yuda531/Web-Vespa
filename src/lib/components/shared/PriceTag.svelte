<script lang="ts">
	import { cn, formatPrice } from '$lib/utils';

	interface Props {
		price: number | null | undefined;
		class?: string;
		size?: 'sm' | 'md' | 'lg';
	}

	let { price, class: className, size = 'md' }: Props = $props();

	const sizeClasses = {
		sm: 'text-sm',
		md: 'text-lg',
		lg: 'text-2xl'
	};
</script>

<span class={cn('font-semibold text-(--primary)', sizeClasses[size], className)}>
	{formatPrice(price)}
</span>
