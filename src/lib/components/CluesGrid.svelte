<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import { EVENT, PUBLIC_INDICES } from '$lib/data/mock';
	import { formatAnnouncementDate, formatRelativeDate } from '$lib/utils/format';

	const sourceLabels = {
		annonce: 'Annonce',
		tiktok: 'TikTok'
	} as const;

	/** Chronologie : du plus récent au plus ancien. */
	const chronology = $derived(
		[...PUBLIC_INDICES].sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		)
	);

	onMount(() => {
		const hash = window.location.hash.slice(1);
		if (!hash) return;
		const el = document.getElementById(hash);
		el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	});
</script>

<section class="clues-vault surface-card p-4 sm:p-6 md:p-8" use:reveal>
	<header class="mb-8 sm:mb-10">
		<p class="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-leveling-blue-light/70">
			Vault d’enquête
		</p>
		<h2 class="section-title">Chronologie des indices</h2>
		<p class="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
			Chaque transmission officielle, dans l’ordre où elle a été interceptée. Du plus récent au plus
			ancien.
		</p>
		{#if chronology.length > 0}
			<p class="clues-chrono__count mt-4">
				<span>{chronology.length}</span>
				signal{chronology.length > 1 ? 'aux' : ''} enregistré{chronology.length > 1 ? 's' : ''}
			</p>
		{/if}
	</header>

	{#if chronology.length === 0}
		<div class="empty-state">
			<svg class="empty-state__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
			</svg>
			<p class="empty-state__title">Vault encore vide</p>
			<p class="empty-state__desc">
				Aucune révélation staff / TikTok pour l’instant. Les énigmes des porteurs sont sur Fragmentés —
				l’entraide vit sur Discord.
			</p>
			<div class="mt-5 flex flex-wrap items-center justify-center gap-3">
				<a href="/fragmentes" class="section-intro__link">Voir les quêtes</a>
				<a
					href={EVENT.discordUrl}
					class="section-intro__link"
					rel="noopener noreferrer"
					target="_blank"
				>
					Ouvrir Discord
				</a>
			</div>
		</div>
	{:else}
		<ol class="clues-chrono">
			{#each chronology as index, i (index.id)}
				<li
					id={index.id}
					class="clues-chrono__item"
					class:clues-chrono__item--latest={i === 0}
					use:reveal={{ delay: i * 80 }}
				>
					<div class="clues-chrono__rail" aria-hidden="true">
						<span class="clues-chrono__node">
							{String(chronology.length - i).padStart(2, '0')}
						</span>
					</div>

					<article class="clues-chrono__card">
						<header class="clues-chrono__meta">
							<time datetime={index.date} title={formatAnnouncementDate(index.date)}>
								{formatRelativeDate(index.date)}
							</time>
							<span class="clues-chrono__source clues-chrono__source--{index.source}">
								{sourceLabels[index.source]}
							</span>
							{#if i === 0}
								<span class="clues-chrono__live">Dernier signal</span>
							{/if}
						</header>

						<h3 class="clues-chrono__title">{index.title}</h3>
						<p class="clues-chrono__body">{index.content}</p>

						{#if index.url}
							<a
								class="clues-chrono__link"
								href={index.url}
								target="_blank"
								rel="noopener noreferrer"
							>
								Voir la transmission
								<span aria-hidden="true">↗</span>
							</a>
						{/if}
					</article>
				</li>
			{/each}
		</ol>
	{/if}
</section>
