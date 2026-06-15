<script lang="ts">
	import { onMount } from 'svelte';
	import PageShell from '$lib/components/PageShell.svelte';
	import { reveal } from '$lib/actions/reveal';
	import {
		API_COLD_START_MESSAGE,
		fetchApiHealth,
		fetchAuthMe,
		getDiscordLoginUrl,
		isApiConfigured,
		logout,
		submitPhrase
	} from '$lib/api/validate';
	import type { AuthMeResponse } from '$lib/types/validate';
	import {
		EXPECTED_PHRASE_WORDS,
		MAX_SUBMIT_ATTEMPTS,
		SUBMIT_CRITERIA
	} from '$lib/data/mock';

	type ViewState = 'loading' | 'unavailable' | 'guest' | 'ready' | 'success' | 'already_won' | 'rate_limited';

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

	const wordCount = $derived(countWords(phrase));
	const remainingAttempts = $derived(user?.remaining_attempts ?? 0);
	const canSubmit = $derived(
		viewState === 'ready' &&
			!submitting &&
			phrase.trim().length > 0 &&
			remainingAttempts > 0
	);

	async function loadSession() {
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
		if (!isApiConfigured()) return;
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

		switch (result.code) {
			case 'VALID':
				viewState = 'success';
				statusTone = 'success';
				statusMessage = result.message;
				if (user) user = { ...user, already_won: true, remaining_attempts: result.remaining_attempts ?? 0 };
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
	});
</script>

<PageShell
	sectionLabel="Soumission"
	title="Soumettre la phrase"
	subtitle="Connectez-vous avec Discord, puis envoyez la phrase reconstituée. Deux essais par 24 heures."
>
	{#if showColdStartNotice && viewState !== 'loading'}
		<p class="mb-4 text-center text-sm leading-relaxed text-zinc-500" role="status">
			{API_COLD_START_MESSAGE}
		</p>
	{/if}

	{#if viewState === 'loading'}
		<div class="surface-card hud-panel clip-corners p-8 text-center" use:reveal>
			<p class="text-sm text-zinc-400">Chargement de votre session…</p>
		</div>
	{:else if viewState === 'unavailable'}
		<div
			class="surface-card hud-panel clip-corners glow-border border-amber-500/30 p-6 sm:p-8"
			use:reveal
			role="alert"
		>
			<h2 class="font-display text-lg font-bold text-amber-300">Service indisponible</h2>
			<p class="mt-3 text-sm leading-relaxed text-zinc-400">
				{#if !isApiConfigured()}
					L'API de validation n'est pas configurée (<code class="text-zinc-300">PUBLIC_API_URL</code>).
				{:else}
					Impossible de joindre le serveur de validation. Vérifiez que l'API est démarrée et réessayez.
					{#if showColdStartNotice}
						<span class="mt-2 block">{API_COLD_START_MESSAGE}</span>
					{/if}
				{/if}
			</p>
			<button type="button" class="btn-pill btn-pill--primary mt-6" onclick={loadSession}>
				Réessayer
			</button>
		</div>
	{:else if viewState === 'guest'}
		<div class="surface-card hud-panel clip-corners glow-border p-6 sm:p-8" use:reveal>
			<h2 class="font-display text-lg font-bold text-white">Connexion requise</h2>
			<p class="mt-2 text-sm text-zinc-400">
				Authentifiez-vous avec Discord pour soumettre la phrase reconstituée par votre camp.
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
				<button type="button" class="btn-pill btn-pill--primary" onclick={connectDiscord}>
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
				{statusMessage || 'Vous avez utilisé vos 2 essais pour les prochaines 24 heures. Revenez plus tard.'}
			</p>
			<p class="mt-4 text-xs uppercase tracking-wider text-zinc-500">
				Essais restants : 0 / {MAX_SUBMIT_ATTEMPTS}
			</p>
		</div>
	{:else}
		<div class="space-y-4 sm:space-y-6">
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
					disabled={submitting}
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
		</div>
	{/if}
</PageShell>
