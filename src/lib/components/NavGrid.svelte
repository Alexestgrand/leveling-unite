<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { NAV_LINKS } from '$lib/data/mock';
</script>

<section class="relative">
	<header class="mb-8 text-center sm:mb-10" use:reveal>
		<p class="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-leveling-blue-light/70 sm:text-xs sm:tracking-[0.35em]">
			Accès rapide
		</p>
		<h2 class="section-title">Explorez l'événement</h2>
		<p class="mx-auto mt-3 max-w-2xl px-1 text-sm text-zinc-400 sm:mt-4 md:text-base">
			Règles, indices, objectifs TikTok, déroulé et récompenses — tout ce dont vous avez besoin pour
			rejoindre l'enquête collective.
		</p>
	</header>

	<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
		{#each NAV_LINKS as link, index (link.href)}
			<a
				href={link.href}
				class="group nav-card"
				use:reveal={{ delay: index * 70 }}
			>
				<div class="nav-card-icon group-hover:border-leveling-blue/60 group-hover:bg-leveling-blue/20 group-hover:glow-neon">
					<span class="font-display text-lg font-bold">{link.icon}</span>
				</div>
				<h3 class="font-display text-base font-bold uppercase tracking-wider text-white md:text-lg">
					{link.title}
				</h3>
				<p class="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{link.description}</p>
				<span
					class="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-leveling-blue-light transition-transform duration-300 group-hover:translate-x-1.5"
				>
					Accéder
					<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
					</svg>
				</span>
				<div
					class="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-leveling-blue/5 blur-2xl transition-opacity duration-500 group-hover:bg-leveling-blue/12"
					aria-hidden="true"
				></div>
			</a>
		{/each}
	</div>
</section>
