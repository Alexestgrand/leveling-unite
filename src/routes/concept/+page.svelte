<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import { CAMPS, ROLES, CONCEPT_INTRO, ORGANIZER_ROLE, ENIGMA_SUMMARY } from '$lib/data/mock';
</script>

<PageShell
	sectionLabel="Univers"
	title="Concept & Rôles"
	subtitle="Une phrase de 15 mots, quatre vagues — Staff Leveling contre Communauté Leveling."
>
	<div class="content-block hud-panel clip-corners glow-border">
		<h3>L'énigme</h3>
		{#each CONCEPT_INTRO as paragraph, index}
			<p class:mt-4={index > 0}>{paragraph}</p>
		{/each}
	</div>

	<div class="content-block hud-panel clip-corners border-leveling-blue/25">
		<h3>En chiffres</h3>
		<ul>
			<li><strong>{ENIGMA_SUMMARY.phraseWords} mots</strong> dans la phrase finale à soumettre sur le site.</li>
			<li>
				<strong>{ENIGMA_SUMMARY.waveCount} vagues</strong> de {ENIGMA_SUMMARY.fragmentsPerWave} énigmes,
				une vague tous les {ENIGMA_SUMMARY.waveDurationDays} jours.
			</li>
			<li>
				<strong>{ENIGMA_SUMMARY.fragmentsPerWave} Fragmentés</strong> désignés par camp à chaque vague.
			</li>
			<li>
				<strong>{ENIGMA_SUMMARY.submitAttempts} soumissions</strong> maximum par
				{ENIGMA_SUMMARY.submitWindowHours} h pour tenter la phrase complète.
			</li>
		</ul>
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
		{#each CAMPS as camp, index}
			<div
				class="camp-card hud-panel clip-corners"
				class:camp-card--members={index === 0}
				class:camp-card--staff={index === 1}
			>
				<span class="camp-card__tag">{index === 0 ? 'Camp A' : 'Camp B'}</span>
				<h3 class="camp-card__title">{camp.name}</h3>
				<p class="camp-card__desc">{camp.description}</p>
			</div>
		{/each}
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
		{#each ROLES as role, index}
			<div class="content-block hud-panel clip-corners role-card">
				<div class="role-card__head">
					<span class="role-card__icon" aria-hidden="true">
						{index === 0 ? '◆' : '◇'}
					</span>
					<h3>{role.title}</h3>
				</div>
				<p>{role.description}</p>
				<ul class="mt-4">
					{#each role.items as item}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<div class="content-block hud-panel clip-corners glow-border border-leveling-blue/30">
		<h3>{ORGANIZER_ROLE.title}</h3>
		<p>{ORGANIZER_ROLE.description}</p>
		<ul class="mt-4">
			{#each ORGANIZER_ROLE.items as item}
				<li>{item}</li>
			{/each}
		</ul>
	</div>
</PageShell>
