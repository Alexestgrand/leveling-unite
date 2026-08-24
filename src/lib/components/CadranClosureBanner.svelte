<script lang="ts">
	import { onMount } from 'svelte';
	import { CADRAN_CREUX } from '$lib/data/mock';
	import {
		getSubmissionCountdownTarget,
		getSubmissionPhase,
		getTimeRemaining,
		padTime,
		type TimeRemaining
	} from '$lib/utils/countdown';
	import { reveal } from '$lib/actions/reveal';

	const units = [
		{ key: 'days', label: 'J' },
		{ key: 'hours', label: 'H' },
		{ key: 'minutes', label: 'M' },
		{ key: 'seconds', label: 'S' }
	] as const;

	let remaining = $state<TimeRemaining>(
		getTimeRemaining(
			getSubmissionCountdownTarget(CADRAN_CREUX.submitOpenDate, CADRAN_CREUX.submitDeadline)
		)
	);
	const submitPhase = $derived(
		getSubmissionPhase(CADRAN_CREUX.submitOpenDate, CADRAN_CREUX.submitDeadline)
	);

	function tick() {
		remaining = getTimeRemaining(
			getSubmissionCountdownTarget(CADRAN_CREUX.submitOpenDate, CADRAN_CREUX.submitDeadline)
		);
	}

	onMount(() => {
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	});
</script>

<section class="cadran-closure surface-card hud-panel clip-corners" use:reveal aria-labelledby="cadran-closure-title">
	<p class="cadran-closure__eyebrow">
		<span class="cadran-closure__pulse" aria-hidden="true"></span>
		⏳ {CADRAN_CREUX.title} — révélation
	</p>

	<h2 id="cadran-closure-title" class="cadran-closure__title">Vous avez été braves.</h2>

	<div class="cadran-closure__epilogue">
		{#each CADRAN_CREUX.closingLines as line}
			<p>{line}</p>
		{/each}
	</div>

	{#if submitPhase === 'upcoming'}
		<p class="cadran-closure__submit">
			Soumission rouverte le <strong>{CADRAN_CREUX.submitOpenDateLabel}</strong> — ouverture dans
		</p>
		<div class="cadran-closure__countdown" aria-live="polite">
			{#each units as unit}
				<span class="cadran-closure__countdown-cell">
					<span class="cadran-closure__countdown-value">{padTime(remaining[unit.key])}</span>
					<span class="cadran-closure__countdown-label">{unit.label}</span>
				</span>
			{/each}
		</div>
		<p class="cadran-closure__submit cadran-closure__submit--muted">
			Fenêtre de 48 h · jusqu’au {CADRAN_CREUX.submitDeadlineLabel}
		</p>
	{:else if submitPhase === 'open'}
		<p class="cadran-closure__submit">
			Soumission rouverte — vous avez jusqu’à <strong>{CADRAN_CREUX.submitDeadlineLabel}</strong> pour
			tester vos phrases sur le site.
		</p>
		<div class="cadran-closure__countdown" aria-live="polite">
			{#each units as unit}
				<span class="cadran-closure__countdown-cell">
					<span class="cadran-closure__countdown-value">{padTime(remaining[unit.key])}</span>
					<span class="cadran-closure__countdown-label">{unit.label}</span>
				</span>
			{/each}
		</div>
		<a href="/soumettre" class="cadran-closure__cta cadran-closure__cta--submit">Soumettre une phrase →</a>
	{:else}
		<p class="cadran-closure__submit">La fenêtre de soumission est close.</p>
	{/if}

	<p class="cadran-closure__teaser">
		<span class="cadran-closure__spoiler" aria-label="Contenu masqué">{CADRAN_CREUX.rewardTeaser}</span>
	</p>

	<a href="/creux#cadran-revelation" class="cadran-closure__cta">Lire la révélation complète →</a>
</section>
