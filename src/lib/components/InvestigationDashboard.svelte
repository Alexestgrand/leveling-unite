<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import {
		PUBLIC_INDICES,
		PHASES,
		CURRENT_PHASE_INDEX,
		TIKTOK_TRACKER,
		ANNOUNCEMENTS
	} from '$lib/data/mock';
	import { formatViews, milestonePercent } from '$lib/utils/format';

	const latestIndex = PUBLIC_INDICES.length > 0 ? PUBLIC_INDICES[PUBLIC_INDICES.length - 1] : null;
	const currentPhase = CURRENT_PHASE_INDEX >= 0 ? PHASES[CURRENT_PHASE_INDEX] : null;
	const tiktokProgress = milestonePercent(TIKTOK_TRACKER.currentViews, TIKTOK_TRACKER.goal);
	const phaseProgress =
		CURRENT_PHASE_INDEX >= 0 ? ((CURRENT_PHASE_INDEX + 1) / PHASES.length) * 100 : 0;

	const stats = [
		{
			label: 'Vague active',
			value: currentPhase?.name ?? 'À venir',
			sub: currentPhase ? `${currentPhase.share} cette semaine` : 'Lancement prochain',
			progress: phaseProgress,
			href: '/deroule',
			link: 'Voir le déroulé'
		},
		{
			label: 'Indices publiés',
			value: String(PUBLIC_INDICES.length),
			sub: 'annonces & TikTok',
			progress: Math.min((PUBLIC_INDICES.length / 12) * 100, 100),
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
		description="En un coup d'œil : la vague en cours, les indices publiés, l'objectif TikTok et les dernières annonces."
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

	{#if latestIndex}
		<div class="surface-card surface-card--accent latest-clue p-4 sm:p-5 mt-5 sm:mt-6" use:reveal={{ delay: 300 }}>
			<div class="latest-clue__header">
				<span class="latest-clue__badge">Dernier indice publié</span>
				<span class="font-display text-xs font-bold text-leveling-blue-light">{latestIndex.title}</span>
			</div>
			<p class="latest-clue__content">{latestIndex.content}</p>
			<a href="/indices" class="section-intro__link">
				Voir tous les indices
				<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
				</svg>
			</a>
		</div>
	{/if}
</section>
