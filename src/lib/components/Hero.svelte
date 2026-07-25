<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
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

	const playLinks = [
		{ href: '/fragmentes', label: 'Fragmentés' },
		{ href: '/soumettre', label: 'Soumettre' },
		{ href: '/indices', label: 'Indices' }
	] as const;

	const discoverLinks = [
		{ href: '/regles', label: 'Règles' },
		{ href: '/concept', label: 'Concept' },
		{ href: '/deroule', label: 'Déroulé' },
		{ href: '/recompenses', label: 'Récompenses' },
		{ href: '/objectif-tiktok', label: 'TikTok' }
	] as const;

	const [titleMain, titleSecondary] = EVENT.title.split(':').map((part) => part.trim());

	const CTA_HOLD_MS = 900;

	let remaining = $state<TimeRemaining>(getTimeRemaining(EVENT.endDate));
	let apiHealth = $state<ApiHealthStatus | null>(null);
	let ctaProgress = $state(0);
	let ctaLaunching = $state(false);
	let ctaComplete = $state(false);
	let holdRaf = 0;
	let holdStartedAt = 0;

	const apiReady = isApiConfigured();
	const showColdStartNotice = $derived(apiReady && apiHealth !== null && apiHealth !== 'ok');
	const eventEnded = $derived(remaining.expired);
	const portalBadge = $derived(
		eventEnded ? 'Système — le portail est fermé' : 'Système — le portail est ouvert'
	);
	const ctaLabel = $derived(
		eventEnded
			? 'Énigme close'
			: ctaComplete
				? 'Portail ouvert'
				: ctaLaunching
					? 'Maintenez…'
					: 'Maintenir pour tester une phrase'
	);

	onMount(() => {
		remaining = getTimeRemaining(EVENT.endDate);
		const intervalId = setInterval(() => {
			remaining = getTimeRemaining(EVENT.endDate);
		}, 1000);

		if (apiReady) {
			fetchApiHealth().then((status) => {
				apiHealth = status;
			});
		}

		return () => {
			clearInterval(intervalId);
			cancelHold(false);
		};
	});

	function cancelHold(resetProgress: boolean) {
		if (holdRaf) {
			cancelAnimationFrame(holdRaf);
			holdRaf = 0;
		}
		if (resetProgress && !ctaComplete) {
			ctaLaunching = false;
			ctaProgress = 0;
		}
	}

	function finishHold() {
		ctaComplete = true;
		ctaProgress = 100;
		ctaLaunching = false;
		window.setTimeout(() => {
			goto('/soumettre');
		}, 320);
	}

	function tickHold(now: number) {
		const elapsed = now - holdStartedAt;
		const progress = Math.min(elapsed / CTA_HOLD_MS, 1);
		ctaProgress = progress * 100;

		if (progress >= 1) {
			holdRaf = 0;
			finishHold();
			return;
		}

		holdRaf = requestAnimationFrame(tickHold);
	}

	function startHold(event: PointerEvent) {
		if (eventEnded || ctaComplete || ctaLaunching) return;
		if (event.pointerType === 'mouse' && event.button !== 0) return;

		ctaLaunching = true;
		ctaProgress = 0;
		holdStartedAt = performance.now();
		(event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
		holdRaf = requestAnimationFrame(tickHold);
	}

	function endHold() {
		if (ctaComplete) return;
		cancelHold(true);
	}
</script>

<section class="hero ambient-bg">
	<div class="hero__glow" aria-hidden="true"></div>

	<div class="page-container hero__inner hero__inner--portal">
		<div class="hero__content hero__content--portal">
			<p class="hero__portal-badge clip-corner-sm hero-fade hero-fade-1" use:reveal>
				<span class="hero__portal-dot" aria-hidden="true"></span>
				{portalBadge}
			</p>

			<header class="hero-fade hero-fade-2" use:reveal={{ delay: 60 }}>
				<div class="hero-title-wrap hero-title-wrap--portal" aria-label={EVENT.title}>
					<div class="hero-title-line">
						<h1 class="m-0 leading-none">
							<span class="hero-brand-logo">
								<img
									src="/leveling-title.png"
									alt=""
									class="hero-brand-logo__img"
									fetchpriority="high"
								/>
								<span class="sr-only">{titleMain}</span>
							</span>
						</h1>
					</div>
					<div class="hero-title-line">
						<h1
							class="text-glitch-hero m-0 text-[clamp(1.65rem,8.5vw,4rem)] uppercase"
							data-text={titleSecondary}
						>
							<span class="hero-title-colon" aria-hidden="true">:</span>
							{titleSecondary}
						</h1>
					</div>
				</div>
				<p class="hero__subtitle-portal text-accent-cyan">{EVENT.subtitle}</p>
				<p class="hero__tagline-portal">{EVENT.tagline}</p>
			</header>

			<div class="hero__countdown hero__countdown--portal hero-fade hero-fade-3" use:reveal={{ delay: 120 }}>
				<div class="hero__countdown-head">
					<p class="hero__countdown-title">L'énigme se termine dans</p>
					<p class="hero__countdown-date">{EVENT.endDateLabel}</p>
				</div>

				{#if eventEnded}
					<div class="hero__countdown-cell hero__expired-portal">
						<p class="hero__expired-text">L'énigme est close</p>
					</div>
				{:else}
					<div class="hero__countdown-grid hero__countdown-grid--portal">
						{#each units as unit}
							<div class="hero__countdown-cell clip-corner-sm">
								{#if unit.key === 'seconds'}
									{#key remaining.seconds}
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
				<button
					type="button"
					class="hero__cta-discord clip-corner-sm glow-cta"
					class:hero__cta-discord--launching={ctaLaunching}
					class:hero__cta-discord--complete={ctaComplete}
					title="Maintenir pour ouvrir le portail de soumission"
					disabled={eventEnded || ctaComplete}
					aria-busy={ctaLaunching}
					aria-describedby="hero-cta-hint"
					onpointerdown={startHold}
					onpointerup={endHold}
					onpointerleave={endHold}
					onpointercancel={endHold}
					oncontextmenu={(e) => e.preventDefault()}
				>
					<span
						class="hero__cta-progress"
						style="width: {ctaProgress}%"
						aria-hidden="true"
					></span>
					<span class="hero__cta-label">
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
						{ctaLabel}
					</span>
				</button>
				<p id="hero-cta-hint" class="hero__cta-hint">
					Maintenez le bouton pour ouvrir le portail · {MAX_SUBMIT_ATTEMPTS} essais /
					{RATE_LIMIT_WINDOW_HOURS} h · 15 mots
				</p>
				{#if showColdStartNotice}
					<p class="hero__api-notice" role="status">{API_COLD_START_MESSAGE}</p>
				{/if}
			</div>

			<nav class="hero__secondary hero-fade hero-fade-5" aria-label="Raccourcis">
				<div class="hero__secondary-group">
					<span class="hero__secondary-label">Jouer</span>
					<div class="hero__secondary-links">
						{#each playLinks as link, index}
							{#if index > 0}
								<span class="hero__secondary-sep" aria-hidden="true">·</span>
							{/if}
							<a href={link.href} class="hero__secondary-link">{link.label}</a>
						{/each}
					</div>
				</div>
				<div class="hero__secondary-group">
					<span class="hero__secondary-label">Découvrir</span>
					<div class="hero__secondary-links">
						{#each discoverLinks as link, index}
							{#if index > 0}
								<span class="hero__secondary-sep" aria-hidden="true">·</span>
							{/if}
							<a href={link.href} class="hero__secondary-link">{link.label}</a>
						{/each}
					</div>
				</div>
			</nav>
		</div>
	</div>
</section>
