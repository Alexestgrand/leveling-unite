<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import NavIcon from '$lib/components/NavIcon.svelte';
	import { NAV_LINKS } from '$lib/data/mock';

	const playHrefs = new Set(['/fragmentes', '/indices', '/objectif-tiktok']);
	const playLinks = NAV_LINKS.filter((l) => playHrefs.has(l.href));
	const discoverLinks = NAV_LINKS.filter((l) => !playHrefs.has(l.href));
</script>

<section class="relative space-y-10 sm:space-y-12">
	<div>
		<SectionIntro
			eyebrow="Jouer"
			title="Actions de l'enquête"
			description="Les pages pour avancer dans les énigmes et la phrase."
		/>

		<div class="nav-grid">
			{#each playLinks as link, index (link.href)}
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
						<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
						</svg>
					</span>
				</a>
			{/each}
		</div>
	</div>

	<div>
		<SectionIntro
			eyebrow="Découvrir"
			title="Comprendre le cadre"
			description="Règles, déroulé, récompenses et concept — pour ne pas jouer à l'aveugle."
		/>

		<div class="nav-grid">
			{#each discoverLinks as link, index (link.href)}
				<a
					href={link.href}
					class="nav-card surface-card"
					use:reveal={{ delay: index * 70 }}
				>
					<div class="nav-card-icon">
						<NavIcon name={link.icon} class="size-5 sm:size-6" />
					</div>
					<h3 class="nav-card__title">{link.title}</h3>
					<p class="nav-card__desc">{link.description}</p>
					<span class="nav-card__cta">
						Accéder
						<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
						</svg>
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>
