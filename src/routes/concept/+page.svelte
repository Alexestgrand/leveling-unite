<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import { CAMPS, ROLES } from '$lib/data/mock';
</script>

<PageShell
	sectionLabel="Univers"
	title="Concept & Rôles"
	subtitle="Une phrase secrète fragmentée, deux camps, et une communauté entière mobilisée pour la reconstituer."
>
	<div class="content-block hud-panel clip-corners glow-border">
		<h3>Le concept</h3>
		<p>
			Une phrase secrète est fragmentée en plusieurs parties, distribuées progressivement à des
			participants sélectionnés. Aucun participant ne possède suffisamment d'informations pour
			résoudre l'énigme seul — la résolution nécessite des échanges, des théories, de la coopération,
			des vérifications et de la logique.
		</p>
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
</PageShell>
