<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { PUBLIC_INDICES } from '$lib/data/mock';
	import { formatAnnouncementDate } from '$lib/utils/format';

	const sourceLabels = {
		annonce: 'Annonce',
		tiktok: 'TikTok'
	} as const;
</script>

<section class="clues-vault surface-card p-4 sm:p-6 md:p-8" use:reveal>
	<header class="mb-6 sm:mb-8">
		<p class="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-leveling-blue-light/70">
			Transmissions officielles
		</p>
		<h2 class="section-title">Indices publiés</h2>
		<p class="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
			Seuls les indices diffusés via les annonces Discord et les paliers TikTok atteints apparaissent
			ici. De nouvelles transmissions seront ajoutées au fil de l’événement.
		</p>
	</header>

	{#if PUBLIC_INDICES.length === 0}
		<div class="empty-state">
			<svg class="empty-state__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
			</svg>
			<p class="empty-state__title">Aucun indice publié pour le moment</p>
			<p class="empty-state__desc">La prochaine transmission apparaîtra ici après une annonce officielle.</p>
		</div>
	{:else}
		<div class="clues-vault__grid">
			{#each PUBLIC_INDICES as index, i (index.id)}
				<article class="clue-file clue-file--unlocked" use:reveal={{ delay: i * 60 }}>
					<div class="clue-file__header">
						<time datetime={index.date} class="clue-file__id text-zinc-500">
							{formatAnnouncementDate(index.date)}
						</time>
						<span class="clue-file__status clue-file__status--open">
							{sourceLabels[index.source]}
						</span>
					</div>

					<h3 class="clue-file__title">{index.title}</h3>
					<p class="clue-file__content">{index.content}</p>

					<div class="clue-file__corners" aria-hidden="true">
						<span></span><span></span><span></span><span></span>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</section>
