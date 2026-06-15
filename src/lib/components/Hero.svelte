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
					href="/soumettre"
					class="hero__cta-discord clip-corner-sm glow-cta"
					title="Tester une phrase de 15 mots"
				>
					<svg
						class="hero__cta-discord-icon"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
						/>
					</svg>
					Tester une phrase
				</a>
				<p class="hero__cta-hint">
					{MAX_SUBMIT_ATTEMPTS} tentatives par {RATE_LIMIT_WINDOW_HOURS} h — 15 mots exactement
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
