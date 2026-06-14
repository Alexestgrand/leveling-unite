<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import { RULES, PARTICIPATION_CRITERIA, INACTIVITY_RULES, SANCTIONS } from '$lib/data/mock';
</script>

<PageShell
	title="Règles"
	subtitle="L'événement repose sur la confiance et le fair-play. Chaque participant est responsable du bon déroulement de l'enquête collective."
>
	<div class="content-block">
		<h3>Règles générales</h3>
		<ul>
			{#each RULES as rule}
				<li>{rule}</li>
			{/each}
		</ul>
	</div>

	<div class="content-block">
		<h3>Conditions de participation — Fragmentés</h3>
		<ul>
			{#each PARTICIPATION_CRITERIA as criterion}
				<li>{criterion}</li>
			{/each}
		</ul>
	</div>

	<div class="content-block">
		<h3>Gestion de l'inactivité</h3>
		<p class="text-zinc-400">
			Un participant Fragmenté peut être remplacé si l'une des conditions suivantes est remplie :
		</p>
		<ul>
			{#each INACTIVITY_RULES as rule}
				<li>{rule}</li>
			{/each}
		</ul>
	</div>

	{#each SANCTIONS as sanction}
		<div class="content-block">
			<h3>{sanction.title}</h3>
			<ul>
				{#each sanction.items as item}
					<li>{item}</li>
				{/each}
			</ul>
		</div>
	{/each}
</PageShell>
