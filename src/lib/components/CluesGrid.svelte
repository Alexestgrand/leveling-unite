<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { CLUES } from '$lib/data/mock';

	const unlockedCount = CLUES.filter((c) => c.unlocked).length;
</script>

<section class="card-glass px-4 py-8 sm:px-6 sm:py-10 md:px-8" use:reveal>
	<header class="mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-8 sm:gap-4">
		<div>
			<p class="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-leveling-blue-light/70">
				Fragments du système
			</p>
			<h2 class="section-title">Indices débloqués</h2>
		</div>
		<p class="font-display text-sm font-semibold tabular-nums text-leveling-blue md:text-base">
			{unlockedCount} / {CLUES.length}
		</p>
	</header>

	<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
		{#each CLUES as clue, index (clue.id)}
			<article
				class="relative overflow-hidden rounded-xl border p-4 transition-all duration-500 sm:p-5 md:p-6 {clue.unlocked
					? 'border-leveling-blue/30 bg-leveling-blue/5 glow-neon'
					: 'border-zinc-800 bg-zinc-900/40'}"
				use:reveal={{ delay: index * 60 }}
			>
				{#if !clue.unlocked}
					<div
						class="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-zinc-950/60 backdrop-blur-sm"
						aria-hidden="true"
					>
						<svg
							class="size-8 text-zinc-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
							/>
						</svg>
						<span class="text-xs font-bold uppercase tracking-widest text-zinc-500">Verrouillé</span>
					</div>
				{/if}

				<div class:blur-sm={!clue.unlocked} class:select-none={!clue.unlocked}>
					<h3
						class="font-display text-sm font-bold uppercase tracking-wider md:text-base"
						class:text-leveling-blue-light={clue.unlocked}
						class:text-zinc-500={!clue.unlocked}
					>
						{clue.label}
					</h3>
					<p
						class="mt-3 text-sm leading-relaxed md:text-base"
						class:text-zinc-300={clue.unlocked}
						class:text-zinc-600={!clue.unlocked}
					>
						{clue.content}
					</p>
				</div>
			</article>
		{/each}
	</div>
</section>
