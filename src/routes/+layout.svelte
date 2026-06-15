<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import AmbientBackground from '$lib/components/AmbientBackground.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Leveling: Unite – The Fragments</title>
	<meta
		name="description"
		content="Tableau de bord officiel de l'événement communautaire Leveling: Unite – The Fragments."
	/>
	<meta name="theme-color" content="#080a10" />
	<link rel="icon" href="/favicon.ico" sizes="48x48" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Orbitron:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="app-shell relative min-h-screen overflow-x-hidden text-zinc-100 antialiased">
	<AmbientBackground />
	<SiteHeader />
	<div class="relative z-10">
		{#key $page.url.pathname}
			<div class="page-enter">
				{@render children()}
			</div>
		{/key}
	</div>
</div>
