<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { EXPECTED_PHRASE_WORDS, FRAGMENTS, type FragmentQuest } from '$lib/data/mock';

	type SlotStatus = 'locked' | 'open' | 'validated' | 'lost';

	interface Slot {
		n: number;
		status: SlotStatus;
		fragment: FragmentQuest | null;
	}

	const slots: Slot[] = Array.from({ length: EXPECTED_PHRASE_WORDS }, (_, i) => {
		const n = i + 1;
		const fragment = FRAGMENTS.find((f) => f.wordSlot === n) ?? null;
		const status: SlotStatus = fragment ? (fragment.status === 'upcoming' ? 'locked' : fragment.status) : 'locked';
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
		if (slot.status === 'open') return `Mot ${slot.n} — en jeu, porté par @${slot.fragment?.discordUsername}`;
		if (slot.status === 'validated') return `Mot ${slot.n} — sécurisé`;
		if (slot.status === 'lost') return `Mot ${slot.n} — perdu (rattrapage via TikTok)`;
		return `Mot ${slot.n} — verrouillé`;
	}
</script>

<div class="phrase-board surface-card" use:reveal>
	<div class="phrase-board__head">
		<p class="phrase-board__title">
			<span class="phrase-board__title-glyph" aria-hidden="true">◈</span>
			La phrase — {EXPECTED_PHRASE_WORDS} fragments
		</p>
		<p class="phrase-board__count">
			<span class="phrase-board__count-value">{validatedCount}</span>/{EXPECTED_PHRASE_WORDS} sécurisés
		</p>
	</div>

	<div class="phrase-board__slots" role="list" aria-label="Progression de la phrase secrète">
		{#each slots as slot (slot.n)}
			<div
				class="phrase-slot phrase-slot--{slot.status}"
				role="listitem"
				title={slotTitle(slot)}
			>
				<span class="phrase-slot__num">{slot.n}</span>
				<span class="phrase-slot__glyph" aria-hidden="true">{glyphs[slot.status]}</span>
				<span class="sr-only">{slotTitle(slot)}</span>
			</div>
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
</div>
