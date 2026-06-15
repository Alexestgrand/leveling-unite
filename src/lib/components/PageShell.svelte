<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { reveal } from '$lib/actions/reveal';

	interface Props {
		title: string;
		subtitle?: string;
		sectionLabel?: string;
		children: Snippet;
	}

	let { title, subtitle, sectionLabel, children }: Props = $props();

	let contentEl: HTMLDivElement | undefined;

	onMount(() => {
		if (!contentEl) return;
		contentEl.querySelectorAll<HTMLElement>('.content-block, .surface-card, .hud-panel').forEach((block, index) => {
			reveal(block, { delay: index * 80, y: 16 });
		});
	});
</script>

<div class="page-shell page-container">
	<header class="page-shell__header mb-8 sm:mb-10" use:reveal>
		{#if sectionLabel}
			<p class="section-eyebrow">
				<span class="section-eyebrow__dot" aria-hidden="true"></span>
				{sectionLabel}
			</p>
		{/if}

		<a href="/" class="back-link">
			<svg class="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
			</svg>
			Retour à l'accueil
		</a>
		<h1 class="mt-5 text-2xl font-bold tracking-tight text-white sm:mt-6 sm:text-3xl md:text-4xl">
			{title}
		</h1>
		{#if subtitle}
			<p class="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:mt-3 sm:text-base">{subtitle}</p>
		{/if}
	</header>

	<div class="page-shell__content space-y-4 sm:space-y-6" bind:this={contentEl}>
		{@render children()}
	</div>
</div>
