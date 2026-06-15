<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import NavIcon from '$lib/components/NavIcon.svelte';
	import { NAV_LINKS } from '$lib/data/mock';
</script>

<section class="relative">
	<SectionIntro
		eyebrow="Aller plus loin"
		title="Explorez l'événement"
		description="Chaque page détaille un aspect de l'enquête : règles, indices, TikTok, déroulé, récompenses et rôles."
	/>

	<div class="nav-grid">
		{#each NAV_LINKS as link, index (link.href)}
			<a
				href={link.href}
				class="nav-card surface-card"
				class:nav-card--featured={link.featured}
				use:reveal={{ delay: index * 70 }}
			>
				<div class="nav-card-icon">
					<NavIcon name={link.icon} class="size-5 sm:size-6" />
				</div>
				<h3 class="nav-card__title">{link.title}</h3>
				<p class="nav-card__desc">{link.description}</p>
				<span class="nav-card__cta">
					Accéder
					<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
					</svg>
				</span>
			</a>
		{/each}
	</div>
</section>
