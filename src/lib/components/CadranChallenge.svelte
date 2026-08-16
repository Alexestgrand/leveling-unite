<script lang="ts">
	import { onMount } from 'svelte';
	import { CADRAN_CREUX } from '$lib/data/mock';
	import { getTimeRemaining, padTime, type TimeRemaining } from '$lib/utils/countdown';

	const units = [
		{ key: 'days', label: 'Jours' },
		{ key: 'hours', label: 'Heures' },
		{ key: 'minutes', label: 'Minutes' },
		{ key: 'seconds', label: 'Secondes' }
	] as const;

	const deadline = new Date(CADRAN_CREUX.deadline);
	const members = CADRAN_CREUX.bearers.filter((b) => b.camp === 'communaute');
	const staff = CADRAN_CREUX.bearers.filter((b) => b.camp === 'staff');

	let remaining = $state<TimeRemaining>(getTimeRemaining(deadline));

	onMount(() => {
		remaining = getTimeRemaining(deadline);
		const id = setInterval(() => {
			remaining = getTimeRemaining(deadline);
		}, 1000);
		return () => clearInterval(id);
	});
</script>

<article id={CADRAN_CREUX.id} class="cadran surface-card hud-panel clip-corners" data-tour="tour-cadran" role="region">
	<p class="cadran__eyebrow">
		<span class="cadran__pulse" aria-hidden="true"></span>
		{CADRAN_CREUX.eyebrow}
	</p>

	<h2 class="cadran__title">
		<span class="cadran__hourglass" aria-hidden="true">⏳</span>
		{CADRAN_CREUX.title}
	</h2>

	<blockquote class="cadran__poem">
		{#each CADRAN_CREUX.verses as verse}
			<p>{verse}</p>
		{/each}
	</blockquote>

	<div class="cadran__countdown" role="timer" aria-label="Temps restant jusqu’à l’échéance">
		{#if remaining.expired}
			<p class="cadran__expired">Échéance atteinte — les résultats n’ont pas encore été révélés.</p>
		{:else}
			<p class="cadran__countdown-label">Échéance · {CADRAN_CREUX.deadlineLabel}</p>
			<div class="cadran__countdown-grid">
				{#each units as unit}
					<div class="cadran__countdown-cell">
						<p class="cadran__countdown-value">{padTime(remaining[unit.key])}</p>
						<p class="cadran__countdown-unit">{unit.label}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<section class="cadran__block">
		<h3>Réponse</h3>
		<ul>
			{#each CADRAN_CREUX.rules as rule}
				<li>{rule}</li>
			{/each}
		</ul>
		<p class="cadran__submit">{CADRAN_CREUX.submitNote}</p>
	</section>

	<section class="cadran__block cadran__block--reward">
		<h3>Récompense</h3>
		<p>{CADRAN_CREUX.reward}</p>
	</section>

	<section class="cadran__block cadran__block--hint">
		<h3>Indice</h3>
		<p>{CADRAN_CREUX.hintNote}</p>
	</section>

	<section class="cadran__bearers">
		<h3>Fragmentés de la Vague 4</h3>
		<p class="cadran__bearers-note">
			Pas d’énigmes individuelles. Tous les Fragmentés, toutes vagues confondues, peuvent
			soumettre.
		</p>
		<div class="cadran__roster">
			<div>
				<p class="cadran__camp cadran__camp--communaute">Communauté</p>
				<ul>
					{#each members as bearer, index}
						<li data-tour={index === 0 ? 'tour-porteur' : undefined}>@{bearer.discordUsername}</li>
					{/each}
				</ul>
			</div>
			<div>
				<p class="cadran__camp cadran__camp--staff">Staff</p>
				<ul>
					{#each staff as bearer}
						<li>@{bearer.discordUsername}</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>
</article>
