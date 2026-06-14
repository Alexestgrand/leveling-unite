<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import NavGrid from '$lib/components/NavGrid.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { EVENT } from '$lib/data/mock';
</script>

<Hero />

<main class="page-container space-y-20 md:space-y-28">
	<section class="relative">
		<Timeline />
	</section>

	<section class="relative border-t border-leveling-blue/10 pt-20 md:pt-28">
		<NavGrid />
	</section>

	<footer class="border-t border-leveling-blue/10 pt-12 text-center" use:reveal>
		<p class="font-display text-xs uppercase tracking-[0.3em] text-zinc-600">
			{EVENT.title} — {EVENT.subtitle}
		</p>
		<p class="mt-2 text-sm text-zinc-500">{EVENT.tagline}</p>
	</footer>
</main>
