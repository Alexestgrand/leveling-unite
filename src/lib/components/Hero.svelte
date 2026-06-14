<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import { EVENT } from '$lib/data/mock';
	import { getTimeRemaining, padTime, type TimeRemaining } from '$lib/utils/countdown';

	const [titleMain, titleSecondary] = EVENT.title.split(':').map((part) => part.trim());

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

<section class="relative overflow-hidden border-b border-leveling-blue/10">
	<div class="pointer-events-none absolute inset-0" aria-hidden="true">
		<div
			class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,153,255,0.18),transparent_58%)]"
		></div>

		<div
			class="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(0,119,204,0.12),transparent_45%)]"
		></div>

		<div
			class="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-zinc-950 via-zinc-950/90 to-transparent"
		></div>
	</div>

	<div class="page-container relative z-10 pt-8 pb-12 md:pt-12 md:pb-20">
		<div class="relative mx-auto max-w-4xl text-center">
			<p
				class="hero-enter mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-leveling-blue-light md:text-base"
			>
				Événement communautaire
			</p>

			<div class="hero-title-wrap hero-enter hero-enter-delay-1" aria-label={EVENT.title}>
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
						class="text-glitch-hero m-0 text-[clamp(2.5rem,9vw,5.25rem)] uppercase"
						data-text={titleSecondary}
					>
						<span class="hero-title-colon" aria-hidden="true">:</span>
						{titleSecondary}
					</h1>
				</div>
			</div>

			<p
				class="hero-enter hero-enter-delay-2 mt-4 font-display text-xl font-semibold tracking-[0.2em] text-zinc-400 sm:text-2xl md:text-3xl"
			>
				{EVENT.subtitle}
			</p>

			<p class="hero-enter hero-enter-delay-3 mx-auto mt-4 max-w-xl text-base text-zinc-400 md:text-lg">
				{EVENT.tagline}
			</p>

			<div class="mx-auto mt-12 max-w-2xl" use:reveal={{ delay: 200 }}>
				{#if remaining.expired}
					<div class="card-glass px-6 py-10">
						<p class="font-display text-2xl font-bold uppercase tracking-widest text-leveling-blue md:text-3xl">
							Événement terminé
						</p>
					</div>
				{:else}
					<div class="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-6">
						{#each units as unit, index}
							<div class="card-glass px-3 py-5 md:px-4 md:py-6" use:reveal={{ delay: 280 + index * 80 }}>
								{#if unit.key === 'seconds'}
									{#key tickKey}
										<p class="count-tick font-display text-3xl font-bold tabular-nums text-leveling-blue sm:text-4xl md:text-5xl">
											{padTime(remaining[unit.key])}
										</p>
									{/key}
								{:else}
									<p class="font-display text-3xl font-bold tabular-nums text-leveling-blue sm:text-4xl md:text-5xl">
										{padTime(remaining[unit.key])}
									</p>
								{/if}
								<p class="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 md:text-sm">
									{unit.label}
								</p>
							</div>
						{/each}
					</div>
				{/if}

				<p class="mt-8 text-sm text-zinc-500 md:text-base">
					Fin de l'événement — {EVENT.endDateLabel}
				</p>
			</div>
		</div>
	</div>
</section>
