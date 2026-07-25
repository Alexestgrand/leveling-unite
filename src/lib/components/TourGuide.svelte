<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { EVENT } from '$lib/data/mock';
	import { tour } from '$lib/tour/tour.svelte';

	let hole = $state({ top: 0, left: 0, width: 0, height: 0, visible: false });
	let syncing = $state(false);

	const step = $derived(tour.step);
	const progressLabel = $derived(`${tour.stepIndex + 1} / ${tour.total}`);

	async function syncTarget(signal: { cancelled: boolean }) {
		if (!tour.open) {
			hole = { ...hole, visible: false };
			return;
		}

		syncing = true;
		const targetRoute = step.route;
		const current = $page.url.pathname;

		if (current !== targetRoute) {
			await goto(targetRoute, { noScroll: true, keepFocus: true });
			await new Promise((r) => requestAnimationFrame(() => r(null)));
			await new Promise((r) => setTimeout(r, 100));
			if (signal.cancelled) return;
		}

		const el = document.querySelector(`[data-tour="${step.target}"]`) as HTMLElement | null;
		if (signal.cancelled) return;

		if (!el) {
			hole = { top: 0, left: 0, width: 0, height: 0, visible: false };
			syncing = false;
			return;
		}

		el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
		await new Promise((r) => setTimeout(r, 300));
		if (signal.cancelled) return;

		const pad = 10;
		const rect = el.getBoundingClientRect();
		hole = {
			top: Math.max(8, rect.top - pad),
			left: Math.max(8, rect.left - pad),
			width: Math.min(window.innerWidth - 16, rect.width + pad * 2),
			height: Math.min(window.innerHeight - 160, rect.height + pad * 2),
			visible: true
		};
		syncing = false;
	}

	$effect(() => {
		if (!tour.open) {
			hole = { top: 0, left: 0, width: 0, height: 0, visible: false };
			return;
		}

		void tour.stepIndex;
		void step.target;
		void step.route;
		void $page.url.pathname;

		const signal = { cancelled: false };
		void syncTarget(signal);
		return () => {
			signal.cancelled = true;
		};
	});

	onMount(() => {
		const onResize = () => {
			if (!tour.open) return;
			const el = document.querySelector(`[data-tour="${tour.step.target}"]`) as HTMLElement | null;
			if (!el) return;
			const pad = 10;
			const rect = el.getBoundingClientRect();
			hole = {
				top: Math.max(8, rect.top - pad),
				left: Math.max(8, rect.left - pad),
				width: Math.min(window.innerWidth - 16, rect.width + pad * 2),
				height: Math.min(window.innerHeight - 160, rect.height + pad * 2),
				visible: true
			};
		};
		const onKey = (e: KeyboardEvent) => {
			if (!tour.open) return;
			if (e.key === 'Escape') {
				e.preventDefault();
				tour.skip();
			} else if (e.key === 'ArrowRight' || e.key === 'Enter') {
				e.preventDefault();
				tour.next();
			} else if (e.key === 'ArrowLeft') {
				e.preventDefault();
				tour.prev();
			}
		};
		window.addEventListener('resize', onResize);
		window.addEventListener('keydown', onKey);
		return () => {
			window.removeEventListener('resize', onResize);
			window.removeEventListener('keydown', onKey);
		};
	});
</script>

{#if tour.promptVisible && $page.url.pathname === '/'}
	<div class="tour-prompt surface-card" role="status">
		<p class="tour-prompt__text">
			<span aria-hidden="true">◈</span>
			Première fois ? Un guide rapide t’explique l’enquête en 1 minute.
		</p>
		<div class="tour-prompt__actions">
			<button type="button" class="tour-btn tour-btn--ghost" onclick={() => tour.dismissPrompt()}>
				Plus tard
			</button>
			<button type="button" class="tour-btn tour-btn--primary" onclick={() => tour.start()}>
				Comment ça marche
			</button>
		</div>
	</div>
{/if}

{#if tour.open}
	<div class="tour-root" role="dialog" aria-modal="true" aria-labelledby="tour-title">
		<div class="tour-scrim" aria-hidden="true"></div>

		{#if hole.visible}
			<div
				class="tour-hole"
				style="top: {hole.top}px; left: {hole.left}px; width: {hole.width}px; height: {hole.height}px;"
				aria-hidden="true"
			></div>
		{/if}

		<div class="tour-guide" class:tour-guide--syncing={syncing}>
			<div class="tour-guide__stick" aria-hidden="true">
				<svg class="tour-stickman tour-stickman--{step.pose}" viewBox="0 0 80 110" fill="none">
					<circle cx="40" cy="18" r="12" stroke="currentColor" stroke-width="3" />
					<path d="M40 30 V68" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
					<path d="M40 68 L24 98" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
					<path d="M40 68 L56 98" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
					{#if step.pose === 'wave'}
						<path d="M40 42 L22 52" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
						<path
							class="tour-stickman__arm-wave"
							d="M40 42 L58 28"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
						/>
					{:else if step.pose === 'point'}
						<path d="M40 42 L24 56" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
						<path
							class="tour-stickman__arm-point"
							d="M40 42 L68 36"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
						/>
					{:else if step.pose === 'think'}
						<path d="M40 42 L26 58" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
						<path d="M40 42 L52 28" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
						<circle cx="56" cy="22" r="2.5" fill="currentColor" opacity="0.7" />
						<circle cx="62" cy="16" r="1.8" fill="currentColor" opacity="0.5" />
					{:else}
						<path d="M40 42 L22 30" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
						<path d="M40 42 L58 30" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
					{/if}
				</svg>
			</div>

			<div class="tour-guide__panel surface-card">
				<div class="tour-guide__meta">
					<span class="tour-guide__progress">{progressLabel}</span>
					<button type="button" class="tour-guide__skip" onclick={() => tour.skip()}>Passer</button>
				</div>
				<h2 id="tour-title" class="tour-guide__title">{step.title}</h2>
				<p class="tour-guide__body">{step.body}</p>

				<div class="tour-guide__actions">
					<button
						type="button"
						class="tour-btn tour-btn--ghost"
						onclick={() => tour.prev()}
						disabled={tour.isFirst}
					>
						Retour
					</button>
					{#if tour.isLast}
						<a
							href={EVENT.discordUrl}
							class="tour-btn tour-btn--ghost"
							target="_blank"
							rel="noopener noreferrer"
							onclick={() => tour.complete()}
						>
							Discord
						</a>
						<button type="button" class="tour-btn tour-btn--primary" onclick={() => tour.complete()}>
							C’est compris
						</button>
					{:else}
						<button type="button" class="tour-btn tour-btn--primary" onclick={() => tour.next()}>
							Suivant
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
