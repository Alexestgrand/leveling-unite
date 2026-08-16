<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import PhraseTracker from '$lib/components/PhraseTracker.svelte';
	import CadranChallenge from '$lib/components/CadranChallenge.svelte';
	import {
		CURRENT_PHASE_INDEX,
		DEADLINE_URGENCY_HOURS,
		EVENT,
		FRAGMENTS,
		FRAGMENT_MODE_INTRO_BASE,
		FRAGMENT_MODE_EDIT_NOTE,
		WAVE_INTROS,
		PHASES,
		WAVE_DEADLINES,
		CREUX_RESOLUTION,
		CREUX_PENDING,
		CADRAN_CREUX,
		isSursisAvailableForWave,
		isSursisAvailableForCamp,
		getSursisWaveNote,
		CREUX_CAMP_LABEL,
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
	const waveIntro = $derived(WAVE_INTROS[currentWave] ?? null);
	const cadranActive = CADRAN_CREUX.active && currentWave === 4;
	const sursisAvailable = $derived(!cadranActive && isSursisAvailableForWave(currentWave));
	const sursisCommunaute = $derived(isSursisAvailableForCamp(currentWave, 'communaute'));
	const sursisStaff = $derived(isSursisAvailableForCamp(currentWave, 'staff'));
	const sursisNote = $derived(getSursisWaveNote(currentWave));

	let nowMs = $state(Date.now());

	const waveDeadlineLabel = $derived.by(() => {
		const iso = WAVE_DEADLINES[currentWave];
		if (!iso) return null;
		return new Intl.DateTimeFormat('fr-FR', {
			day: 'numeric',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit'
		}).format(new Date(iso));
	});

	const deadlineUrgent = $derived.by(() => {
		const iso = WAVE_DEADLINES[currentWave];
		if (!iso) return false;
		const end = new Date(iso).getTime();
		const windowMs = DEADLINE_URGENCY_HOURS * 60 * 60 * 1000;
		return nowMs >= end - windowMs;
	});

	function sortFragments(list: FragmentQuest[]): FragmentQuest[] {
		return [...list].sort((a, b) => {
			const slotA = a.wordSlot ?? 99;
			const slotB = b.wordSlot ?? 99;
			if (slotA !== slotB) return slotA - slotB;
			return a.discordUsername.localeCompare(b.discordUsername);
		});
	}

	const waveFragments = $derived(
		sortFragments(FRAGMENTS.filter((f) => f.wave === currentWave))
	);

	const members = $derived(waveFragments.filter((f) => f.camp === 'communaute'));
	const staff = $derived(waveFragments.filter((f) => f.camp === 'staff'));

	const pastWaves = $derived(
		[...new Set(FRAGMENTS.map((f) => f.wave))]
			.filter((w) => w < currentWave)
			.sort((a, b) => b - a)
	);

	let archiveWave = $state<number | null>(currentWave > 1 ? currentWave - 1 : null);
	let focusedSlot = $state<number | null>(null);

	const archiveFragments = $derived(
		archiveWave === null
			? []
			: sortFragments(FRAGMENTS.filter((f) => f.wave === archiveWave))
	);
	const archiveMembers = $derived(archiveFragments.filter((f) => f.camp === 'communaute'));
	const archiveStaff = $derived(archiveFragments.filter((f) => f.camp === 'staff'));
	const archiveWaveName = $derived(
		archiveWave === null ? '' : (PHASES[archiveWave - 1]?.name ?? `Vague ${archiveWave}`)
	);

	function toggleArchive(wave: number) {
		archiveWave = archiveWave === wave ? null : wave;
	}

	function statusClass(status: FragmentStatus): string {
		if (status === 'validated') return 'fragment-card--validated';
		if (status === 'open') return 'fragment-card--open';
		if (status === 'lost') return 'fragment-card--lost';
		return 'fragment-card--upcoming';
	}

	/** Première ligne en MAJUSCULES = nom de l'énigme (L'ANCRE, LE SABLIER…). */
	function enigmaParts(text: string): { name: string | null; body: string } {
		const trimmed = text.trim();
		const lines = trimmed.split('\n');
		const first = (lines[0] ?? '').trim();
		if (lines.length > 1 && first.length > 0 && first.length <= 26 && first === first.toUpperCase()) {
			return { name: first, body: lines.slice(1).join('\n').trim() };
		}
		return { name: null, body: trimmed };
	}

	function cardId(fragment: FragmentQuest): string | undefined {
		return fragment.wordSlot !== null ? `mot-${fragment.wordSlot}` : undefined;
	}

	function focusFromHash() {
		const hash = window.location.hash.replace(/^#/, '');
		const match = /^mot-(\d+)$/.exec(hash);
		if (!match) return;

		const slot = Number(match[1]);
		focusedSlot = slot;
		const el = document.getElementById(`mot-${slot}`);
		if (!el) return;

		el.scrollIntoView({ behavior: 'smooth', block: 'center' });
		window.setTimeout(() => {
			if (focusedSlot === slot) focusedSlot = null;
		}, 2400);
	}

	onMount(() => {
		focusFromHash();
		window.addEventListener('hashchange', focusFromHash);
		const tickId = window.setInterval(() => {
			nowMs = Date.now();
		}, 60_000);
		return () => {
			window.removeEventListener('hashchange', focusFromHash);
			window.clearInterval(tickId);
		};
	});
</script>

{#snippet fragmentCard(fragment: FragmentQuest, index: number)}
	{@const parts = enigmaParts(fragment.enigma)}
	{@const id = cardId(fragment)}
	{@const urgent = deadlineUrgent && fragment.status === 'open'}
	<article
		{id}
		class="fragment-card surface-card {statusClass(fragment.status)}"
		class:fragment-card--focus={focusedSlot !== null && fragment.wordSlot === focusedSlot}
		class:fragment-card--validated-pulse={fragment.status === 'validated'}
		class:fragment-card--deadline-urgent={urgent}
		data-tour={index === 0 ? 'tour-porteur' : undefined}
		use:reveal={{ delay: index * 60 }}
		tabindex="-1"
	>
		{#if fragment.status === 'validated'}
			<p class="fragment-card__system-log" role="status">
				FRAGMENT_{fragment.wordSlot?.toString().padStart(2, '0') ?? '??'} · VALIDATED
			</p>
		{/if}

		<header class="fragment-card__head">
			<span class="fragment-card__quest">
				<span class="fragment-card__quest-glyph" aria-hidden="true">◈</span>
				Quête
				{#if fragment.wordSlot !== null}
					· Mot {fragment.wordSlot}/15
				{/if}
			</span>
			<span
				class="fragment-card__status fragment-card__status--{fragment.status}"
				class:fragment-card__status--urgent={urgent}
			>
				{urgent ? 'Échéance proche' : statusLabel[fragment.status]}
			</span>
		</header>

		<p class="fragment-card__bearer">
			<span class="fragment-card__avatar fragment-card__avatar--{fragment.camp}" aria-hidden="true">
				{fragment.discordUsername.charAt(0).toUpperCase()}
			</span>
			<span class="fragment-card__bearer-text">
				<span class="fragment-card__bearer-label">Porteur · {campLabel[fragment.camp]}</span>
				<span class="fragment-card__username">@{fragment.discordUsername}</span>
			</span>
		</p>

		{#if fragment.note}
			<p class="fragment-card__note">
				<span aria-hidden="true">✦</span>
				{fragment.note}
			</p>
		{/if}

		{#if fragment.status === 'upcoming' && !fragment.enigma.trim()}
			<p class="fragment-card__enigma fragment-card__enigma--empty">Énigme à publier…</p>
		{:else}
			<div
				class="fragment-card__enigma-wrap"
				class:fragment-card__enigma-wrap--secured={fragment.status === 'validated'}
				class:fragment-card__enigma-wrap--sealed-lost={fragment.status === 'lost'}
			>
				<div class="fragment-card__enigma">
					{#if parts.name}
						<p class="fragment-card__enigma-name">{parts.name}</p>
					{:else}
						<p class="fragment-card__enigma-label">Énigme</p>
					{/if}
					<p class="fragment-card__enigma-text">{parts.body}</p>
				</div>
				{#if fragment.status === 'validated'}
					<div class="fragment-card__secured" aria-hidden="true">
						<svg
							class="fragment-card__secured-icon"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
						<span class="fragment-card__secured-label">Mot sécurisé</span>
					</div>
				{:else if fragment.status === 'lost'}
					<div class="fragment-card__sealed" aria-hidden="true">
						<svg class="fragment-card__sealed-skull" viewBox="0 0 64 64">
							<path
								fill="currentColor"
								d="M32 6c-12.4 0-22 9.2-22 22.2 0 7.4 3.4 13.2 8.2 17.2V52c0 2.2 1.8 4 4 4h3.2l1.6 4h10l1.6-4H41c2.2 0 4-1.8 4-4v-6.6c4.8-4 8.2-9.8 8.2-17.2C53.2 15.2 44.4 6 32 6zm-9 22.5c0-2.5 2-4.5 4.5-4.5S32 26 32 28.5 30 33 27.5 33 23 31 23 28.5zm18 0c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5-4.5-2-4.5-4.5zM24 42c0-4.4 3.6-6 8-6s8 1.6 8 6H24z"
							/>
							<circle cx="27.5" cy="28.5" r="2.2" fill="#120303" />
							<circle cx="41.5" cy="28.5" r="2.2" fill="#120303" />
						</svg>
						<span class="fragment-card__sealed-q">?</span>
					</div>
				{/if}
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
					Une porte de rattrapage s'est ouverte sur l'objectif TikTok. Franchie, elle révélera ce
					mot — aux deux camps.
				</p>
			</div>
		{/if}
	</article>
{/snippet}

<section class="fragments-board space-y-5 sm:space-y-6" data-tour="tour-fragmentes">
	<PhraseTracker showBoardLink={false} />

	{#if cadranActive}
		<CadranChallenge />
	{:else if CREUX_PENDING.active}
		<a href="/creux" class="fragments-board__creux-link surface-card" use:reveal>
			<span class="fragments-board__creux-link-eyebrow">
				<span class="fragments-board__sursis-pulse" aria-hidden="true"></span>
				{CREUX_PENDING.betweenLabel}
			</span>
			<span class="fragments-board__creux-link-title">{CREUX_PENDING.title}</span>
			<span class="fragments-board__creux-link-cta">Voir le Creux →</span>
		</a>
	{/if}

	{#if !cadranActive && CREUX_RESOLUTION.resolved && CREUX_RESOLUTION.chosenRuleId === 'sursis'}
		<div class="fragments-board__sursis" use:reveal role="note">
			<p class="fragments-board__sursis-badge">
				<span class="fragments-board__sursis-pulse" aria-hidden="true"></span>
				Édit du Creux · Le Sursis
			</p>
			{#if sursisAvailable}
				<p class="fragments-board__sursis-text">
					Sur <strong>{waveName}</strong>, un Fragmenté par camp peut invoquer un
					<strong>second essai</strong> après un premier refus :
				</p>
				<ul class="fragments-board__sursis-camps">
					<li class:fragments-board__sursis-camp--ready={sursisCommunaute}>
						<strong>{CREUX_CAMP_LABEL.communaute}</strong> —
						{sursisCommunaute ? '1 Sursis disponible' : 'Sursis épuisé ou expiré'}
					</li>
					<li class:fragments-board__sursis-camp--ready={sursisStaff}>
						<strong>{CREUX_CAMP_LABEL.staff}</strong> —
						{sursisStaff ? '1 Sursis disponible' : 'Sursis épuisé ou expiré'}
					</li>
				</ul>
				<p class="fragments-board__sursis-footnote">
					Les Sursis ne sont pas cumulables — ni entre Fragmentés d’un même camp, ni d’une vague à
					l’autre.
				</p>
			{:else if sursisNote}
				<p class="fragments-board__sursis-text fragments-board__sursis-text--muted">{sursisNote}</p>
			{/if}
		</div>
	{/if}

	{#if !cadranActive}
	<div class="surface-card hud-panel clip-corners p-5 sm:p-6" use:reveal>
		<p class="section-eyebrow">
			<span class="section-eyebrow__dot" aria-hidden="true"></span>
			{waveName}
		</p>
		<ul class="mt-4 space-y-2 text-sm leading-relaxed text-zinc-300">
			{#each FRAGMENT_MODE_INTRO_BASE as line}
				<li class="flex gap-2">
					<span class="text-leveling-blue-light shrink-0" aria-hidden="true">▸</span>
					{line}
				</li>
			{/each}
		</ul>
		<p class="mt-3 text-sm leading-relaxed text-emerald-200/90">
			{FRAGMENT_MODE_EDIT_NOTE}
			<a href="/regles#edit-du-creux" class="ml-1 font-semibold text-emerald-300 underline underline-offset-2">
				Voir l'édit
			</a>
		</p>
		{#if deadlineUrgent && waveDeadlineLabel}
			<p class="fragments-board__deadline-alert" role="status">
				<span aria-hidden="true">⚠</span>
				Deadline Vague {currentWave} : {waveDeadlineLabel} — les quêtes encore ouvertes clignotent.
			</p>
		{/if}
		<p class="mt-4 text-xs text-zinc-500">
			Validation en MP à <span class="font-semibold text-zinc-300">@so_hakai</span> (organisateur) —
			<code class="text-zinc-400">FRAGMENT [n°] / [mot] / confirmé par Pseudo1 + Pseudo2</code>
			— <span class="text-zinc-400">Pseudo1 et Pseudo2 doivent être 2 autres Fragmentés du même camp</span>
			(pas des Enquêteurs). Ils écrivent aussi de leur côté.
		</p>
	</div>
	{/if}

	{#if waveIntro && !cadranActive}
		<div class="surface-card hud-panel clip-corners p-5 sm:p-6 fragments-board__wave-intro" use:reveal>
			<p class="fragment-card__enigma-text whitespace-pre-line">{waveIntro}</p>
		</div>
	{/if}

	{#if !cadranActive && waveFragments.length === 0}
		<div class="surface-card hud-panel clip-corners p-8 text-center" use:reveal>
			<p class="font-display text-lg font-bold text-white">Aucun fragment publié pour l’instant</p>
			<p class="mt-2 text-sm text-zinc-400">
				Les porteurs Discord et leurs énigmes apparaîtront ici à l’ouverture de la vague
				(samedi 12h). En attendant, le journal vit sur le serveur.
			</p>
			<a href={EVENT.discordUrl} class="section-intro__link mt-5 justify-center" rel="noopener noreferrer" target="_blank">
				Rejoindre le Discord
				<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
				</svg>
			</a>
		</div>
	{:else if !cadranActive}
		{#if members.length > 0}
			<div>
				<h2 class="fragments-board__camp-title fragments-board__camp-title--communaute">
					<span aria-hidden="true">◆</span>
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
				<h2 class="fragments-board__camp-title fragments-board__camp-title--staff">
					<span aria-hidden="true">◇</span>
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

	{#if pastWaves.length > 0}
		<section class="fragments-board__archive" aria-label="Vagues précédentes">
			<p class="section-eyebrow">
				<span class="section-eyebrow__dot" aria-hidden="true"></span>
				Archives
			</p>
			<div class="fragments-board__wave-tabs" role="tablist" aria-label="Vagues passées">
				{#each pastWaves as wave}
					<button
						type="button"
						role="tab"
						class="fragments-board__wave-tab"
						class:fragments-board__wave-tab--active={archiveWave === wave}
						aria-selected={archiveWave === wave}
						onclick={() => toggleArchive(wave)}
					>
						Vague {wave}{#if PHASES[wave - 1]?.name} — {PHASES[wave - 1].name.replace(/^Vague \d+ — /, '')}{/if}
					</button>
				{/each}
			</div>

			{#if archiveWave !== null}
				<div class="fragments-board__archive-panel" role="tabpanel">
					<p class="fragments-board__archive-title">{archiveWaveName}</p>
					<p class="fragments-board__archive-note">
						{#if archiveWave === 3}
							Vague close — les cinq mots (n°11 à 15) ont été validés.
						{:else}
							Vague close — énigmes et résultats conservés.
						{/if}
					</p>

					{#if archiveMembers.length > 0}
						<div>
							<h3 class="fragments-board__camp-title fragments-board__camp-title--communaute">
								<span aria-hidden="true">◆</span>
								Camp Communauté
							</h3>
							<div class="fragments-grid">
								{#each archiveMembers as fragment, index}
									{@render fragmentCard(fragment, index)}
								{/each}
							</div>
						</div>
					{/if}

					{#if archiveStaff.length > 0}
						<div>
							<h3 class="fragments-board__camp-title fragments-board__camp-title--staff">
								<span aria-hidden="true">◇</span>
								Camp Staff
							</h3>
							<div class="fragments-grid">
								{#each archiveStaff as fragment, index}
									{@render fragmentCard(fragment, index + archiveMembers.length)}
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{/if}
		</section>
	{/if}
</section>
