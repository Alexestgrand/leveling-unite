<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { reveal } from '$lib/actions/reveal';

	interface Props {
		title: string;
		subtitle?: string;
		children: Snippet;
	}

	let { title, subtitle, children }: Props = $props();

	let contentEl: HTMLDivElement | undefined;

	onMount(() => {
		if (!contentEl) return;
		contentEl.querySelectorAll<HTMLElement>('.content-block').forEach((block, index) => {
			reveal(block, { delay: index * 80, y: 16 });
		});
	});
</script>

<div class="page-container">
	<header class="mb-10" use:reveal>
		<a href="/" class="back-link">
			<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
			</svg>
			Retour à l'accueil
		</a>
		<h1 class="mt-6 font-display text-3xl font-black uppercase tracking-wider text-white md:text-5xl">
			{title}
		</h1>
		{#if subtitle}
			<p class="mt-3 max-w-3xl text-base text-zinc-400 md:text-lg">{subtitle}</p>
		{/if}
	</header>

	<div class="space-y-6" bind:this={contentEl}>
		{@render children()}
	</div>
</div>
