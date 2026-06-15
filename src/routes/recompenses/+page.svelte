<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import {
		REWARDS,
		MEMBERS_REWARD_TOTAL,
		MEMBERS_REWARD_NAMED,
		MEMBERS_REWARD_GIVEAWAY
	} from '$lib/data/mock';

	const accentStyles = [
		'reward-card--members',
		'reward-card--staff',
		'reward-card--failure'
	];

	const icons = ['trophy', 'shield', 'spark'];
</script>

<PageShell
	sectionLabel="Enjeux"
	title="Récompenses"
	subtitle="Staff Leveling vs Communauté Leveling : voici ce qui est en jeu selon le camp victorieux."
>
	<div class="content-block hud-panel clip-corners glow-border border-leveling-blue/40 glow-neon">
		<h3>Si la Communauté gagne</h3>
		<p class="text-zinc-400">
			Lot total : {MEMBERS_REWARD_TOTAL.hunterPass} Hunter Pass + {MEMBERS_REWARD_TOTAL.nitro} Nitro
			(1 mois chacun). Répartition :
		</p>
		<div class="reward-split mt-5">
			{#each MEMBERS_REWARD_NAMED as reward}
				<div class="reward-split__item">
					<span class="reward-split__count">{reward.nitro}N + {reward.hunterPass}HP</span>
					<span class="reward-split__label">{reward.role}</span>
				</div>
			{/each}
			<div class="reward-split__item">
				<span class="reward-split__count"
					>{MEMBERS_REWARD_GIVEAWAY.nitro}N + {MEMBERS_REWARD_GIVEAWAY.hunterPass}HP</span
				>
				<span class="reward-split__label">Giveaway (actifs)</span>
			</div>
		</div>
		<ul class="mt-5 space-y-3 text-sm text-zinc-400">
			{#each MEMBERS_REWARD_NAMED as reward}
				<li>
					<span class="font-semibold text-leveling-blue-light">{reward.role}</span> —
					{reward.description}
				</li>
			{/each}
		</ul>
	</div>

	<div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
		{#each REWARDS as reward, index (reward.id)}
			<div class="reward-card content-block hud-panel clip-corners {accentStyles[index]}">
				<div class="reward-card__icon" aria-hidden="true">
					{#if icons[index] === 'trophy'}
						<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
							<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.926.52M6.75 4.236c.982.143 1.954.317 2.926.52M18.75 4.236c.982.143 1.954.317 2.926.52M17.25 4.236c-.982.143-1.954.317-2.926.52M12 4.5v3.75m0 0v3.75" />
						</svg>
					{:else if icons[index] === 'shield'}
						<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
						</svg>
					{:else}
						<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
						</svg>
					{/if}
				</div>
				<h3>{reward.title}</h3>
				<ul class="mt-4">
					{#each reward.items as item}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<div class="content-block hud-panel clip-corners">
		<h3>Ce que Leveling: Unite récompense</h3>
		<p>
			L'événement valorise la coopération, l'intelligence collective et l'engagement — pas le niveau
			ni la vitesse individuelle. Le Finder est récompensé automatiquement ; les meilleurs
			Fragmenté et Enquêteur sont choisis par vote du camp parmi une shortlist proposée par
			l'organisateur.
		</p>
		<p class="mt-4 italic text-leveling-blue-light/80">
			« Tu étais là pendant Leveling: Unite ? Quand tout le serveur s'est transformé en gigantesque
			enquête ? »
		</p>
	</div>
</PageShell>
