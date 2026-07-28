<script lang="ts">
	import PageShell from '$lib/components/PageShell.svelte';
	import TransmissionPlayer from '$lib/components/TransmissionPlayer.svelte';
	import { CREUX_CHALLENGE, CREUX_RULE_OPTIONS } from '$lib/data/mock';
</script>

<PageShell
	sectionLabel="Transmission"
	title="Énigme du creux"
	subtitle="Signal capté entre deux vagues. Une règle pour le camp qui résout le premier."
>
	<article id={CREUX_CHALLENGE.id} class="creux-vault surface-card hud-panel clip-corners p-5 sm:p-8">
		<p class="creux-vault__eyebrow">
			<span aria-hidden="true">◈</span>
			Transmission non identifiée
		</p>

		<p class="creux-vault__intro">
			Un signal a été capté cette nuit sur la fréquence de l'événement. Il ne provient d'aucun de nos
			canaux. Nous n'avons pas réussi à le lire. Vous, peut-être.
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

		<section class="creux-vault__rules">
			<h2 class="creux-vault__section-title">Le droit des vainqueurs</h2>
			<p class="creux-vault__rules-lead">
				Le camp qui résoudra l'épreuve en premier choisira une de ces règles :
			</p>
			<ul class="creux-vault__rules-list">
				{#each CREUX_RULE_OPTIONS as rule (rule.id)}
					<li class="creux-rule-card">
						<h3>{rule.title}</h3>
						<p>{rule.description}</p>
					</li>
				{/each}
			</ul>
		</section>
	</article>
</PageShell>
