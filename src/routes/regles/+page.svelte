<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import CollapseSection from '$lib/components/CollapseSection.svelte';
	import {
		COLLABORATION_RULES,
		CONFIDENTIALITY_RULES,
		RULES,
		PARTICIPATION_CRITERIA,
		INACTIVITY_RULES,
		SUBMISSION_RULES,
		VOTE_RULES,
		CHEATING_CASES,
		SANCTIONS
	} from '$lib/data/mock';
</script>

<PageShell
	sectionLabel="Règlement"
	title="Règles"
	subtitle="Staff Leveling vs Communauté Leveling : entraide, confidentialité des fragments, soumission sur le site et votes collectifs."
>
	<div class="content-block hud-panel clip-corners glow-border border-leveling-blue/30 glow-neon">
		<h3>Esprit de l'événement</h3>
		<p>
			Le but est de faire avancer tout le camp. Les Fragmentés portent les énigmes ; les Enquêteurs
			assemblent la phrase. L'organisateur est neutre et ne joue dans aucun camp. Personne ne peut
			gagner seul.
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
				Les Fragmentés sont publics ; leurs mots restent confidentiels. Ils relaient des indices
				indirects à leur camp.
			</p>
			<ul class="mt-4">
				{#each CONFIDENTIALITY_RULES as rule}
					<li>{rule}</li>
				{/each}
			</ul>
		</CollapseSection>

		<CollapseSection title="Soumission de la phrase">
			<ul>
				{#each SUBMISSION_RULES as rule}
					<li>{rule}</li>
				{/each}
			</ul>
		</CollapseSection>

		<CollapseSection title="Votes — Top Fragmenté & Top Enquêteur">
			<p class="text-zinc-400">
				En cas de victoire de la Communauté, le camp vote pour récompenser les meilleurs
				contributeurs. L'organisateur propose les candidats sur chaque shortlist.
			</p>
			<ul class="mt-4">
				{#each VOTE_RULES as rule}
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

		<CollapseSection title="Conditions — Fragmentés">
			<ul>
				{#each PARTICIPATION_CRITERIA as criterion}
					<li>{criterion}</li>
				{/each}
			</ul>
		</CollapseSection>

		<CollapseSection title="Gestion de l'inactivité">
			<p class="text-zinc-400">
				Un Fragmenté inactif freine son camp. Il peut être remplacé si l'une des conditions
				suivantes est remplie :
			</p>
			<ul class="mt-4">
				{#each INACTIVITY_RULES as rule}
					<li>{rule}</li>
				{/each}
			</ul>
		</CollapseSection>

		<CollapseSection title="Cas de triche et fuites">
			<p class="text-zinc-400">
				La triche, c'est contourner l'entraide collective ou exposer un fragment en clair.
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
