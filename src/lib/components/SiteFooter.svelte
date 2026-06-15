<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { EVENT, HEADER_NAV } from '$lib/data/mock';
</script>

<footer class="site-footer" use:reveal>
	<div class="site-footer__grid">
		<div class="site-footer__brand">
			<span class="site-footer__logo" aria-hidden="true">L</span>
			<div>
				<p class="font-display text-sm font-bold uppercase tracking-wider text-white">
					{EVENT.title}
				</p>
				<p class="text-xs text-zinc-500">{EVENT.subtitle}</p>
			</div>
		</div>

		<nav class="site-footer__nav" aria-label="Liens du pied de page">
			<p class="site-footer__nav-title">Navigation</p>
			<ul>
				<li><a href="/">Accueil</a></li>
				{#each HEADER_NAV as link}
					<li><a href={link.href}>{link.label}</a></li>
				{/each}
				<li><a href="/concept">Concept</a></li>
			</ul>
		</nav>

		<div class="site-footer__info">
			<p class="site-footer__nav-title">Événement</p>
			<ul class="site-footer__meta">
				<li>Fin — {EVENT.endDateLabel}</li>
				<li>Durée — {EVENT.duration}</li>
			</ul>
			<div class="site-footer__cta">
				<span class="site-footer__cta-icon" aria-hidden="true">
					<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
					</svg>
				</span>
				<span>{EVENT.discordLabel}</span>
			</div>
		</div>
	</div>

	<div class="site-footer__bottom">
		<p class="font-display text-[0.65rem] uppercase tracking-[0.15em] text-zinc-600 sm:text-xs sm:tracking-[0.25em]">
			{EVENT.title} — {EVENT.subtitle}
		</p>
		<p class="mt-2 text-sm text-zinc-500">{EVENT.tagline}</p>
	</div>
</footer>
