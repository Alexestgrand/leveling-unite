<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import CollapseSection from '$lib/components/CollapseSection.svelte';
	import {
		COLLABORATION_RULES,
		CONFIDENTIALITY_RULES,
		RULES,
		PARTICIPATION_CRITERIA,
		INACTIVITY_RULES,
		CHEATING_CASES,
		SANCTIONS
	} from '$lib/data/mock';
</script>

<PageShell
	sectionLabel="Règlement"
	title="Règles"
	subtitle="Leveling: Unite repose sur l'entraide : chacun apporte sa pierre à l'enquête collective, dans le respect du fair-play et de la confidentialité des fragments."
>
	<div class="content-block hud-panel clip-corners glow-border border-leveling-blue/30 glow-neon">
		<h3>Esprit de l'événement</h3>
		<p>
			Le but n'est pas de garder ses informations pour soi, mais de faire avancer tout le camp.
			Les règles protègent les fragments confidentiels tout en obligeant chacun à participer
			activement — sinon l'enquête collective n'a pas de sens.
		</p>
	</div>

	<div class="accordion">
		<CollapseSection title="Entraide et collaboration" open>
			<ul>
				{#each COLLABORATION_RULES as rule}
					<li>{rule}</li>
				{/each}
			</ul>
		</CollapseSection>

		<CollapseSection title="Confidentialité des fragments" open>
			<p class="text-zinc-400">
				Les Fragmentés détiennent des informations privées, mais doivent quand même aider leur camp.
			</p>
			<ul class="mt-4">
				{#each CONFIDENTIALITY_RULES as rule}
					<li>{rule}</li>
				{/each}
			</ul>
		</CollapseSection>

		<CollapseSection title="Cadre général">
			<ul>
				{#each RULES as rule}
					<li>{rule}</li>
				{/each}
			</ul>
		</CollapseSection>

		<CollapseSection title="Conditions de participation — Fragmentés">
			<ul>
				{#each PARTICIPATION_CRITERIA as criterion}
					<li>{criterion}</li>
				{/each}
			</ul>
		</CollapseSection>

		<CollapseSection title="Gestion de l'inactivité">
			<p class="text-zinc-400">
				Un Fragmenté qui ne participe plus freine tout son camp. Il peut être remplacé si l'une des
				conditions suivantes est remplie :
			</p>
			<ul class="mt-4">
				{#each INACTIVITY_RULES as rule}
					<li>{rule}</li>
				{/each}
			</ul>
		</CollapseSection>

		<CollapseSection title="Cas de triche">
			<p class="text-zinc-400">
				La triche, c'est contourner l'entraide collective pour prendre un avantage déloyal.
			</p>
			<ul class="mt-4 space-y-4">
				{#each CHEATING_CASES as cheatingCase}
					<li>
						<span class="font-semibold text-leveling-blue-light">{cheatingCase.title}</span>
						<span class="mt-1 block text-zinc-400">{cheatingCase.description}</span>
					</li>
				{/each}
			</ul>
		</CollapseSection>

		{#each SANCTIONS as sanction}
			<CollapseSection title={sanction.title}>
				<ul>
					{#each sanction.items as item}
						<li>{item}</li>
					{/each}
				</ul>
			</CollapseSection>
		{/each}
	</div>
</PageShell>
