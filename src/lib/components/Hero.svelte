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
			class="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-zinc-950 via-zinc-950/90 to-transparent sm:h-48"
		></div>
	</div>

	<div class="page-container relative z-10 pb-10 pt-6 sm:pb-12 sm:pt-8 md:pb-20 md:pt-12">
		<div class="relative mx-auto max-w-4xl text-center">
			<p
				class="hero-enter mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-leveling-blue-light sm:mb-4 sm:text-sm sm:tracking-[0.35em] md:text-base"
			>
				Événement communautaire
			</p>

			<div class="hero-title-wrap hero-enter hero-enter-delay-1" aria-label={EVENT.title}>
				<div class="hero-title-line">
					<h1
						class="text-glitch-hero m-0 text-[clamp(2rem,11vw,5rem)] uppercase"
						data-text={titleMain}
					>
						{titleMain}
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

			<p
				class="hero-enter hero-enter-delay-2 mt-3 font-display text-base font-semibold tracking-[0.08em] text-zinc-400 sm:mt-4 sm:text-xl sm:tracking-[0.2em] md:text-3xl"
			>
				{EVENT.subtitle}
			</p>

			<p
				class="hero-enter hero-enter-delay-3 mx-auto mt-3 max-w-xl px-1 text-sm leading-relaxed text-zinc-400 sm:mt-4 sm:text-base md:text-lg"
			>
				{EVENT.tagline}
			</p>

			<div class="mx-auto mt-8 max-w-2xl sm:mt-12" use:reveal={{ delay: 200 }}>
				{#if remaining.expired}
					<div class="card-glass px-4 py-8 sm:px-6 sm:py-10">
						<p
							class="font-display text-xl font-bold uppercase tracking-widest text-leveling-blue sm:text-2xl md:text-3xl"
						>
							Événement terminé
						</p>
					</div>
				{:else}
					<div class="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 md:gap-6">
						{#each units as unit, index}
							<div
								class="card-glass px-2 py-4 sm:px-3 sm:py-5 md:px-4 md:py-6"
								use:reveal={{ delay: 280 + index * 80 }}
							>
								{#if unit.key === 'seconds'}
									{#key tickKey}
										<p
											class="count-tick font-display text-2xl font-bold tabular-nums text-leveling-blue sm:text-3xl md:text-5xl"
										>
											{padTime(remaining[unit.key])}
										</p>
									{/key}
								{:else}
									<p
										class="font-display text-2xl font-bold tabular-nums text-leveling-blue sm:text-3xl md:text-5xl"
									>
										{padTime(remaining[unit.key])}
									</p>
								{/if}
								<p
									class="mt-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-zinc-500 sm:mt-2 sm:text-xs sm:tracking-[0.2em] md:text-sm"
								>
									{unit.label}
								</p>
							</div>
						{/each}
					</div>
				{/if}

				<p class="mt-6 px-1 text-xs leading-relaxed text-zinc-500 sm:mt-8 sm:text-sm md:text-base">
					Fin de l'événement — {EVENT.endDateLabel}
				</p>
			</div>
		</div>
	</div>
</section>
