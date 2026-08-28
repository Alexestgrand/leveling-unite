<script lang="ts">
	import { onMount } from 'svelte';
	import PageShell from '$lib/components/PageShell.svelte';
	import PortalLoading from '$lib/components/PortalLoading.svelte';
	import { reveal } from '$lib/actions/reveal';
	import {
		API_COLD_START_MESSAGE,
		fetchApiHealth,
		fetchAuthMe,
		fetchEventStatus,
		fetchSubmissionStats,
		getDiscordLoginUrl,
		isApiConfigured,
		logout,
		submitPhrase
	} from '$lib/api/validate';
	import type { AuthMeResponse } from '$lib/types/validate';
	import {
		CADRAN_CREUX,
		EXPECTED_PHRASE_WORDS,
		MAX_SUBMIT_ATTEMPTS,
		RATE_LIMIT_WINDOW_HOURS,
		SUBMIT_CRITERIA,
		SUBMIT_FOOTNOTE
	} from '$lib/data/mock';
	import {
		getSubmissionCountdownTarget,
		getSubmissionPhase,
		getTimeRemaining,
		padTime
	} from '$lib/utils/countdown';
	import { getWinnerLabel, isSubmissionClosedLocally } from '$lib/utils/event-status';
	import { formatViews } from '$lib/utils/format';

	type ViewState = 'loading' | 'unavailable' | 'guest' | 'ready' | 'success' | 'already_won' | 'rate_limited' | 'closed';

	const STATS_POLL_MS = 8000;

	function countWords(text: string): number {
		return text.trim().split(/\s+/).filter(Boolean).length;
	}

	let viewState = $state<ViewState>('loading');
	let user = $state<AuthMeResponse | null>(null);
	let phrase = $state('');
	let submitting = $state(false);
	let statusMessage = $state('');
	let statusTone = $state<'neutral' | 'error' | 'success'>('neutral');
	let showColdStartNotice = $state(false);
	let uniqueTesters = $state<number | null>(null);
	let totalAttempts = $state<number | null>(null);
	let closedReason = $state<'deadline' | 'winner' | 'staff' | null>(null);

	const wordCount = $derived(countWords(phrase));
	const submitPhase = $derived(
		CADRAN_CREUX.resolved
			? getSubmissionPhase(CADRAN_CREUX.submitOpenDate, CADRAN_CREUX.submitDeadline)
			: 'open'
	);
	const submissionClosed = $derived(
		isSubmissionClosedLocally() || closedReason !== null || viewState === 'closed'
	);
	const submitWindowOpen = $derived(submitPhase === 'open' && !submissionClosed);
	let submitCountdown = $state(getTimeRemaining(CADRAN_CREUX.submitDeadline));

	const remainingAttempts = $derived(user?.remaining_attempts ?? 0);
	const winnerLabel = $derived(getWinnerLabel());

	function resolveClosedReason(): 'deadline' | 'winner' | 'staff' | null {
		if (getWinnerLabel()) return 'staff';
		if (isSubmissionClosedLocally() && submitPhase === 'closed') return 'deadline';
		return null;
	}

	async function checkSubmissionClosed() {
		const localReason = resolveClosedReason();
		if (localReason) {
			closedReason = localReason;
			viewState = 'closed';
			return true;
		}

		const status = await fetchEventStatus();
		if (status && !status.submission_open) {
			closedReason = status.closed_reason ?? 'winner';
			viewState = 'closed';
			return true;
		}
		return false;
	}
	const canSubmit = $derived(
		submitWindowOpen &&
			viewState === 'ready' &&
			!submitting &&
			phrase.trim().length > 0 &&
			remainingAttempts > 0
	);

	async function refreshStats() {
		const data = await fetchSubmissionStats();
		if (!data) return;
		uniqueTesters = data.unique_testers;
		totalAttempts = data.total_attempts;
	}

	async function loadSession() {
		if (await checkSubmissionClosed()) return;

		viewState = 'loading';
		statusMessage = '';
		statusTone = 'neutral';
		showColdStartNotice = false;

		if (!isApiConfigured()) {
			viewState = 'unavailable';
			return;
		}

		const health = await fetchApiHealth();
		if (health !== 'ok') {
			showColdStartNotice = true;
		}

		try {
			const me = await fetchAuthMe();

			if (me === 'error') {
				if (health !== 'ok') {
					user = null;
					viewState = 'guest';
					return;
				}
				viewState = 'unavailable';
				return;
			}

			if (!me?.authenticated) {
				user = null;
				viewState = 'guest';
				return;
			}

			user = me;

			if (me.already_won) {
				viewState = 'already_won';
				return;
			}

			if (me.remaining_attempts <= 0) {
				viewState = 'rate_limited';
				return;
			}

			viewState = 'ready';
		} catch {
			viewState = 'unavailable';
		}
	}

	function connectDiscord() {
		if (!isApiConfigured() || !submitWindowOpen) return;
		// Full-page redirect required: OAuth callback sets httpOnly cookie on API domain.
		window.location.href = getDiscordLoginUrl();
	}

	async function handleLogout() {
		await logout();
		user = null;
		phrase = '';
		statusMessage = '';
		await loadSession();
	}

	async function handleSubmit() {
		if (!canSubmit) return;

		if (wordCount !== EXPECTED_PHRASE_WORDS) {
			const proceed = window.confirm(
				`Votre phrase contient ${wordCount} mots (${EXPECTED_PHRASE_WORDS} attendus). Continuer ?`
			);
			if (!proceed) return;
		}

		submitting = true;
		statusMessage = '';
		statusTone = 'neutral';

		const result = await submitPhrase(phrase);

		if (user && result.remaining_attempts !== undefined) {
			user = { ...user, remaining_attempts: result.remaining_attempts };
		}

		submitting = false;
		await refreshStats();

		switch (result.code) {
			case 'VALID':
				viewState = 'success';
				statusTone = 'success';
				statusMessage = result.message;
				if (user) user = { ...user, already_won: true, remaining_attempts: result.remaining_attempts ?? 0 };
				closedReason = 'winner';
				break;
			case 'SUBMISSION_CLOSED':
				viewState = 'closed';
				closedReason = 'winner';
				statusTone = 'error';
				statusMessage = result.message;
				break;
			case 'ALREADY_WON':
				viewState = 'already_won';
				statusMessage = result.message;
				break;
			case 'RATE_LIMITED':
				viewState = 'rate_limited';
				statusTone = 'error';
				statusMessage = result.message;
				if (user) user = { ...user, remaining_attempts: 0 };
				break;
			case 'INVALID':
				statusTone = 'error';
				statusMessage = result.message;
				break;
			case 'UNAUTHORIZED':
				viewState = 'guest';
				user = null;
				statusTone = 'error';
				statusMessage = 'Session expirée. Reconnectez-vous avec Discord.';
				break;
			default:
				statusTone = 'error';
				statusMessage = result.message || 'Une erreur est survenue.';
		}
	}

	onMount(() => {
		loadSession();

		const tickSubmitCountdown = () => {
			submitCountdown = getTimeRemaining(
				getSubmissionCountdownTarget(CADRAN_CREUX.submitOpenDate, CADRAN_CREUX.submitDeadline)
			);
			if (submitPhase === 'closed' && viewState !== 'closed' && viewState !== 'success') {
				checkSubmissionClosed();
			}
		};
		tickSubmitCountdown();
		const countdownIntervalId = setInterval(tickSubmitCountdown, 1000);

		let statsIntervalId: ReturnType<typeof setInterval> | undefined;
		if (isApiConfigured()) {
			refreshStats();
			statsIntervalId = setInterval(refreshStats, STATS_POLL_MS);
		}

		return () => {
			clearInterval(countdownIntervalId);
			if (statsIntervalId) clearInterval(statsIntervalId);
		};
	});
