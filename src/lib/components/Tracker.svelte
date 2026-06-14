<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { TIKTOK_TRACKER } from '$lib/data/mock';
	import { formatViews, milestonePercent } from '$lib/utils/format';

	const { currentViews, goal, milestones, hashtags } = TIKTOK_TRACKER;
	const progress = milestonePercent(currentViews, goal);

	function isReached(views: number): boolean {
		return currentViews >= views;
	}
</script>

<section class="card-glass px-4 py-8 sm:px-6 sm:py-10 md:px-8" use:reveal>
	<div class="mb-6 flex flex-wrap gap-2 sm:mb-8">
		{#each hashtags as tag}
			<span
				class="rounded-full border border-leveling-blue/30 bg-leveling-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-leveling-blue-light transition-transform duration-300 hover:scale-105 active:scale-95"
			>
				{tag}
			</span>
		{/each}
	</div>

	<div class="mb-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
		<div>
			<p class="font-display text-2xl font-bold tabular-nums text-leveling-blue sm:text-3xl md:text-4xl">
				{formatViews(currentViews)}
			</p>
			<p class="text-xs uppercase tracking-wider text-zinc-500">vues cumulées</p>
		</div>
		<div class="sm:text-right">
			<p class="font-display text-lg font-semibold tabular-nums text-zinc-400 md:text-xl">
				{formatViews(goal)}
			</p>
			<p class="text-xs uppercase tracking-wider text-zinc-500">objectif final</p>
		</div>
	</div>

	<div class="relative mt-8 pb-8">
		<div class="h-3 overflow-hidden rounded-full bg-zinc-800/80">
			<div
				class="h-full rounded-full bg-linear-to-r from-leveling-blue-dark via-leveling-blue to-leveling-blue-light transition-all duration-700 ease-out"
				class:glow-neon={progress > 0}
				style="width: {progress}%"
				role="progressbar"
				aria-valuenow={currentViews}
				aria-valuemin={0}
				aria-valuemax={goal}
				aria-label="Progression des vues TikTok"
			></div>
		</div>

		<div class="pointer-events-none absolute inset-x-0 top-0 h-3">
			{#each milestones as milestone}
				{@const percent = milestonePercent(milestone.views, goal)}
				{@const reached = isReached(milestone.views)}
				<div
					class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500"
					class:scale-125={reached}
					style="left: {percent}%"
				>
					<div
						class="size-3 rounded-full border-2 bg-zinc-950 transition-all duration-500"
						class:border-leveling-blue={reached}
						class:glow-neon-strong={reached}
						class:border-zinc-600={!reached}
					></div>
				</div>
			{/each}
		</div>
	</div>

	<div class="mt-8 space-y-3">
		{#each milestones as milestone, index}
			{@const reached = isReached(milestone.views)}
			<div
				class="flex gap-4 rounded-xl border p-4 transition-all duration-500 md:p-5 {reached
					? 'border-leveling-blue/40 bg-leveling-blue/5 glow-neon'
					: 'border-zinc-800 bg-zinc-900/30'}"
				use:reveal={{ delay: index * 70 }}
			>
				<div
					class="flex size-10 shrink-0 items-center justify-center rounded-lg border font-display text-xs font-bold transition-transform duration-300 md:text-sm"
					class:border-leveling-blue={reached}
					class:text-leveling-blue-light={reached}
					class:border-zinc-700={!reached}
					class:text-zinc-600={!reached}
				>
					{reached ? '✓' : '○'}
				</div>
				<div>
					<div class="flex flex-wrap items-center gap-2">
						<p
							class="font-display text-sm font-bold uppercase tracking-wider md:text-base"
							class:text-leveling-blue-light={reached}
							class:text-zinc-400={!reached}
						>
							{formatViews(milestone.views)} — {milestone.label}
						</p>
					</div>
					<p class="mt-1 text-sm text-zinc-500">{milestone.description}</p>
				</div>
			</div>
		{/each}
	</div>

	<p class="mt-8 text-center text-xs text-zinc-600 md:text-sm">
		{progress.toFixed(1)}% de l'objectif atteint — continuez à partager pour débloquer les indices.
	</p>
</section>
