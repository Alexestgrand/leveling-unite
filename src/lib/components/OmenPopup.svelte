<script lang="ts">
	import { onMount } from 'svelte';
	import { playOmenSound } from '$lib/audio/omen';

	const STORAGE_KEY = 'lu-omen-v1-seen';

	let open = $state(false);
	let mounted = $state(false);
	let soundArmed = $state(false);

	function revealOmen(node: HTMLElement) {
		node.style.opacity = '0';
		node.style.transform = 'translateY(16px) scale(0.96)';
		requestAnimationFrame(() => {
			node.style.transition =
				'opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';
			node.style.opacity = '1';
			node.style.transform = 'translateY(0) scale(1)';
		});
		return {};
	}

	function readSeen(): boolean {
		try {
			return localStorage.getItem(STORAGE_KEY) === '1';
		} catch {
			return false;
		}
	}

	function markSeen() {
		try {
			localStorage.setItem(STORAGE_KEY, '1');
		} catch {
			// ignore
		}
	}

	async function triggerSound() {
		if (soundArmed) return;
		soundArmed = true;
		await playOmenSound();
	}

	async function openOmen(fromUser = false) {
		open = true;
		soundArmed = false;
		if (fromUser) {
			await triggerSound();
		}
	}

	async function dismiss() {
		await triggerSound();
		markSeen();
		open = false;
		soundArmed = false;
	}

	function onKeydown(e: KeyboardEvent) {
		if (!open) return;
		if (e.key === 'Escape') {
			e.preventDefault();
			void dismiss();
		}
	}

	onMount(() => {
		mounted = true;
		if (readSeen()) return;
		const id = window.setTimeout(() => {
			void openOmen(false);
		}, 900);
		return () => window.clearTimeout(id);
	});
</script>

<svelte:window onkeydown={onKeydown} />

{#if mounted}
	<button
		type="button"
		class="omen-fab"
		class:omen-fab--alert={open}
		aria-label="Rouvrir le signal menaçant"
		title="Signal"
		onclick={() => void openOmen(true)}
	>
		<svg class="omen-fab__skull" viewBox="0 0 64 64" aria-hidden="true">
			<path
				fill="currentColor"
				d="M32 6c-12.4 0-22 9.2-22 22.2 0 7.4 3.4 13.2 8.2 17.2V52c0 2.2 1.8 4 4 4h3.2l1.6 4h10l1.6-4H41c2.2 0 4-1.8 4-4v-6.6c4.8-4 8.2-9.8 8.2-17.2C53.2 15.2 44.4 6 32 6zm-9 22.5c0-2.5 2-4.5 4.5-4.5S32 26 32 28.5 30 33 27.5 33 23 31 23 28.5zm18 0c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5-4.5-2-4.5-4.5zM24 42c0-4.4 3.6-6 8-6s8 1.6 8 6H24z"
			/>
			<circle cx="27.5" cy="28.5" r="2.2" fill="#1a0505" />
			<circle cx="41.5" cy="28.5" r="2.2" fill="#1a0505" />
		</svg>
		<span class="omen-fab__pulse" aria-hidden="true"></span>
	</button>
{/if}

{#if open}
	<div
		class="omen-overlay"
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		aria-labelledby="omen-title"
		aria-describedby="omen-desc"
		onclick={(e) => {
			if (e.target === e.currentTarget) void dismiss();
			else void triggerSound();
		}}
		onpointerdown={() => void triggerSound()}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') void triggerSound();
		}}
	>
		<div class="omen-modal" use:revealOmen>
			<div class="omen-modal__glow" aria-hidden="true"></div>
			<div class="omen-modal__scan" aria-hidden="true"></div>

			<div class="omen-modal__badge" aria-hidden="true">
				<svg class="omen-modal__skull" viewBox="0 0 64 64">
					<path
						fill="currentColor"
						d="M32 6c-12.4 0-22 9.2-22 22.2 0 7.4 3.4 13.2 8.2 17.2V52c0 2.2 1.8 4 4 4h3.2l1.6 4h10l1.6-4H41c2.2 0 4-1.8 4-4v-6.6c4.8-4 8.2-9.8 8.2-17.2C53.2 15.2 44.4 6 32 6zm-9 22.5c0-2.5 2-4.5 4.5-4.5S32 26 32 28.5 30 33 27.5 33 23 31 23 28.5zm18 0c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5-4.5-2-4.5-4.5zM24 42c0-4.4 3.6-6 8-6s8 1.6 8 6H24z"
					/>
					<circle cx="27.5" cy="28.5" r="2.2" fill="#120303" />
					<circle cx="41.5" cy="28.5" r="2.2" fill="#120303" />
				</svg>
			</div>

			<p class="omen-modal__eyebrow">Transmission hostile</p>
			<h2 id="omen-title" class="omen-modal__title">Vous avancez bien.</h2>
			<p id="omen-desc" class="omen-modal__line">Et si on pimentait les choses ?</p>

			<button type="button" class="omen-modal__cta" onclick={() => void dismiss()}>
				<span aria-hidden="true">☠</span>
				J’accepte le risque
			</button>

			<p class="omen-modal__hint">Le signal reste accessible via la tête de mort.</p>
		</div>
	</div>
{/if}
