<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import { EVENT, PHASES, FINAL_REVEAL } from '$lib/data/mock';
</script>

<PageShell
	title="Déroulé"
	subtitle="L'événement se déroule sur {EVENT.duration}. Quatre phases progressivement révèlent les fragments jusqu'à la résolution finale."
>
	<div class="relative space-y-0">
		{#each PHASES as phase, index (phase.id)}
			<div class="relative flex gap-6 pb-10 last:pb-0">
				{#if index < PHASES.length - 1}
					<div
						class="absolute left-[23px] top-12 h-[calc(100%-2rem)] w-0.5 bg-gradient-to-b from-leveling-blue/50 to-leveling-blue/10"
						aria-hidden="true"
					></div>
				{/if}

				<div
					class="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-leveling-blue bg-zinc-950 font-display text-sm font-bold text-leveling-blue-light glow-neon"
				>
					{index + 1}
				</div>

				<div class="content-block flex-1">
					<div class="mb-2 flex flex-wrap items-center gap-3">
						<h3>{phase.name}</h3>
						<span
							class="rounded border border-leveling-blue/30 bg-leveling-blue/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-leveling-blue-light"
						>
							{phase.share} des fragments
						</span>
					</div>
					<p>{phase.description}</p>
				</div>
			</div>
		{/each}
	</div>

	<div class="content-block mt-6 border-leveling-blue/30 glow-neon">
		<h3>Révélation finale</h3>
		<p class="text-zinc-400">
			La résolution de l'énigme doit constituer un véritable moment fort pour toute la communauté.
		</p>
		<ul class="mt-4">
			{#each FINAL_REVEAL as item}
				<li>{item}</li>
			{/each}
		</ul>
	</div>
</PageShell>
