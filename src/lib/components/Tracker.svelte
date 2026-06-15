<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { TIKTOK_TRACKER, TIKTOK_ACCOUNT } from '$lib/data/mock';
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

	<div class="mb-6 flex flex-wrap items-center gap-3">
		{#each hashtags as tag}
			<span class="tracker__hashtag">{tag}</span>
		{/each}
	</div>

	<a
		href={TIKTOK_ACCOUNT.url}
		target="_blank"
		rel="noopener noreferrer"
		class="tracker__account clip-corner-sm"
	>
		<svg class="tracker__account-icon size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
			<path
				d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"
			/>
		</svg>
		<span>
			<span class="tracker__account-label">{TIKTOK_ACCOUNT.label}</span>
			<span class="tracker__account-handle">{TIKTOK_ACCOUNT.handle}</span>
		</span>
		<svg class="size-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
		</svg>
	</a>

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
