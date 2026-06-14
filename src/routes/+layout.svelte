<script lang="ts">
	import '../app.css';
	import BackgroundBubbles from '$lib/components/BackgroundBubbles.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Leveling: Unite – The Fragments</title>
	<meta
		name="description"
		content="Tableau de bord officiel de l'événement communautaire Leveling: Unite – The Fragments."
	/>
	<meta name="theme-color" content="#09090b" />
	<link rel="icon" href="/logo.ico" sizes="any" />
	<link rel="apple-touch-icon" href="/logo.ico" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Metal+Mania&family=Orbitron:wght@700;900&family=Rajdhani:wght@400;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="relative min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-100 antialiased">
	<BackgroundBubbles />
	<div class="relative z-10">
		{@render children()}
	</div>
</div>
