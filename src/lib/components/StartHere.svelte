<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { EVENT_STATUS, START_HERE_CARDS } from '$lib/data/mock';
	import { tour } from '$lib/tour/tour.svelte';
</script>

<section class="start-here" use:reveal aria-label="Par où commencer">
	<p class="section-eyebrow">
		<span class="section-eyebrow__dot" aria-hidden="true"></span>
		Par où commencer
	</p>

	<div class="start-here__grid">
		{#each START_HERE_CARDS as card, index (card.id)}
			{#if 'action' in card && card.action === 'tour'}
				<button
					type="button"
					class="start-here__card start-here__card--tour surface-card"
					use:reveal={{ delay: index * 70 }}
					onclick={() => tour.start()}
				>
					<span class="start-here__step">{card.step}</span>
					<h2 class="start-here__title">{card.title}</h2>
					<p class="start-here__body">{card.body}</p>
					<span class="start-here__cta">
						{card.cta}
						<span aria-hidden="true">▶</span>
					</span>
				</button>
			{:else if 'href' in card}
				<a
					href={card.href}
					class="start-here__card start-here__card--link surface-card"
					class:start-here__card--primary={card.id === 'help'}
					use:reveal={{ delay: index * 70 }}
				>
					<span class="start-here__step">{card.step}</span>
					<h2 class="start-here__title">{card.title}</h2>
					<p class="start-here__body">{card.body}</p>
					<span class="start-here__cta">
						{card.cta}
						<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
						</svg>
					</span>
				</a>
			{/if}
		{/each}
	</div>

	<p class="start-here__status">
		<span class="start-here__status-label">{EVENT_STATUS.waveLabel}</span>
		· {EVENT_STATUS.progressLabel}
		· {EVENT_STATUS.note}
		<a href={EVENT_STATUS.noteHref} class="start-here__status-link">{EVENT_STATUS.noteLinkLabel}</a>
	</p>
</section>
