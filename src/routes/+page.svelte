<script lang="ts">
	import { onMount } from 'svelte';
	import Hero from '$lib/components/Hero.svelte';
	import CadranClosureBanner from '$lib/components/CadranClosureBanner.svelte';
	import StartHere from '$lib/components/StartHere.svelte';
	import PhraseTracker from '$lib/components/PhraseTracker.svelte';
	import HowToParticipate from '$lib/components/HowToParticipate.svelte';
	import InvestigationDashboard from '$lib/components/InvestigationDashboard.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import NavGrid from '$lib/components/NavGrid.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import { CADRAN_CREUX } from '$lib/data/mock';
	import { tour } from '$lib/tour/tour.svelte';

	onMount(() => {
		tour.initPrompt();
	});
</script>

<Hero />

<main class="page-container space-y-10 pt-8 sm:space-y-16 sm:pt-12 md:space-y-20">
	{#if CADRAN_CREUX.resolved}
		<CadranClosureBanner />
	{/if}

	<StartHere />

	<PhraseTracker boardTitle="La phrase — 15 mots à trouver" />

	<section class="go-deeper section-divider space-y-10 sm:space-y-16 md:space-y-20" aria-labelledby="go-deeper-heading">
		<header class="go-deeper__head">
			<p class="section-eyebrow">
				<span class="section-eyebrow__dot" aria-hidden="true"></span>
				Suite
			</p>
			<h2 id="go-deeper-heading" class="go-deeper__title">Aller plus loin</h2>
			<p class="go-deeper__desc">Journal, stats et liens utiles pour l'enquête.</p>
		</header>

		<HowToParticipate />
		<InvestigationDashboard />
		<Timeline limit={3} />
		<NavGrid />
	</section>

	<SiteFooter />
</main>
