<script lang="ts">
	import { Star } from 'lucide-svelte';
	import type { Testimonial } from '$lib/types';

	interface Props {
		testimonials: Testimonial[];
	}

	let { testimonials }: Props = $props();
</script>

<section class="py-16 lg:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<p class="text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">Testimoni</p>
			<h2 class="mt-2 font-serif text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
				Kata Pelanggan Kami
			</h2>
		</div>

		<div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each testimonials as testimonial}
				<div class="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
					<!-- Stars -->
					<div class="flex gap-1">
						{#each Array(5) as _, idx}
							<Star
								class="h-4 w-4 {idx < testimonial.rating
									? 'fill-[var(--color-accent)] text-[var(--color-accent)]'
									: 'text-gray-300'}"
							/>
						{/each}
					</div>

					<!-- Content -->
					<p class="mt-4 text-sm text-[var(--muted-foreground)] italic">
						"{testimonial.content}"
					</p>

					<!-- Author -->
					<div class="mt-4 flex items-center gap-3">
						{#if testimonial.avatar_url}
							<img
								src={testimonial.avatar_url}
								alt={testimonial.customer_name}
								class="h-10 w-10 rounded-full object-cover"
								loading="lazy"
							/>
						{:else}
							<div class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-bold text-white">
								{testimonial.customer_name.charAt(0).toUpperCase()}
							</div>
						{/if}
						<span class="text-sm font-medium text-[var(--foreground)]">
							{testimonial.customer_name}
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
