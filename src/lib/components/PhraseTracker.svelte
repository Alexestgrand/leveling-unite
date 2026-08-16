<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { CADRAN_CREUX, EXPECTED_PHRASE_WORDS, FRAGMENTS, type FragmentQuest } from '$lib/data/mock';

	type SlotStatus = 'locked' | 'open' | 'validated' | 'lost';

	interface Slot {
		n: number;
		status: SlotStatus;
		fragment: FragmentQuest | null;
	}

	interface Props {
		/** Lien « voir les énigmes » sous le board (accueil). */
		showBoardLink?: boolean;
		/** Titre personnalisé du board (accueil). */
		boardTitle?: string;
	}

	let { showBoardLink = true, boardTitle }: Props = $props();

	const slots: Slot[] = Array.from({ length: EXPECTED_PHRASE_WORDS }, (_, i) => {
		const n = i + 1;
		const fragment = FRAGMENTS.find((f) => f.wordSlot === n) ?? null;
		const status: SlotStatus = fragment
			? fragment.status === 'upcoming'
				? 'locked'
				: fragment.status
			: 'locked';
		return { n, status, fragment };
	});

	const validatedCount = slots.filter((s) => s.status === 'validated').length;
	const openCount = slots.filter((s) => s.status === 'open').length;
	const lostCount = slots.filter((s) => s.status === 'lost').length;

	const glyphs: Record<SlotStatus, string> = {
		locked: '?',
		open: '◆',
		validated: '✓',
		lost: '✕'
	};

	function slotTitle(slot: Slot): string {
		if (slot.status === 'open')
			return `Mot ${slot.n} — en jeu, porté par @${slot.fragment?.discordUsername}. Ouvrir la quête.`;
		if (slot.status === 'validated') return `Mot ${slot.n} — sécurisé. Voir le détail.`;
		if (slot.status === 'lost') return `Mot ${slot.n} — perdu (rattrapage via TikTok). Voir le détail.`;
		if (slot.fragment) return `Mot ${slot.n} — verrouillé. Voir la fiche.`;
		return `Mot ${slot.n} — verrouillé. Voir les Fragmentés.`;
	}

	function slotHref(slot: Slot): string {
		return slot.fragment ? `/fragmentes#mot-${slot.n}` : '/fragmentes';
	}

	/** Cinq plaques parasites sous les 15 cadres — le compte est le signal. */
	const IMPOSTOR_PLAQUES = [
		{ num: '0̸', glyph: '░' },
		{ num: '??', glyph: '¤' },
		{ num: '//', glyph: '■' },
		{ num: '×', glyph: '?' },
		{ num: '1̷5', glyph: '◆' }
	] as const;
</script>

<div class="phrase-board surface-card" data-tour="tour-phrase" use:reveal>
	<div class="phrase-board__head">
		<p class="phrase-board__title">
			<span class="phrase-board__title-glyph" aria-hidden="true">◈</span>
			{boardTitle ?? `La phrase — ${EXPECTED_PHRASE_WORDS} fragments`}
		</p>
		<p class="phrase-board__count">
			<span class="phrase-board__count-value">{validatedCount}</span>/{EXPECTED_PHRASE_WORDS} sécurisés
		</p>
	</div>

	<div class="phrase-board__slots" aria-label="Progression de la phrase secrète">
		{#each slots as slot (slot.n)}
			<a
				href={slotHref(slot)}
				class="phrase-slot phrase-slot--{slot.status} phrase-slot--link"
				class:phrase-slot--celebrate={slot.status === 'validated'}
				title={slotTitle(slot)}
				aria-label={slotTitle(slot)}
			>
				<span class="phrase-slot__num">{slot.n}</span>
				<span class="phrase-slot__glyph" aria-hidden="true">{glyphs[slot.status]}</span>
			</a>
		{/each}
	</div>

	<div class="phrase-board__impostors" aria-hidden="true">
		{#each IMPOSTOR_PLAQUES as plaque, index (plaque.glyph)}
			<span
				class="phrase-slot phrase-slot--impostor"
				style="--impostor-delay: {index * 0.37}s"
			>
				<span class="phrase-slot__num">{plaque.num}</span>
				<span class="phrase-slot__glyph" data-text={plaque.glyph}>{plaque.glyph}</span>
				<span class="phrase-slot__impostor-noise">{plaque.num}</span>
			</span>
		{/each}
	</div>

	<div class="phrase-board__legend">
		<span class="phrase-board__legend-item phrase-board__legend-item--open">
			<span class="phrase-board__legend-dot" aria-hidden="true"></span>
			{openCount} en jeu
		</span>
		<span class="phrase-board__legend-item phrase-board__legend-item--validated">
			<span class="phrase-board__legend-dot" aria-hidden="true"></span>
			{validatedCount} sécurisés
		</span>
		<span class="phrase-board__legend-item phrase-board__legend-item--lost">
			<span class="phrase-board__legend-dot" aria-hidden="true"></span>
			{lostCount} perdus
		</span>
		<span class="phrase-board__legend-item phrase-board__legend-item--locked">
			<span class="phrase-board__legend-dot" aria-hidden="true"></span>
			{EXPECTED_PHRASE_WORDS - validatedCount - openCount - lostCount} verrouillés
		</span>
	</div>

	{#if showBoardLink}
		<a href="/fragmentes" class="phrase-board__link">
			{CADRAN_CREUX.active ? 'Ouvrir le Cadran Creux' : 'Voir les énigmes en cours'}
			<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
			</svg>
		</a>
	{/if}
</div>
