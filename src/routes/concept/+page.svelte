<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import { CAMPS, ROLES } from '$lib/data/mock';
</script>

<PageShell
	title="Concept & Rôles"
	subtitle="Une phrase secrète fragmentée, deux camps, et une communauté entière mobilisée pour la reconstituer."
>
	<div class="content-block">
		<h3>Le concept</h3>
		<p>
			Une phrase secrète est fragmentée en plusieurs parties, distribuées progressivement à des
			participants sélectionnés. Aucun participant ne possède suffisamment d'informations pour
			résoudre l'énigme seul — la résolution nécessite des échanges, des théories, de la coopération,
			des vérifications et de la logique.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		{#each CAMPS as camp}
			<div class="content-block">
				<h3>{camp.name}</h3>
				<p>{camp.description}</p>
			</div>
		{/each}
	</div>

	{#each ROLES as role}
		<div class="content-block">
			<h3>{role.title}</h3>
			<p>{role.description}</p>
			<ul class="mt-4">
				{#each role.items as item}
					<li>{item}</li>
				{/each}
			</ul>
		</div>
	{/each}
</PageShell>
