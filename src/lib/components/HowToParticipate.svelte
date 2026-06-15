<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import { PARTICIPATION_STEPS } from '$lib/data/mock';
</script>

<section use:reveal>
	<SectionIntro
		eyebrow="Rejoindre l'enquête"
		title="Comment participer"
		description="Trois étapes simples pour comprendre l'événement et commencer à contribuer avec la communauté."
		href="/regles"
		linkLabel="Lire les règles complètes"
	/>

	<div class="steps-grid">
		{#each PARTICIPATION_STEPS as step, index}
			<article class="step-card surface-card" use:reveal={{ delay: index * 90 }}>
				<span class="step-card__number">{step.step}</span>
				<h3 class="step-card__title">{step.title}</h3>
				<p class="step-card__desc">{step.description}</p>
			</article>
		{/each}
	</div>
</section>
