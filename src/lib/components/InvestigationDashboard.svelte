<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import {
		PUBLIC_INDICES,
		PHASES,
		CURRENT_PHASE_INDEX,
		TIKTOK_TRACKER,
		ANNOUNCEMENTS
	} from '$lib/data/mock';
	import { fetchSubmissionStats, isApiConfigured } from '$lib/api/validate';
	import { formatViews, milestonePercent } from '$lib/utils/format';

	const STATS_POLL_MS = 8000;

	const latestIndex =
		PUBLIC_INDICES.length > 0
			? [...PUBLIC_INDICES].sort(
					(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
				)[0]
			: null;
	const currentPhase = CURRENT_PHASE_INDEX >= 0 ? PHASES[CURRENT_PHASE_INDEX] : null;
	const tiktokProgress = milestonePercent(TIKTOK_TRACKER.currentViews, TIKTOK_TRACKER.goal);
	const phaseProgress =
		CURRENT_PHASE_INDEX >= 0 ? ((CURRENT_PHASE_INDEX + 1) / PHASES.length) * 100 : 0;

	let uniqueTesters = $state<number | null>(null);
	let totalAttempts = $state<number | null>(null);
	let statsReady = $state(false);

	async function refreshStats() {
		const data = await fetchSubmissionStats();
		if (!data) return;
		uniqueTesters = data.unique_testers;
		totalAttempts = data.total_attempts;
		statsReady = true;
	}

	onMount(() => {
		if (!isApiConfigured()) return;
		refreshStats();
		const intervalId = setInterval(refreshStats, STATS_POLL_MS);
		return () => clearInterval(intervalId);
	});

	const stats = $derived([
		{
			label: 'Vague active',
			value: currentPhase?.name ?? 'À venir',
			sub: currentPhase ? `${currentPhase.share} cette semaine` : 'Lancement prochain',
			progress: phaseProgress,
			href: '/deroule',
			link: 'Voir le déroulé'
		},
		{
			label: 'Phrases testées',
			value: statsReady && uniqueTesters !== null ? formatViews(uniqueTesters) : '—',
			sub:
				statsReady && totalAttempts !== null
					? `${formatViews(totalAttempts)} essais au total · live`
					: 'compteur en direct',
			progress: uniqueTesters !== null ? Math.min((uniqueTesters / 500) * 100, 100) : 0,
			href: '/soumettre',
			link: 'Tester une phrase',
			live: true
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
			label: 'Indices publiés',
			value: String(PUBLIC_INDICES.length),
			sub:
				ANNOUNCEMENTS.length > 0
					? `${ANNOUNCEMENTS.length} transmissions`
					: 'annonces & TikTok',
			progress: Math.min((PUBLIC_INDICES.length / 12) * 100, 100),
			href: '/indices',
			link: 'Explorer les indices'
		}
	]);
</script>

<section class="investigation-dashboard" use:reveal id="statut">
	<SectionIntro
		eyebrow="Vue d'ensemble"
		title="Où en est l'enquête ?"
		description="La vague, les essais, les vues, les indices — en direct."
		href="/fragmentes"
		linkLabel="Voir les quêtes"
	/>

	<div class="stat-grid">
		{#each stats as stat, index}
			<a href={stat.href} class="stat-card stat-card--link" use:reveal={{ delay: index * 70 }}>
				<div class="stat-card__top">
					<p class="stat-card__label">
						{#if 'live' in stat && stat.live}
							<span class="stat-card__live-dot" aria-hidden="true"></span>
						{/if}
						{stat.label}
					</p>
					<svg class="stat-card__arrow size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
					</svg>
				</div>
				<p class="stat-card__value" class:stat-card__value--live={'live' in stat && stat.live}>
					{stat.value}
				</p>
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
