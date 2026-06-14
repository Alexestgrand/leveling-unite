<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import NavGrid from '$lib/components/NavGrid.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { EVENT } from '$lib/data/mock';
</script>

<Hero />

<main class="page-container space-y-12 sm:space-y-20 md:space-y-28">
	<section class="relative">
		<Timeline />
	</section>

	<section class="relative border-t border-leveling-blue/10 pt-12 sm:pt-20 md:pt-28">
		<NavGrid />
	</section>

	<footer class="border-t border-leveling-blue/10 pb-6 pt-8 text-center sm:pt-12" use:reveal>
		<p class="font-display text-[0.65rem] uppercase tracking-[0.15em] text-zinc-600 sm:text-xs sm:tracking-[0.3em]">
			{EVENT.title} — {EVENT.subtitle}
		</p>
		<p class="mx-auto mt-2 max-w-md px-2 text-sm leading-relaxed text-zinc-500">{EVENT.tagline}</p>
	</footer>
</main>
