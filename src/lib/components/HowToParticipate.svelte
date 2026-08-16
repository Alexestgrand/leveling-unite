<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import { EVENT, PARTICIPATION_STEPS } from '$lib/data/mock';

	const stepHrefs = [EVENT.discordUrl, '/fragmentes', '/soumettre'] as const;
	const stepCtas = ['Ouvrir Discord', 'Ouvrir le Cadran', 'Ouvrir le portail'] as const;
	const stepExternal = [true, false, false] as const;
</script>

<section use:reveal>
	<SectionIntro
		eyebrow="Rejoindre l'enquête"
		title="Comment participer"
		description="Trois étapes. Le reste se joue sur le serveur."
		href={EVENT.discordUrl}
		linkLabel="Rejoindre le Discord"
	/>

	<div class="steps-grid">
		{#each PARTICIPATION_STEPS as step, index}
			<article class="step-card surface-card" use:reveal={{ delay: index * 90 }}>
				<span class="step-card__number">{step.step}</span>
				<h3 class="step-card__title">{step.title}</h3>
				<p class="step-card__desc">{step.description}</p>
				<a
					href={stepHrefs[index]}
					class="step-card__link"
					rel={stepExternal[index] ? 'noopener noreferrer' : undefined}
					target={stepExternal[index] ? '_blank' : undefined}
				>
					{stepCtas[index]}
					<svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
					</svg>
				</a>
			</article>
		{/each}
	</div>
</section>