</script>

<PageShell
	sectionLabel="Soumission"
	title="Soumettre la phrase"
	subtitle="Teste la phrase reconstituée par ton camp."
	contextLine="15 mots. 2 essais par 24 h. Soumission prolongée jusqu’au 28/08 à 21h06."
>
	<div data-tour="tour-soumettre">
	{#if viewState === 'closed' || (CADRAN_CREUX.resolved && submitPhase === 'closed')}
		<div
			class="surface-card hud-panel clip-corners border-red-500/30 mb-6 p-5 sm:p-6"
			use:reveal
			role="alert"
		>
			<p class="font-display text-lg font-bold text-red-300">Soumission close</p>
			<p class="mt-2 text-sm text-zinc-400">
				{#if winnerLabel}
					Le camp <strong class="text-zinc-200">{winnerLabel}</strong> a remporté l’événement.
				{:else if closedReason === 'winner'}
					Un camp a validé la phrase en premier. La soumission est terminée.
				{:else}
					La fenêtre de soumission est terminée (deadline {CADRAN_CREUX.submitDeadlineLabel}).
				{/if}
			</p>
			<a href="/avis" class="btn-pill btn-pill--primary mt-6 inline-flex">Laisser un avis →</a>
		</div>
	{:else if CADRAN_CREUX.resolved && submitPhase === 'upcoming'}
		<div
			class="surface-card hud-panel clip-corners border-amber-500/30 mb-6 p-5 sm:p-6"
			use:reveal
			role="status"
		>
			<p class="section-eyebrow">
				<span class="section-eyebrow__dot" aria-hidden="true"></span>
				Ouverture imminente
			</p>
			<p class="mt-3 text-sm leading-relaxed text-zinc-300">
				La soumission rouvre le <strong>{CADRAN_CREUX.submitOpenDateLabel}</strong> — dans
				<strong>{padTime(submitCountdown.days)}j {padTime(submitCountdown.hours)}h {padTime(submitCountdown.minutes)}m</strong>.
				Fenêtre de 48 h jusqu’au {CADRAN_CREUX.submitDeadlineLabel}.
			</p>
		</div>
	{:else if CADRAN_CREUX.resolved && submitPhase === 'open'}
		<p class="submit-live-stats mb-4" use:reveal role="status">
			Soumission prolongée — il reste
			<strong>{padTime(submitCountdown.days)}j {padTime(submitCountdown.hours)}h {padTime(submitCountdown.minutes)}m</strong>
			(jusqu’au {CADRAN_CREUX.submitDeadlineLabel})
		</p>
	{/if}
	{#if viewState !== 'closed' && uniqueTesters !== null}
		<p class="submit-live-stats" use:reveal role="status" aria-live="polite">
			<span class="stat-card__live-dot" aria-hidden="true"></span>
			<strong>{formatViews(uniqueTesters)}</strong> personne{uniqueTesters === 1 ? '' : 's'} ont déjà
			testé
			{#if totalAttempts !== null}
				· <span class="text-zinc-500">{formatViews(totalAttempts)} essais</span>
			{/if}
		</p>
	{/if}
	{#if showColdStartNotice && viewState !== 'loading' && viewState !== 'unavailable' && viewState !== 'closed'}
		<p class="mb-4 text-center text-sm leading-relaxed text-zinc-500" role="status">
			{API_COLD_START_MESSAGE}
		</p>
	{/if}

	{#if viewState === 'loading'}
		<div use:reveal>
			<PortalLoading title="Connexion au portail…" />
		</div>
	{:else if viewState === 'unavailable'}
		<div class="space-y-4" use:reveal>
			<PortalLoading title="Le portail se synchronise…" />
			<div
				class="surface-card hud-panel clip-corners glow-border border-amber-500/30 p-6 sm:p-8"
				role="alert"
			>
				<h2 class="font-display text-lg font-bold text-amber-300">Service indisponible</h2>
				<p class="mt-3 text-sm leading-relaxed text-zinc-400">
					{#if !isApiConfigured()}
						L'API de validation n'est pas configurée (<code class="text-zinc-300">PUBLIC_API_URL</code>).
					{:else}
						Impossible de joindre le serveur de validation pour le moment. Réessayez dans quelques instants.
					{/if}
				</p>
				<button type="button" class="btn-pill btn-pill--primary mt-6" onclick={loadSession}>
					Réessayer
				</button>
			</div>
		</div>
	{:else if viewState === 'closed'}
		<!-- bannière close affichée ci-dessus -->
	{:else if viewState === 'guest'}
		<div class="surface-card hud-panel clip-corners glow-border p-6 sm:p-8" use:reveal>
			<h2 class="font-display text-lg font-bold text-white">Identification requise</h2>
			<p class="mt-2 text-sm text-zinc-400">
				Pour tester une phrase, identifiez-vous afin que votre camp et vos tentatives soient enregistrés.
			</p>

			<ul class="mt-6 space-y-2 text-sm text-zinc-300">
				{#each SUBMIT_CRITERIA as criterion}
					<li class="flex gap-2">
						<span class="text-leveling-blue-light" aria-hidden="true">▸</span>
						{criterion}
					</li>
				{/each}
			</ul>

			<div class="mt-8 flex flex-wrap gap-3">
				<button
					type="button"
					class="btn-pill btn-pill--primary"
					onclick={connectDiscord}
					disabled={!submitWindowOpen}
				>
					Se connecter avec Discord
				</button>
				<a href="/regles" class="btn-pill">Lire les règles</a>
			</div>
		</div>
	{:else if viewState === 'success'}
		<div
			class="surface-card hud-panel clip-corners glow-border border-leveling-blue/40 glow-neon p-6 sm:p-8"
			use:reveal
			role="status"
			aria-live="polite"
		>
			<p class="section-eyebrow">
				<span class="section-eyebrow__dot" aria-hidden="true"></span>
				Phrase validée
			</p>
			<h2 class="mt-3 font-display text-2xl font-bold text-leveling-blue-light">
				Félicitations !
			</h2>
			<p class="mt-3 text-sm leading-relaxed text-zinc-300">
				{statusMessage || 'Votre phrase a été acceptée. Consultez Discord pour la suite de l\'événement.'}
			</p>
			<a href="/avis" class="btn-pill mt-6 inline-flex">Laisser un avis →</a>
		</div>
	{:else if viewState === 'already_won'}
		<div class="surface-card hud-panel clip-corners p-6 sm:p-8" use:reveal role="status" aria-live="polite">
			<h2 class="font-display text-lg font-bold text-leveling-blue-light">Déjà validé</h2>
			<p class="mt-3 text-sm text-zinc-400">
				{statusMessage ||
					'Cette phrase a déjà été validée pour votre compte. Aucune nouvelle soumission n\'est possible.'}
			</p>
		</div>
	{:else if viewState === 'rate_limited'}
		<div
			class="surface-card hud-panel clip-corners border-amber-500/30 p-6 sm:p-8"
			use:reveal
			role="alert"
			aria-live="polite"
		>
			<h2 class="font-display text-lg font-bold text-amber-300">Limite atteinte</h2>
			<p class="mt-3 text-sm text-zinc-400">
				{statusMessage ||
					`Tes ${MAX_SUBMIT_ATTEMPTS} essais sont épuisés pour les prochaines ${RATE_LIMIT_WINDOW_HOURS} h. Le compteur se réinitialise automatiquement — en attendant, aide les Fragmentés.`}
			</p>
			<p class="mt-4 text-xs uppercase tracking-wider text-zinc-500">
				Essais restants : 0 / {MAX_SUBMIT_ATTEMPTS}
			</p>
			<div class="mt-6 flex flex-wrap gap-3">
				<a href="/fragmentes" class="btn-pill btn-pill--primary">Voir les quêtes</a>
				<a href="/" class="btn-pill">Retour à l’accueil</a>
			</div>
		</div>
	{:else}
		<div class="space-y-4 sm:space-y-6">
			{#if submitting}
				<PortalLoading title="Vérification de la phrase…" />
			{:else}
			<div class="surface-card hud-panel clip-corners glow-border p-5 sm:p-6" use:reveal>
				<div class="flex flex-wrap items-center justify-between gap-4">
					<div>
						<p class="text-xs uppercase tracking-wider text-zinc-500">Connecté en tant que</p>
						<p class="mt-1 font-display text-base font-bold text-leveling-blue-light">
							{user?.username}
						</p>
					</div>
					<div class="rounded-lg border border-leveling-blue/25 bg-leveling-blue/5 px-4 py-2 text-center">
						<p class="text-xs uppercase tracking-wider text-zinc-500">Essais restants</p>
						<p class="font-display text-xl font-bold tabular-nums text-white">
							{remainingAttempts} / {MAX_SUBMIT_ATTEMPTS}
						</p>
					</div>
				</div>
			</div>

			<form
				class="surface-card hud-panel clip-corners p-5 sm:p-6"
				use:reveal={{ delay: 80 }}
				onsubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<label for="phrase-input" class="block text-sm font-semibold text-zinc-200">
					Phrase reconstituée
				</label>
				<p id="phrase-hint" class="mt-1 text-xs text-zinc-500">
					Saisissez les {EXPECTED_PHRASE_WORDS} mots dans l'ordre, séparés par des espaces.
				</p>

				<textarea
					id="phrase-input"
					class="mt-4 min-h-[140px] w-full resize-y rounded-xl border border-zinc-700/80 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-leveling-blue/50 focus:outline-none focus:ring-2 focus:ring-leveling-blue/20"
					placeholder="Saisissez les 15 mots de la phrase…"
					bind:value={phrase}
					aria-describedby="phrase-hint word-counter"
					disabled={submitting || !submitWindowOpen}
				></textarea>

				<p
					id="word-counter"
					class="mt-2 text-xs font-semibold tabular-nums"
					class:text-leveling-blue-light={wordCount === EXPECTED_PHRASE_WORDS}
					class:text-amber-400={wordCount > 0 && wordCount !== EXPECTED_PHRASE_WORDS}
					class:text-zinc-500={wordCount === 0}
				>
					{wordCount} / {EXPECTED_PHRASE_WORDS} mots
				</p>

				{#if statusMessage && statusTone === 'error'}
					<p class="mt-4 text-sm text-red-400" role="alert" aria-live="assertive">
						{statusMessage}
						{#if remainingAttempts >= 0 && viewState === 'ready'}
							<span class="mt-1 block text-zinc-500">
								Essais restants : {remainingAttempts} / {MAX_SUBMIT_ATTEMPTS}
							</span>
						{/if}
					</p>
				{/if}

				<div class="mt-6 flex flex-wrap gap-3">
					<button type="submit" class="btn-pill btn-pill--primary" disabled={!canSubmit}>
						{submitting ? 'Envoi…' : 'Valider la phrase'}
					</button>
					<button
						type="button"
						class="btn-pill"
						disabled={submitting}
						onclick={handleLogout}
					>
						Se déconnecter
					</button>
				</div>
			</form>
			{/if}
		</div>
	{/if}

	<p class="submit-footnote" use:reveal={{ delay: 120 }}>{SUBMIT_FOOTNOTE}</p>
	</div>
</PageShell>
