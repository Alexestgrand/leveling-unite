<script lang="ts">
	import { onMount } from 'svelte';
	import Hero from '$lib/components/Hero.svelte';
	import PlayerPaths from '$lib/components/PlayerPaths.svelte';
	import PhraseTracker from '$lib/components/PhraseTracker.svelte';
	import HowToParticipate from '$lib/components/HowToParticipate.svelte';
	import InvestigationDashboard from '$lib/components/InvestigationDashboard.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import NavGrid from '$lib/components/NavGrid.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import { tour } from '$lib/tour/tour.svelte';

	onMount(() => {
		tour.initPrompt();
	});
</script>

<Hero />

<main class="page-container space-y-10 pt-8 sm:space-y-16 sm:pt-12 md:space-y-20">
	<section class="tour-launch" aria-label="Guide">
		<button type="button" class="tour-launch__btn" onclick={() => tour.start()}>
			<span class="tour-launch__icon" aria-hidden="true">
				<svg viewBox="0 0 40 56" fill="none" class="tour-launch__stick">
					<circle cx="20" cy="9" r="6" stroke="currentColor" stroke-width="2" />
					<path d="M20 15 V36" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
					<path d="M20 36 L12 50" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
					<path d="M20 36 L28 50" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
					<path d="M20 22 L10 28" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
					<path d="M20 22 L30 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
				</svg>
			</span>
			<span class="tour-launch__copy">
				<span class="tour-launch__label">Comment ça marche ?</span>
				<span class="tour-launch__hint">Un guide en 1 minute — stickman inclus</span>
			</span>
			<span class="tour-launch__cta" aria-hidden="true">▶</span>
		</button>
	</section>

	<section class="relative space-y-5 sm:space-y-6">
		<PlayerPaths />
		<PhraseTracker />
	</section>

	<section class="section-divider">
		<HowToParticipate />
	</section>

	<section class="section-divider">
		<InvestigationDashboard />
	</section>

	<section class="section-divider">
		<Timeline limit={3} />
	</section>

	<section class="section-divider">
		<NavGrid />
	</section>

	<SiteFooter />
</main>
