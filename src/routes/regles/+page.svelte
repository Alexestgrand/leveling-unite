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
		SANCTIONS,
		CADRAN_CREUX,
		CREUX_RESOLUTION,
		CREUX_CAMP_LABEL,
		ACTIVE_CREUX_RULE,
		SURCIS_RULE_DETAILS,
		SURCIS_WAVE_STATUS,
		EVENT_VIGILANCE
	} from '$lib/data/mock';
</script>

<PageShell
	sectionLabel="Règlement"
	title="Règles"
	subtitle="Ce qui est permis, ce qui se paie."
	contextLine="Les règles en clair. Lis avant de jouer."
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
		{#if CADRAN_CREUX.resolved}
			<CollapseSection title="Vague 4 — Le Cadran Creux (résolu)" open id="cadran-creux">
				<p class="text-zinc-400">
					Énigme close le <strong class="text-zinc-200">{CADRAN_CREUX.resolvedLabel}</strong>.
					Réponse : <strong class="text-red-300">{CADRAN_CREUX.answer}</strong>.
				</p>
				<p class="mt-4 text-zinc-300">
					Soumission prolongée jusqu’au <strong>{CADRAN_CREUX.submitDeadlineLabel}</strong>.
				</p>
				<p class="mt-2 text-sm text-zinc-400">
					<a href="/creux#cadran-revelation" class="text-red-300 underline">Lire la révélation complète →</a>
				</p>
			</CollapseSection>
		{/if}

		{#if CREUX_RESOLUTION.resolved}
			<CollapseSection title="Édit du Creux — règle active" open id="edit-du-creux">
				<div class="edit-du-creux">
					<p class="edit-du-creux__badge">Issu de l'énigme du creux · {CREUX_RESOLUTION.resolvedLabel}</p>
					<h3 class="edit-du-creux__title">{ACTIVE_CREUX_RULE.title}</h3>
					<p class="edit-du-creux__lead">
						Imposé par <strong>{CREUX_CAMP_LABEL[CREUX_RESOLUTION.winnerCamp]}</strong> après
						résolution de la transmission. S'applique aux deux camps jusqu'à la fin de l'événement
						— sauf au Cadran Creux (Vague 4), où le Sursis est suspendu.
					</p>
					<p class="text-zinc-300">{ACTIVE_CREUX_RULE.description}</p>
					<ul class="mt-4">
						{#each SURCIS_RULE_DETAILS as line}
							<li>{line}</li>
						{/each}
					</ul>
					<div class="edit-du-creux__waves mt-6">
						<p class="edit-du-creux__waves-title">Statut du Sursis par vague et par camp</p>
						<ul class="edit-du-creux__wave-list">
							{#each Object.entries(SURCIS_WAVE_STATUS) as [wave, info]}
								<li class="edit-du-creux__wave-block">
									<p class="edit-du-creux__wave-num">Vague {wave}</p>
									{#if info.note}
										<p class="edit-du-creux__wave-note">{info.note}</p>
									{/if}
									<ul class="edit-du-creux__camp-list">
										{#each (['communaute', 'staff'] as const) as camp}
											{@const slot = info[camp]}
											<li class="edit-du-creux__camp-item edit-du-creux__camp-item--{slot.status}">
												<span>{CREUX_CAMP_LABEL[camp]}</span>
												<span>
													{#if slot.status === 'available'}
														Disponible — 1 invocation
													{:else if slot.status === 'consumed'}
														Consommé{slot.usedBy ? ` (${slot.usedBy})` : ''}
													{:else if slot.status === 'unavailable'}
														Ne s’applique pas
													{:else}
														Expiré
													{/if}
												</span>
											</li>
										{/each}
									</ul>
								</li>
							{/each}
						</ul>
					</div>
					<aside class="edit-du-creux__vigilance" role="note">
						<p class="edit-du-creux__vigilance-title">{EVENT_VIGILANCE.title}</p>
						<p>{EVENT_VIGILANCE.body}</p>
						<p class="edit-du-creux__vigilance-ps"><strong>P.S.</strong> {EVENT_VIGILANCE.ps}</p>
					</aside>
				</div>
			</CollapseSection>
		{/if}

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
