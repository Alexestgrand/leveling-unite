<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import TransmissionPlayer from '$lib/components/TransmissionPlayer.svelte';
	import {
		ACTIVE_CREUX_RULE,
		CREUX_CAMP_LABEL,
		CREUX_CHALLENGE,
		CREUX_PENDING,
		CREUX_RESOLUTION,
		CREUX_RULE_OPTIONS,
		SURCIS_RULE_DETAILS
	} from '$lib/data/mock';
</script>

<PageShell
	sectionLabel="Transmission"
	title="Énigme du creux"
	subtitle={CREUX_PENDING.active
		? 'Entre deux vagues. Une nouvelle transmission est imminente.'
		: CREUX_RESOLUTION.resolved
			? 'Signal déchiffré. Un camp a parlé — l’édit est gravé.'
			: 'Signal capté entre deux vagues. Une règle pour le camp qui résout le premier.'}
>
	{#if CREUX_PENDING.active}
		<div class="creux-pending surface-card hud-panel clip-corners p-5 sm:p-8" role="status">
			<p class="creux-pending__eyebrow">
				<span class="creux-pending__pulse" aria-hidden="true"></span>
				{CREUX_PENDING.betweenLabel}
			</p>
			<h2 class="creux-pending__title">{CREUX_PENDING.title}</h2>
			<p class="creux-pending__body">{CREUX_PENDING.body}</p>
		</div>
	{/if}

	{#if CREUX_RESOLUTION.resolved}
		<div class="creux-resolved surface-card hud-panel clip-corners p-5 sm:p-8" role="status">
			<p class="creux-resolved__eyebrow">
				<span aria-hidden="true">✓</span>
				Énigme résolue — premier Creux
			</p>
			<h2 class="creux-resolved__title">Le creux a parlé.</h2>
			<p class="creux-resolved__lead">
				<strong>{CREUX_CAMP_LABEL[CREUX_RESOLUTION.winnerCamp]}</strong> a été le premier à percer la
				transmission. Ils ont activé l’édit suivant — il lie les deux camps jusqu’à la fin de
				l’événement.
			</p>
			<div class="creux-resolved__edict">
				<p class="creux-resolved__edict-label">Édit gravé</p>
				<h3>{ACTIVE_CREUX_RULE.title}</h3>
				<p>{ACTIVE_CREUX_RULE.description}</p>
			</div>
			<ul class="creux-resolved__details">
				{#each SURCIS_RULE_DETAILS as line}
					<li>{line}</li>
				{/each}
			</ul>
			<p class="creux-resolved__date">Activé · {CREUX_RESOLUTION.resolvedLabel}</p>
		</div>
	{/if}

	<article id={CREUX_CHALLENGE.id} class="creux-vault surface-card hud-panel clip-corners p-5 sm:p-8">
		<p class="creux-vault__eyebrow">
			<span aria-hidden="true">◈</span>
			{CREUX_RESOLUTION.resolved ? 'Archive — transmission du premier Creux' : 'Transmission non identifiée'}
		</p>

		<p class="creux-vault__intro">
			{#if CREUX_RESOLUTION.resolved}
				Le signal a été capté entre deux vagues. Il ne provenait d’aucun de nos canaux. La
				Communauté l’a lu avant nous — et a choisi son prix.
			{:else}
				Un signal a été capté cette nuit sur la fréquence de l'événement. Il ne provient d'aucun de nos
				canaux. Nous n'avons pas réussi à le lire. Vous, peut-être.
			{/if}
		</p>

		<div class="creux-vault__audio-block">
			<p class="creux-vault__warn">
				<span aria-hidden="true">⚠</span>
				Baissez le volume avant de lancer le fichier.
			</p>
			<TransmissionPlayer src={CREUX_CHALLENGE.audioUrl} filename="transmission.wav" />
		</div>

		<div class="creux-vault__cipher-block">
			<p class="creux-vault__cipher-label">{CREUX_CHALLENGE.audioHint}</p>
			<p class="creux-vault__cipher-label">Ce qu'il porte ouvrira ceci :</p>
			<p class="creux-vault__cipher">{CREUX_CHALLENGE.cipher}</p>
		</div>

		{#if !CREUX_RESOLUTION.resolved}
			<section class="creux-vault__stakes">
				<h2 class="creux-vault__section-title">Ce qui est en jeu</h2>
				<p>
					Le premier camp dont un membre envoie la réponse en message privé à
					<strong>@so_hakai</strong> (Hakai), l'organisateur, choisira une règle. Elle s'appliquera
					jusqu'à la fin de l'événement — aux deux camps.
				</p>
				<p class="creux-vault__deadline">
					Deadline : <strong>{CREUX_CHALLENGE.deadlineLabel}</strong>
				</p>
			</section>
		{/if}

		<section class="creux-vault__rules">
			<h2 class="creux-vault__section-title">
				{CREUX_RESOLUTION.resolved ? 'Les règles proposées' : 'Le droit des vainqueurs'}
			</h2>
			<p class="creux-vault__rules-lead">
				{#if CREUX_RESOLUTION.resolved}
					Trois édits étaient en jeu. Un seul a été activé :
				{:else}
					Le camp qui résoudra l'épreuve en premier choisira une de ces règles :
				{/if}
			</p>
			<ul class="creux-vault__rules-list">
				{#each CREUX_RULE_OPTIONS as rule (rule.id)}
					<li
						class="creux-rule-card"
						class:creux-rule-card--active={CREUX_RESOLUTION.resolved && rule.id === CREUX_RESOLUTION.chosenRuleId}
						class:creux-rule-card--inactive={CREUX_RESOLUTION.resolved && rule.id !== CREUX_RESOLUTION.chosenRuleId}
					>
						<h3>{rule.title}</h3>
						<p>{rule.description}</p>
						{#if CREUX_RESOLUTION.resolved && rule.id === CREUX_RESOLUTION.chosenRuleId}
							<p class="creux-rule-card__stamp">Édit actif</p>
						{/if}
					</li>
				{/each}
			</ul>
		</section>
	</article>
</PageShell>
