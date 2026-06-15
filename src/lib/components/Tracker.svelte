<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { TIKTOK_TRACKER } from '$lib/data/mock';
	import { formatViews, milestonePercent } from '$lib/utils/format';

	const { currentViews, goal, milestones, hashtags } = TIKTOK_TRACKER;
	const progress = milestonePercent(currentViews, goal);
	const reachedCount = milestones.filter((m) => currentViews >= m.views).length;

	function isReached(views: number): boolean {
		return currentViews >= views;
	}
</script>

<section class="tracker surface-card p-4 sm:p-6 md:p-8" use:reveal>
	<div class="tracker__header">
		<div>
			<p class="tracker__eyebrow">Objectif communautaire</p>
			<p class="tracker__headline">
				<span class="tracker__current">{formatViews(currentViews)}</span>
				<span class="tracker__sep">/</span>
				<span class="tracker__goal">{formatViews(goal)}</span>
			</p>
			<p class="tracker__sub">vues cumulées via TikTok</p>
		</div>
		<div class="tracker__percent">
			<span class="tracker__percent-value">{progress.toFixed(1)}%</span>
			<span class="tracker__percent-label">atteint</span>
		</div>
	</div>

	<div class="mb-6 flex flex-wrap gap-2">
		{#each hashtags as tag}
			<span class="tracker__hashtag">{tag}</span>
		{/each}
	</div>

	<div class="tracker__bar-wrap">
		<div
			class="tracker__bar"
			role="progressbar"
			aria-valuenow={currentViews}
			aria-valuemin={0}
			aria-valuemax={goal}
			aria-label="Progression des vues TikTok"
		>
			<div class="tracker__bar-fill glow-neon" style="width: {progress}%"></div>
			<span class="tracker__bar-label">{progress.toFixed(1)}%</span>
		</div>

		<div class="tracker__markers">
			{#each milestones as milestone}
				{@const percent = milestonePercent(milestone.views, goal)}
				{@const reached = isReached(milestone.views)}
				<div class="tracker__marker" style="left: {percent}%">
					<div
						class="tracker__marker-dot"
						class:tracker__marker-dot--reached={reached}
					></div>
					<span class="tracker__marker-views">{formatViews(milestone.views)}</span>
				</div>
			{/each}
		</div>
	</div>

	<p class="tracker__stairs-title">
		Paliers débloqués — {reachedCount}/{milestones.length}
	</p>

	<div class="tracker__stairs">
		{#each milestones as milestone, index}
			{@const reached = isReached(milestone.views)}
			<div
				class="tracker__step"
				class:tracker__step--reached={reached}
				style="--step-index: {index}"
				use:reveal={{ delay: index * 70 }}
			>
				<div class="tracker__step-rail" aria-hidden="true">
					<span class="tracker__step-num">{index + 1}</span>
				</div>
				<div class="tracker__step-body">
					<div class="tracker__step-head">
						<p class="tracker__step-label">{milestone.label}</p>
						<span class="tracker__step-views">{formatViews(milestone.views)} vues</span>
					</div>
					<p class="tracker__step-desc">{milestone.description}</p>
					{#if reached}
						<span class="tracker__step-badge">Débloqué</span>
					{:else}
						<span class="tracker__step-badge tracker__step-badge--locked">En attente</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</section>
