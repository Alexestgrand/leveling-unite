<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import AmbientBackground from '$lib/components/AmbientBackground.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import TourGuide from '$lib/components/TourGuide.svelte';
	import OmenPopup from '$lib/components/OmenPopup.svelte';

	let { children } = $props();

	const siteUrl = 'https://leveling-unite.vercel.app';
	const ogTitle = 'LEVELING: Unite – The Fragments';
	const ogDescription =
		'Quinze mots. Deux camps. Énigmes publiques, phrase secrète — tableau de bord officiel de l’événement LEVELING: Unite.';
	const ogImage = `${siteUrl}/og-image.png`;
</script>

<svelte:head>
	<title>{ogTitle}</title>
	<meta name="description" content={ogDescription} />
	<meta name="theme-color" content="#080a10" />
	<link rel="canonical" href={siteUrl} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="LEVELING: Unite" />
	<meta property="og:title" content={ogTitle} />
	<meta property="og:description" content={ogDescription} />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:locale" content="fr_FR" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={ogTitle} />
	<meta name="twitter:description" content={ogDescription} />
	<meta name="twitter:image" content={ogImage} />

	<link rel="icon" href="/favicon.ico" sizes="48x48" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Metal+Mania&family=Orbitron:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<a href="#main-content" class="skip-link">Aller au contenu</a>

<div class="app-shell relative min-h-screen overflow-x-hidden text-zinc-100 antialiased">
	<AmbientBackground />
	<SiteHeader />
	<div id="main-content" class="relative z-10" tabindex="-1">
		{#key $page.url.pathname}
			<div class="page-enter">
				{@render children()}
			</div>
		{/key}
	</div>
	<TourGuide />
	<OmenPopup />
</div>
