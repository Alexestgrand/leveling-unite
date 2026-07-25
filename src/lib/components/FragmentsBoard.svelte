<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import {
		CURRENT_PHASE_INDEX,
		FRAGMENTS,
		FRAGMENT_MODE_INTRO,
		PHASES,
		type FragmentCamp,
		type FragmentQuest,
		type FragmentStatus
	} from '$lib/data/mock';

	const campLabel: Record<FragmentCamp, string> = {
		communaute: 'Communauté',
		staff: 'Staff'
	};

	const statusLabel: Record<FragmentStatus, string> = {
		upcoming: 'À venir',
		open: 'En cours',
		validated: 'Validé',
		lost: 'Mot perdu'
	};

	const currentWave = CURRENT_PHASE_INDEX >= 0 ? CURRENT_PHASE_INDEX + 1 : 1;
	const waveName = PHASES[currentWave - 1]?.name ?? `Vague ${currentWave}`;

	const waveFragments = $derived(
		FRAGMENTS.filter((f) => f.wave === currentWave).sort((a, b) => {
			const slotA = a.wordSlot ?? 99;
			const slotB = b.wordSlot ?? 99;
			if (slotA !== slotB) return slotA - slotB;
			return a.discordUsername.localeCompare(b.discordUsername);
		})
	);

	const members = $derived(waveFragments.filter((f) => f.camp === 'communaute'));
	const staff = $derived(waveFragments.filter((f) => f.camp === 'staff'));

	function statusClass(status: FragmentStatus): string {
		if (status === 'validated') return 'fragment-card--validated';
		if (status === 'open') return 'fragment-card--open';
		if (status === 'lost') return 'fragment-card--lost';
		return 'fragment-card--upcoming';
	}
</script>

{#snippet fragmentCard(fragment: FragmentQuest, index: number)}
	<article
		class="fragment-card surface-card hud-panel clip-corners {statusClass(fragment.status)}"
		use:reveal={{ delay: index * 60 }}
	>
		<header class="fragment-card__head">
			<div class="fragment-card__meta">
				<span class="fragment-card__camp fragment-card__camp--{fragment.camp}">
					{campLabel[fragment.camp]}
				</span>
				{#if fragment.wordSlot !== null}
					<span class="fragment-card__slot">Mot {fragment.wordSlot}/15</span>
				{/if}
			</div>
			<span class="fragment-card__status fragment-card__status--{fragment.status}">
				{statusLabel[fragment.status]}
			</span>
		</header>

		<p class="fragment-card__bearer">
			<span class="fragment-card__bearer-label">Porteur</span>
			<span class="fragment-card__username">@{fragment.discordUsername}</span>
		</p>

		{#if fragment.status === 'upcoming' && !fragment.enigma.trim()}
			<p class="fragment-card__enigma fragment-card__enigma--empty">Énigme à publier…</p>
		{:else}
			<div class="fragment-card__enigma">
				<p class="fragment-card__enigma-label">Énigme</p>
				<p class="fragment-card__enigma-text">{fragment.enigma}</p>
			</div>
		{/if}

		{#if fragment.status === 'validated' && fragment.metaHint}
			<div class="fragment-card__hint">
				<p class="fragment-card__hint-label">Indice officiel (meta)</p>
				<p class="fragment-card__hint-text">{fragment.metaHint}</p>
			</div>
		{/if}

		{#if fragment.status === 'lost'}
			<div class="fragment-card__hint fragment-card__hint--lost">
				<p class="fragment-card__hint-label">Mot perdu</p>
				<p class="fragment-card__hint-text">
					Essai raté ou délai dépassé. Ce mot ne sera révélé — aux deux camps — qu’au prochain
					palier TikTok atteint.
				</p>
			</div>
		{/if}
	</article>
{/snippet}

<section class="fragments-board space-y-6">
	<div class="surface-card hud-panel clip-corners p-5 sm:p-6" use:reveal>
		<p class="section-eyebrow">
			<span class="section-eyebrow__dot" aria-hidden="true"></span>
			{waveName}
		</p>
		<ul class="mt-4 space-y-2 text-sm leading-relaxed text-zinc-300">
			{#each FRAGMENT_MODE_INTRO as line}
				<li class="flex gap-2">
					<span class="text-leveling-blue-light shrink-0" aria-hidden="true">▸</span>
					{line}
				</li>
			{/each}
		</ul>
		<p class="mt-4 text-xs text-zinc-500">
			Validation en MP à l’organisateur —
			<code class="text-zinc-400">FRAGMENT [n°] / [mot] / confirmé par Pseudo1 + Pseudo2</code>
			— les confirmateurs écrivent aussi de leur côté.
		</p>
	</div>

	{#if waveFragments.length === 0}
		<div class="surface-card hud-panel clip-corners p-8 text-center" use:reveal>
			<p class="font-display text-lg font-bold text-white">Aucun fragment publié pour l’instant</p>
			<p class="mt-2 text-sm text-zinc-400">
				Les porteurs Discord et leurs énigmes apparaîtront ici à l’ouverture de la vague
				(samedi 12h).
			</p>
		</div>
	{:else}
		{#if members.length > 0}
			<div>
				<h2 class="mb-3 font-display text-sm font-bold uppercase tracking-wider text-leveling-blue-light">
					Camp Communauté
				</h2>
				<div class="fragments-grid">
					{#each members as fragment, index}
						{@render fragmentCard(fragment, index)}
					{/each}
				</div>
			</div>
		{/if}

		{#if staff.length > 0}
			<div>
				<h2 class="mb-3 font-display text-sm font-bold uppercase tracking-wider text-amber-300/90">
					Camp Staff
				</h2>
				<div class="fragments-grid">
					{#each staff as fragment, index}
						{@render fragmentCard(fragment, index + members.length)}
					{/each}
				</div>
			</div>
		{/if}
	{/if}
</section>
