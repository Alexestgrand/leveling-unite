<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
</script>

<section class="player-paths" use:reveal aria-label="Parcours">
	<a href="/fragmentes" class="player-path player-path--play surface-card">
		<p class="player-path__eyebrow">Jouer</p>
		<h2 class="player-path__title">Aider les Fragmentés</h2>
		<p class="player-path__desc">
			Énigmes publiques, un mot à sécuriser. C’est le cœur de l’enquête.
		</p>
		<span class="player-path__cta">
			Ouvrir les quêtes
			<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
			</svg>
		</span>
	</a>

	<a href="/concept" class="player-path player-path--discover surface-card">
		<p class="player-path__eyebrow">Découvrir</p>
		<h2 class="player-path__title">Comprendre le système</h2>
		<p class="player-path__desc">
			Camps, phrase secrète, règles — avant de plonger dans les quêtes.
		</p>
		<span class="player-path__cta">
			Voir le concept
			<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
			</svg>
		</span>
	</a>
</section>
