<script lang="ts">
	import { onMount } from 'svelte';
	import PageShell from '$lib/components/PageShell.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { fetchEventStatus, fetchFeedbackList, submitFeedback } from '$lib/api/validate';
	import { CADRAN_CREUX, EVENT } from '$lib/data/mock';
	import type { EventStatus, FeedbackEntry } from '$lib/types/validate';
	import { getWinnerLabel, isFeedbackOpen } from '$lib/utils/event-status';

	const MAX_CHARS = 500;

	let eventStatus = $state<EventStatus | null>(null);
	let entries = $state<FeedbackEntry[]>([]);
	let message = $state('');
	let loading = $state(true);
	let submitting = $state(false);
	let statusMessage = $state('');
	let statusTone = $state<'neutral' | 'error' | 'success'>('neutral');

	const feedbackOpen = $derived(isFeedbackOpen(eventStatus));
	const winnerLabel = $derived(getWinnerLabel());
	const charCount = $derived(message.length);
	const canSubmit = $derived(
		feedbackOpen && !submitting && message.trim().length >= 3 && charCount <= MAX_CHARS
	);

	function formatDate(iso: string): string {
		try {
			return new Intl.DateTimeFormat('fr-FR', {
				dateStyle: 'medium',
				timeStyle: 'short'
			}).format(new Date(iso));
		} catch {
			return iso;
		}
	}

	async function refresh() {
		loading = true;
		const [status, list] = await Promise.all([fetchEventStatus(), fetchFeedbackList()]);
		eventStatus = status;
		entries = list;
		loading = false;
	}

	async function handleSubmit() {
		if (!canSubmit) return;

		submitting = true;
		statusMessage = '';
		statusTone = 'neutral';

		const result = await submitFeedback(message.trim());
		submitting = false;

		if (result.success && result.entry) {
			entries = [result.entry, ...entries];
			message = '';
			statusTone = 'success';
			statusMessage = 'Merci — votre avis a été publié.';
			return;
		}

		statusTone = 'error';
		statusMessage = result.message || 'Impossible d’envoyer votre avis.';
	}

	onMount(() => {
		refresh();
	});
</script>

<PageShell
	sectionLabel="Retour"
	title="Avis & suggestions"
	subtitle="Anonyme, visible par tous."
	contextLine="Disponible une fois l’énigme terminée — deadline ou camp gagnant."
>
	{#if loading}
		<div class="surface-card hud-panel clip-corners p-6 sm:p-8" use:reveal>
			<p class="text-sm text-zinc-400">Chargement…</p>
		</div>
	{:else if !feedbackOpen}
		<div
			class="surface-card hud-panel clip-corners border-amber-500/30 p-6 sm:p-8"
			use:reveal
			role="status"
		>
			<h2 class="font-display text-lg font-bold text-amber-300">Pas encore disponible</h2>
			<p class="mt-3 text-sm leading-relaxed text-zinc-400">
				Les avis s’ouvriront quand la soumission sera close — à la deadline
				({CADRAN_CREUX.submitDeadlineLabel}) ou dès qu’un camp valide la phrase.
			</p>
			<a href="/" class="btn-pill mt-6 inline-flex">Retour à l’accueil</a>
		</div>
	{:else}
		<div class="space-y-6 sm:space-y-8">
			<div class="surface-card hud-panel clip-corners glow-border p-5 sm:p-6" use:reveal role="status">
				<p class="section-eyebrow">
					<span class="section-eyebrow__dot" aria-hidden="true"></span>
					Événement terminé
				</p>
				<p class="mt-3 text-sm leading-relaxed text-zinc-300">
					{#if winnerLabel}
						Camp gagnant : <strong class="text-leveling-blue-light">{winnerLabel}</strong>.
					{:else if eventStatus?.closed_reason === 'winner'}
						Un camp a validé la phrase en premier.
					{:else if eventStatus?.closed_reason === 'deadline'}
						La deadline de soumission est passée ({CADRAN_CREUX.submitDeadlineLabel}).
					{:else}
						La fenêtre de soumission est close.
					{/if}
					Partagez votre ressenti — sans compte, sans pseudo.
				</p>
			</div>

			<form
				class="surface-card hud-panel clip-corners p-5 sm:p-6"
				use:reveal={{ delay: 60 }}
				onsubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<label for="feedback-input" class="block text-sm font-semibold text-zinc-200">
					Votre avis
				</label>
				<p id="feedback-hint" class="mt-1 text-xs text-zinc-500">
					3 à {MAX_CHARS} caractères. Publié tel quel, anonymement. Max. 3 envois par heure.
				</p>

				<textarea
					id="feedback-input"
					class="mt-4 min-h-[120px] w-full resize-y rounded-xl border border-zinc-700/80 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-leveling-blue/50 focus:outline-none focus:ring-2 focus:ring-leveling-blue/20"
					placeholder="Ce que vous avez aimé, ce qui pourrait mieux fonctionner…"
					bind:value={message}
					maxlength={MAX_CHARS}
					aria-describedby="feedback-hint feedback-counter"
					disabled={submitting}
				></textarea>

				<p
					id="feedback-counter"
					class="mt-2 text-xs tabular-nums text-zinc-500"
					class:text-amber-400={charCount > MAX_CHARS - 40}
				>
					{charCount} / {MAX_CHARS}
				</p>

				{#if statusMessage}
					<p
						class="mt-4 text-sm"
						class:text-red-400={statusTone === 'error'}
						class:text-leveling-blue-light={statusTone === 'success'}
						role="alert"
						aria-live="polite"
					>
						{statusMessage}
					</p>
				{/if}

				<button type="submit" class="btn-pill btn-pill--primary mt-6" disabled={!canSubmit}>
					{submitting ? 'Envoi…' : 'Publier anonymement'}
				</button>
			</form>

			<section class="space-y-4" aria-labelledby="feedback-list-heading">
				<h2 id="feedback-list-heading" class="font-display text-lg font-bold text-white" use:reveal>
					Avis publiés ({entries.length})
				</h2>

				{#if entries.length === 0}
					<p class="text-sm text-zinc-500" use:reveal>Soyez le premier à laisser un mot.</p>
				{:else}
					<ul class="space-y-3">
						{#each entries as entry (entry.id)}
							<li class="surface-card hud-panel clip-corners p-4 sm:p-5" use:reveal>
								<p class="text-sm leading-relaxed text-zinc-300 whitespace-pre-wrap">{entry.message}</p>
								<p class="mt-3 text-xs uppercase tracking-wider text-zinc-600">
									{formatDate(entry.created_at)} · Anonyme
								</p>
							</li>
						{/each}
					</ul>
				{/if}
			</section>

			<p class="text-center text-sm text-zinc-500" use:reveal>
				<a href={EVENT.discordUrl} target="_blank" rel="noopener noreferrer" class="text-leveling-blue-light underline">
					Discord {EVENT.discordLabel}
				</a>
				pour la suite de l’événement.
			</p>
		</div>
	{/if}
</PageShell>
