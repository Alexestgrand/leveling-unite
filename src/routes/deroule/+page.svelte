<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import { PHASES, CURRENT_PHASE_INDEX, CADRAN_CREUX } from '$lib/data/mock';
</script>

<PageShell
	sectionLabel="Déroulement"
	title="Déroulé"
	subtitle="Quatre vagues — du 25 juillet au 27 août. Soumission rouverte 48 h."
>
	<div class="relative space-y-0">
		{#each PHASES as phase, index (phase.id)}
			{@const isActive = !CADRAN_CREUX.resolved && index === CURRENT_PHASE_INDEX}
			{@const isPast = CADRAN_CREUX.resolved || index < CURRENT_PHASE_INDEX}
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

	<div class="content-block hud-panel clip-corners glow-border mt-6 border-leveling-blue/30 glow-neon cadran-deroule-reveal">
		<h3>Révélation — Le Cadran Creux</h3>
		<p class="text-zinc-400">La Vague 4 est close. Le Système a parlé.</p>
		<a href="/creux#cadran-revelation" class="mt-4 inline-block text-sm font-semibold text-red-300 underline underline-offset-2">
			Lire la révélation complète →
		</a>
	</div>
</PageShell>
