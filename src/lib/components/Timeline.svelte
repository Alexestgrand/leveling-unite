<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { ANNOUNCEMENTS, type AnnouncementTag } from '$lib/data/mock';
	import { formatAnnouncementDate } from '$lib/utils/format';

	const tagStyles: Record<AnnouncementTag, string> = {
		URGENT: 'tag-urgent',
		INDICE: 'tag-indice',
		RÈGLE: 'tag-regle'
	};
</script>

<section>
	<header class="mb-10 text-center md:mb-12" use:reveal>
		<p class="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-leveling-blue-light/70">
			Transmissions du staff
		</p>
		<h2 class="section-title">Le Journal de bord</h2>
		<p class="mx-auto mt-4 max-w-xl text-sm text-zinc-500 md:text-base">
			Annonces officielles, indices et alertes — restez synchronisés avec l'événement.
		</p>
	</header>

	<div class="card-glass px-6 py-10 md:px-8" use:reveal={{ delay: 100 }}>
		<div class="relative ml-3 border-l-2 border-leveling-blue/30 pl-8 md:ml-4 md:pl-10">
			{#each ANNOUNCEMENTS as announcement, index (announcement.id)}
				<article class="relative pb-10 last:pb-0" use:reveal={{ delay: index * 90 }}>
					<div
						class="absolute -left-[calc(1rem+5px)] top-1.5 size-3 rounded-full border-2 border-leveling-blue bg-zinc-950 transition-shadow duration-500 md:-left-[calc(1.25rem+5px)]"
						class:glow-neon={index === 0}
						aria-hidden="true"
					></div>

					<div
						class="rounded-xl border border-leveling-blue/10 bg-zinc-950/40 p-5 backdrop-blur-sm transition-all duration-500 md:p-6"
						class:glow-neon={index === 0}
					>
						<div class="mb-3 flex flex-wrap items-center gap-3">
							<time datetime={announcement.date} class="text-xs font-semibold text-zinc-500 md:text-sm">
								{formatAnnouncementDate(announcement.date)}
							</time>
							<span
								class="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider md:text-xs {tagStyles[announcement.tag]}"
							>
								[{announcement.tag}]
							</span>
						</div>
						<p class="text-sm leading-relaxed text-zinc-300 md:text-base">{announcement.content}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
