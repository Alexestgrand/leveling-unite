<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import {
		CLUES,
		PHASES,
		CURRENT_PHASE_INDEX,
		TIKTOK_TRACKER,
		ANNOUNCEMENTS
	} from '$lib/data/mock';
	import { formatViews, milestonePercent } from '$lib/utils/format';

	const unlockedCount = CLUES.filter((c) => c.unlocked).length;
	const latestClue = [...CLUES].reverse().find((c) => c.unlocked);
	const currentPhase = PHASES[CURRENT_PHASE_INDEX];
	const tiktokProgress = milestonePercent(TIKTOK_TRACKER.currentViews, TIKTOK_TRACKER.goal);
	const fragmentsProgress = (unlockedCount / CLUES.length) * 100;
	const phaseProgress = ((CURRENT_PHASE_INDEX + 1) / PHASES.length) * 100;

	const stats = [
		{
			label: 'Phase active',
			value: currentPhase.name,
			sub: `${currentPhase.share} des fragments distribués`,
			progress: phaseProgress,
			href: '/deroule',
			link: 'Voir le déroulé'
		},
		{
			label: 'Fragments',
			value: `${unlockedCount} / ${CLUES.length}`,
			sub: 'indices débloqués',
			progress: fragmentsProgress,
			href: '/indices',
			link: 'Explorer les indices'
		},
		{
			label: 'Objectif TikTok',
			value: formatViews(TIKTOK_TRACKER.currentViews),
			sub: `sur ${formatViews(TIKTOK_TRACKER.goal)} vues`,
			progress: tiktokProgress,
			href: '/objectif-tiktok',
			link: 'Suivre la progression'
		},
		{
			label: 'Transmissions',
			value: String(ANNOUNCEMENTS.length),
			sub: 'annonces du staff',
			progress: Math.min((ANNOUNCEMENTS.length / 8) * 100, 100),
			href: '#journal',
			link: 'Lire le journal'
		}
	];
</script>

<section class="investigation-dashboard" use:reveal id="statut">
	<SectionIntro
		eyebrow="Vue d'ensemble"
		title="Où en est l'enquête ?"
		description="En un coup d'œil : la phase en cours, les fragments trouvés, l'objectif TikTok et les dernières annonces. Cliquez sur une carte pour approfondir."
		href="/concept"
		linkLabel="Comprendre le concept"
	/>

	<div class="stat-grid">
		{#each stats as stat, index}
			<a href={stat.href} class="stat-card stat-card--link" use:reveal={{ delay: index * 70 }}>
				<div class="stat-card__top">
					<p class="stat-card__label">{stat.label}</p>
					<svg class="stat-card__arrow size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
					</svg>
				</div>
				<p class="stat-card__value">{stat.value}</p>
				<p class="stat-card__sub">{stat.sub}</p>
				<div class="stat-card__bar" role="presentation">
					<div class="stat-card__fill" style="width: {stat.progress}%"></div>
				</div>
				<span class="stat-card__link">{stat.link}</span>
			</a>
		{/each}
	</div>

	{#if latestClue}
		<div class="surface-card surface-card--accent latest-clue p-4 sm:p-5 mt-5 sm:mt-6" use:reveal={{ delay: 300 }}>
			<div class="latest-clue__header">
				<span class="latest-clue__badge">Dernier fragment débloqué</span>
				<span class="font-display text-xs font-bold text-leveling-blue-light">{latestClue.label}</span>
			</div>
			<p class="latest-clue__content">{latestClue.content}</p>
			<a href="/indices" class="section-intro__link">
				Voir tous les indices
				<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
				</svg>
			</a>
		</div>
	{/if}
</section>
