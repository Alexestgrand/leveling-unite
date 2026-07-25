<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import { ANNOUNCEMENTS, EVENT, type AnnouncementTag } from '$lib/data/mock';
	import { formatAnnouncementDate, formatRelativeDate } from '$lib/utils/format';

	interface Props {
		/** Nombre max d'annonces affichées (accueil). */
		limit?: number;
	}

	let { limit }: Props = $props();

	const tagStyles: Record<AnnouncementTag, string> = {
		URGENT: 'tag-urgent',
		INDICE: 'tag-indice',
		RÈGLE: 'tag-regle'
	};

	const visible = $derived(typeof limit === 'number' ? ANNOUNCEMENTS.slice(0, limit) : ANNOUNCEMENTS);
	const hasMore = $derived(typeof limit === 'number' && ANNOUNCEMENTS.length > limit);
</script>

<section id="journal">
	<SectionIntro
		eyebrow="Transmissions"
		title="Le journal de bord"
		description="Les annonces officielles, dans l'ordre. Rien d'autre ne fait foi."
	/>

	<div class="surface-card timeline-panel" use:reveal={{ delay: 100 }}>
		{#if ANNOUNCEMENTS.length === 0}
			<div class="empty-state">
				<svg class="empty-state__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.75c0-.621.504-1.125 1.125-1.125h16.5c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-8.25Z" />
				</svg>
				<p class="empty-state__title">Canal silencieux</p>
				<p class="empty-state__desc">
					Aucune transmission staff pour le moment. Le prochain brief arrivera ici — et sur Discord.
				</p>
				<a
					href={EVENT.discordUrl}
					class="section-intro__link mt-4"
					rel="noopener noreferrer"
					target="_blank"
				>
					Ouvrir le serveur
					<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
					</svg>
				</a>
			</div>
		{:else}
			<div class="timeline-track">
				{#each visible as announcement, index (announcement.id)}
					<article class="timeline-item" use:reveal={{ delay: index * 90 }}>
						<div
							class="timeline-item__dot"
							class:timeline-item__dot--urgent={announcement.tag === 'URGENT'}
							class:timeline-item__dot--live={index === 0}
							aria-hidden="true"
						></div>

						<div
							class="timeline-item__card surface-card"
							class:timeline-item__card--urgent={announcement.tag === 'URGENT'}
						>
							<div class="mb-3 flex flex-wrap items-center gap-3">
								<time
									datetime={announcement.date}
									class="text-xs font-semibold text-zinc-500 md:text-sm"
									title={formatAnnouncementDate(announcement.date)}
								>
									{formatRelativeDate(announcement.date)}
								</time>
								<span class="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider md:text-xs {tagStyles[announcement.tag]}">
									{announcement.tag}
								</span>
							</div>
							<p class="text-sm leading-relaxed text-zinc-200 md:text-base">{announcement.content}</p>
						</div>
					</article>
				{/each}
			</div>

			{#if hasMore}
				<p class="mt-5 text-center text-xs text-zinc-500">
					{ANNOUNCEMENTS.length - (limit ?? 0)} transmission(s) plus ancienne(s) — les annonces
					complètes restent sur Discord.
				</p>
			{/if}
		{/if}
	</div>
</section>
