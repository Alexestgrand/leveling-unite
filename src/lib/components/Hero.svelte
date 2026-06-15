<script lang="ts">
	import { onMount } from 'svelte';
	import {
		EVENT,
		MAX_SUBMIT_ATTEMPTS,
		RATE_LIMIT_WINDOW_HOURS
	} from '$lib/data/mock';
	import {
		API_COLD_START_MESSAGE,
		fetchApiHealth,
		getDiscordLoginUrl,
		isApiConfigured,
		type ApiHealthStatus
	} from '$lib/api/validate';
	import { getTimeRemaining, padTime, type TimeRemaining } from '$lib/utils/countdown';
	import { reveal } from '$lib/actions/reveal';

	const units = [
		{ key: 'days', label: 'Jours' },
		{ key: 'hours', label: 'Heures' },
		{ key: 'minutes', label: 'Minutes' },
		{ key: 'seconds', label: 'Secondes' }
	] as const;

	const secondaryLinks = [
		{ href: '/regles', label: 'Règles' },
		{ href: '/indices', label: 'Indices' },
		{ href: '/deroule', label: 'Déroulé' },
		{ href: '/recompenses', label: 'Récompenses' },
		{ href: '/objectif-tiktok', label: 'TikTok' },
		{ href: '/concept', label: 'Concept' }
	] as const;

	let remaining = $state<TimeRemaining>(getTimeRemaining(EVENT.endDate));
	let tickKey = $state(0);
	let apiHealth = $state<ApiHealthStatus | null>(null);

	const apiReady = isApiConfigured();
	const discordHref = apiReady ? getDiscordLoginUrl() : '/soumettre';
	const discordTitle = apiReady
		? 'Connexion Discord'
		: 'API non configurée — redirection vers la page de soumission';
	const showColdStartNotice = $derived(apiReady && apiHealth !== null && apiHealth !== 'ok');

	$effect(() => {
		remaining = getTimeRemaining(EVENT.endDate);
		const intervalId = setInterval(() => {
			remaining = getTimeRemaining(EVENT.endDate);
			tickKey++;
		}, 1000);
		return () => clearInterval(intervalId);
	});

	onMount(async () => {
		if (apiReady) {
			apiHealth = await fetchApiHealth();
		}
	});
</script>

<section class="hero ambient-bg">
	<div class="hero__glow" aria-hidden="true"></div>

	<div class="page-container hero__inner hero__inner--portal">
		<div class="hero__content hero__content--portal">
			<p class="hero__portal-badge clip-corner-sm hero-fade hero-fade-1" use:reveal>
				<span class="hero__portal-dot" aria-hidden="true"></span>
				Système — le portail est ouvert
			</p>

			<header class="hero-fade hero-fade-2" use:reveal={{ delay: 60 }}>
				<h1 class="hero__title-portal">{EVENT.title}</h1>
				<p class="hero__subtitle-portal text-accent-cyan">{EVENT.subtitle}</p>
				<p class="hero__tagline-portal">{EVENT.tagline}</p>
			</header>

			<div class="hero__countdown hero__countdown--portal hero-fade hero-fade-3" use:reveal={{ delay: 120 }}>
				<div class="hero__countdown-head">
					<p class="hero__countdown-title">Temps restant</p>
					<p class="hero__countdown-date">{EVENT.endDateLabel}</p>
				</div>

				{#if remaining.expired}
					<div class="hero__countdown-cell hero__expired-portal">
						<p class="hero__expired-text">Événement terminé</p>
					</div>
				{:else}
					<div class="hero__countdown-grid hero__countdown-grid--portal">
						{#each units as unit}
							<div class="hero__countdown-cell clip-corner-sm">
								{#if unit.key === 'seconds'}
									{#key tickKey}
										<p class="hero__countdown-value count-tick">{padTime(remaining[unit.key])}</p>
									{/key}
								{:else}
									<p class="hero__countdown-value">{padTime(remaining[unit.key])}</p>
								{/if}
								<p class="hero__countdown-label">{unit.label}</p>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<div class="hero__cta-wrap hero-fade hero-fade-4" use:reveal={{ delay: 180 }}>
				<a
					href={discordHref}
					class="hero__cta-discord clip-corner-sm glow-cta"
					title={discordTitle}
				>
					<svg
						class="hero__cta-discord-icon"
						viewBox="0 0 24 24"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
						/>
					</svg>
					Se connecter avec Discord
				</a>
				<p class="hero__cta-hint">
					{MAX_SUBMIT_ATTEMPTS} tentatives par {RATE_LIMIT_WINDOW_HOURS} h après connexion
				</p>
				{#if showColdStartNotice}
					<p class="hero__api-notice" role="status">{API_COLD_START_MESSAGE}</p>
				{/if}
			</div>

			<nav class="hero__secondary-links hero-fade hero-fade-5" aria-label="Liens secondaires">
				{#each secondaryLinks as link, index}
					{#if index > 0}
						<span class="hero__secondary-sep" aria-hidden="true">·</span>
					{/if}
					<a href={link.href} class="hero__secondary-link">{link.label}</a>
				{/each}
			</nav>
		</div>
	</div>
</section>
