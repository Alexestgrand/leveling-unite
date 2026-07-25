<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import PlayerPaths from '$lib/components/PlayerPaths.svelte';
	import PhraseTracker from '$lib/components/PhraseTracker.svelte';
	import HowToParticipate from '$lib/components/HowToParticipate.svelte';
	import InvestigationDashboard from '$lib/components/InvestigationDashboard.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import NavGrid from '$lib/components/NavGrid.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
</script>

<Hero />

<main class="page-container space-y-10 pt-8 sm:space-y-16 sm:pt-12 md:space-y-20">
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
