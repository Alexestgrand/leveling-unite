<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { reveal } from '$lib/actions/reveal';

	let redirecting = $state(false);

	onMount(() => {
		const timer = setTimeout(() => {
			redirecting = true;
			goto('/soumettre');
		}, 2000);

		return () => clearTimeout(timer);
	});
</script>

<div class="page-container py-16 sm:py-24">
	<div class="surface-card hud-panel clip-corners glow-border glow-neon mx-auto max-w-lg p-8 text-center" use:reveal>
		<p class="section-eyebrow justify-center">
			<span class="section-eyebrow__dot" aria-hidden="true"></span>
			Authentification
		</p>
		<h1 class="mt-4 font-display text-2xl font-bold text-leveling-blue-light sm:text-3xl">
			Connexion réussie
		</h1>
		<p class="mt-4 text-sm leading-relaxed text-zinc-400">
			Vous pouvez soumettre votre phrase reconstituée.
		</p>
		{#if redirecting}
			<p class="mt-3 text-xs text-zinc-500">Redirection…</p>
		{:else}
			<p class="mt-3 text-xs text-zinc-500">Redirection automatique dans 2 secondes…</p>
		{/if}
		<a href="/soumettre" class="btn-pill btn-pill--primary mt-8 inline-flex">Aller à la soumission</a>
	</div>
</div>
