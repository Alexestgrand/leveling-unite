<script lang="ts">
	import {
		ACTIVE_CREUX_RULE,
		CREUX_CAMP_LABEL,
		CREUX_RESOLUTION,
		EVENT_VIGILANCE
	} from '$lib/data/mock';
</script>

{#if CREUX_RESOLUTION.resolved}
	<aside class="event-edict" aria-label="Édit actif de l'événement">
		<div class="event-edict__scan" aria-hidden="true"></div>
		<div class="page-container event-edict__inner">
			<div class="event-edict__main">
				<p class="event-edict__badge">
					<span class="event-edict__pulse" aria-hidden="true"></span>
					Édit actif · Énigme du creux
				</p>
				<h2 class="event-edict__title">{ACTIVE_CREUX_RULE.title}</h2>
				<p class="event-edict__desc">{ACTIVE_CREUX_RULE.description}</p>
				<p class="event-edict__meta">
					Imposé par <strong>{CREUX_CAMP_LABEL[CREUX_RESOLUTION.winnerCamp]}</strong>
					· {CREUX_RESOLUTION.resolvedLabel}
					· s’applique aux <strong>deux camps</strong>
				</p>
			</div>

			<div class="event-edict__vigilance">
				<p class="event-edict__vigilance-eyebrow">{EVENT_VIGILANCE.eyebrow}</p>
				<p class="event-edict__vigilance-body">{EVENT_VIGILANCE.body}</p>
				<p class="event-edict__vigilance-ps">
					<span aria-hidden="true">◈</span>
					{EVENT_VIGILANCE.ps}
				</p>
			</div>

			<a href="/regles#edit-du-creux" class="event-edict__link">Détails de l’édit</a>
		</div>
	</aside>
{/if}
