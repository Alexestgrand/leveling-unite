<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { CLUES } from '$lib/data/mock';

	const unlockedCount = CLUES.filter((c) => c.unlocked).length;
	const progress = (unlockedCount / CLUES.length) * 100;
</script>

<section class="clues-vault surface-card p-4 sm:p-6 md:p-8" use:reveal>
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

	<div class="clues-vault__progress" role="progressbar" aria-valuenow={unlockedCount} aria-valuemin={0} aria-valuemax={CLUES.length} aria-label="Progression des fragments">
		<div class="clues-vault__progress-fill" style="width: {progress}%"></div>
	</div>

	<div class="clues-vault__grid">
		{#each CLUES as clue, index (clue.id)}
			<article
				class="clue-file"
				class:clue-file--unlocked={clue.unlocked}
				class:clue-file--locked={!clue.unlocked}
				use:reveal={{ delay: index * 60 }}
			>
				<div class="clue-file__header">
					<span class="clue-file__id">FRG-{String(index + 1).padStart(2, '0')}</span>
					{#if clue.unlocked}
						<span class="clue-file__status clue-file__status--open">Débloqué</span>
					{:else}
						<span class="clue-file__status clue-file__status--locked">Scellé</span>
					{/if}
				</div>

				{#if !clue.unlocked}
					<div class="clue-file__lock" aria-hidden="true">
						<svg class="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
							/>
						</svg>
					</div>
				{/if}

				<div class:blur-sm={!clue.unlocked} class:select-none={!clue.unlocked}>
					<h3 class="clue-file__title">{clue.label}</h3>
					<p class="clue-file__content">{clue.content}</p>
				</div>

				<div class="clue-file__corners" aria-hidden="true">
					<span></span><span></span><span></span><span></span>
				</div>
			</article>
		{/each}
	</div>
</section>
