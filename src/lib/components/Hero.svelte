<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import { EVENT } from '$lib/data/mock';
	import { getTimeRemaining, padTime, type TimeRemaining } from '$lib/utils/countdown';

	const [titleMain, titleSecondary] = EVENT.title.split(':').map((part) => part.trim());

	const quickLinks = [
		{ href: '/regles', label: 'Les règles', desc: 'Entraide & fair-play' },
		{ href: '/indices', label: 'Les indices', desc: 'Fragments débloqués', primary: true },
		{ href: '/objectif-tiktok', label: 'TikTok', desc: 'Objectif communautaire' }
	];

	const units = [
		{ key: 'days', label: 'Jours' },
		{ key: 'hours', label: 'Heures' },
		{ key: 'minutes', label: 'Minutes' },
		{ key: 'seconds', label: 'Secondes' }
	] as const;

	let remaining = $state<TimeRemaining>(getTimeRemaining(EVENT.endDate));
	let tickKey = $state(0);
	let intervalId: ReturnType<typeof setInterval> | undefined;

	onMount(() => {
		remaining = getTimeRemaining(EVENT.endDate);
		intervalId = setInterval(() => {
			remaining = getTimeRemaining(EVENT.endDate);
			tickKey++;
		}, 1000);
	});

	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
	});
</script>

<section class="hero">
	<div class="hero__glow" aria-hidden="true"></div>

	<div class="page-container hero__inner">
		<div class="hero__content">
			<p class="hero__badge hero-fade hero-fade-1">
				<span class="hero__badge-dot" aria-hidden="true"></span>
				Événement communautaire en cours
			</p>

			<h1 class="hero__title hero-fade hero-fade-2" aria-label={EVENT.title}>
				<span class="hero__title-main">{titleMain}</span>
				<span class="hero__title-sub">
					<span class="hero__title-colon" aria-hidden="true">:</span>
					{titleSecondary}
				</span>
			</h1>

			<p class="hero__pitch hero-fade hero-fade-3">
				<strong>Enquête collective sur Discord.</strong>
				Reconstituez une phrase secrète fragmentée — personne ne peut gagner seul.
			</p>

			<p class="hero__tagline hero-fade hero-fade-4">{EVENT.tagline}</p>

			<nav class="hero__actions hero-fade hero-fade-5" aria-label="Accès rapide">
				{#each quickLinks as link}
					<a href={link.href} class="btn-pill" class:btn-pill--primary={link.primary}>
						<span class="btn-pill__label">{link.label}</span>
						<span class="btn-pill__hint">{link.desc}</span>
					</a>
				{/each}
			</nav>

			<div class="hero__countdown hero-fade hero-fade-6" use:reveal={{ delay: 200 }}>
				<div class="hero__countdown-head">
					<p class="hero__countdown-title">Temps restant</p>
					<p class="hero__countdown-date">Fin — {EVENT.endDateLabel}</p>
				</div>

				{#if remaining.expired}
					<div class="surface-card hero__expired">
						<p class="font-display text-xl font-bold text-leveling-blue sm:text-2xl">
							Événement terminé
						</p>
					</div>
				{:else}
					<div class="hero__countdown-grid">
						{#each units as unit, index}
							<div class="countdown-unit" use:reveal={{ delay: 260 + index * 70 }}>
								{#if unit.key === 'seconds'}
									{#key tickKey}
										<p class="countdown-unit__value count-tick">{padTime(remaining[unit.key])}</p>
									{/key}
								{:else}
									<p class="countdown-unit__value">{padTime(remaining[unit.key])}</p>
								{/if}
								<p class="countdown-unit__label">{unit.label}</p>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
