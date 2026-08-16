<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import { PHASES, FINAL_REVEAL, CURRENT_PHASE_INDEX } from '$lib/data/mock';
</script>

<PageShell
	sectionLabel="Déroulement"
	title="Déroulé"
	subtitle="Quatre vagues — du 25 juillet au 20 août. Dernière ligne droite."
>
	<div class="relative space-y-0">
		{#each PHASES as phase, index (phase.id)}
			{@const isActive = index === CURRENT_PHASE_INDEX}
			{@const isPast = index < CURRENT_PHASE_INDEX}
			<div
				class="phase-step relative flex gap-4 pb-10 last:pb-0 sm:gap-6"
				class:phase-step--active={isActive}
				class:phase-step--past={isPast}
			>
				{#if index < PHASES.length - 1}
					<div class="phase-step__line" aria-hidden="true"></div>
				{/if}

				<div class="phase-step__badge">
					{index + 1}
				</div>

				<div class="content-block hud-panel clip-corners flex-1">
					<div class="mb-2 flex flex-wrap items-center gap-3">
						<h3>{phase.name}</h3>
						<span class="phase-step__share">{phase.share}</span>
						{#if isActive}
							<span class="phase-step__status">En cours</span>
						{:else if isPast}
							<span class="phase-step__status phase-step__status--done">Terminée</span>
						{:else}
							<span class="phase-step__status phase-step__status--upcoming">À venir</span>
						{/if}
					</div>
					<p>{phase.description}</p>
				</div>
			</div>
		{/each}
	</div>

	<div class="content-block hud-panel clip-corners glow-border mt-6 border-leveling-blue/30 glow-neon">
		<h3>Révélation finale</h3>
		<p class="text-zinc-400">Quand la phrase tombe, tout se débloque.</p>
		<ul class="mt-4">
			{#each FINAL_REVEAL as item}
				<li>{item}</li>
			{/each}
		</ul>
	</div>
</PageShell>
