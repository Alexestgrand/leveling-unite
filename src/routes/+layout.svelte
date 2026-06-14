<script lang="ts">
	import '../app.css';
	import BackgroundBubbles from '$lib/components/BackgroundBubbles.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Leveling: Unite – The Fragments</title>
	<meta
		name="description"
		content="Tableau de bord officiel de l'événement communautaire Leveling: Unite – The Fragments."
	/>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Metal+Mania&family=Orbitron:wght@700;900&family=Rajdhani:wght@400;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="relative min-h-screen bg-zinc-950 text-zinc-100 antialiased">
	<BackgroundBubbles />
	<div class="relative z-10">
		{@render children()}
	</div>
</div>
