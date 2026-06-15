<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import InvestigationDashboard from '$lib/components/InvestigationDashboard.svelte';
	import HowToParticipate from '$lib/components/HowToParticipate.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import NavGrid from '$lib/components/NavGrid.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
</script>

<Hero />

<main class="page-container space-y-10 pt-8 sm:space-y-20 sm:pt-14 md:space-y-28">
	<section class="relative">
		<InvestigationDashboard />
	</section>

	<section class="section-divider">
		<Timeline />
	</section>

	<section class="section-divider">
		<HowToParticipate />
	</section>

	<section class="section-divider">
		<NavGrid />
	</section>

	<SiteFooter />
</main>
