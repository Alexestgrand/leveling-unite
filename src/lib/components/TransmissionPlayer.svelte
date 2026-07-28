<script lang="ts">
	const SPEED_OPTIONS = [
		{ label: '0,75×', value: 0.75 },
		{ label: '1×', value: 1 },
		{ label: '1,25×', value: 1.25 },
		{ label: '1,5×', value: 1.5 },
		{ label: '2×', value: 2 }
	] as const;

	let {
		src,
		title = 'Interception',
		filename = 'transmission.wav'
	}: {
		src: string;
		title?: string;
		filename?: string;
	} = $props();

	let audioEl = $state<HTMLAudioElement | null>(null);
	let playing = $state(false);
	let currentTime = $state(0);
	let duration = $state(0);
	let playbackRate = $state(1);
	let ready = $state(false);

	const progress = $derived(duration > 0 ? (currentTime / duration) * 100 : 0);

	function formatTime(seconds: number): string {
		if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
		const m = Math.floor(seconds / 60);
		const s = Math.floor(seconds % 60);
		return `${m}:${s.toString().padStart(2, '0')}`;
	}

	function bindAudio(node: HTMLAudioElement) {
		audioEl = node;

		const onLoaded = () => {
			duration = node.duration;
			ready = Number.isFinite(node.duration);
		};
		const onTime = () => {
			currentTime = node.currentTime;
		};
		const onPlay = () => {
			playing = true;
		};
		const onPause = () => {
			playing = false;
		};
		const onEnded = () => {
			playing = false;
			currentTime = 0;
		};

		node.addEventListener('loadedmetadata', onLoaded);
		node.addEventListener('timeupdate', onTime);
		node.addEventListener('play', onPlay);
		node.addEventListener('pause', onPause);
		node.addEventListener('ended', onEnded);

		return {
			destroy() {
				node.removeEventListener('loadedmetadata', onLoaded);
				node.removeEventListener('timeupdate', onTime);
				node.removeEventListener('play', onPlay);
				node.removeEventListener('pause', onPause);
				node.removeEventListener('ended', onEnded);
			}
		};
	}

	function togglePlay() {
		if (!audioEl) return;
		if (playing) {
			audioEl.pause();
		} else {
			void audioEl.play();
		}
	}

	function seek(event: Event) {
		if (!audioEl || !ready) return;
		const input = event.currentTarget as HTMLInputElement;
		const next = (Number(input.value) / 100) * duration;
		audioEl.currentTime = next;
		currentTime = next;
	}

	function setSpeed(rate: number) {
		playbackRate = rate;
		if (audioEl) audioEl.playbackRate = rate;
	}
</script>

<section class="transmission-player" aria-label="Lecteur de la transmission interceptée">
	<audio use:bindAudio {src} preload="metadata"></audio>

	<header class="transmission-player__head">
		<div class="transmission-player__badge" aria-hidden="true">
			<span class="transmission-player__pulse"></span>
			<span>● REC</span>
		</div>
		<h2 class="transmission-player__title">{title}</h2>
		<p class="transmission-player__meta">Fichier audio · {filename}</p>
	</header>

	<div class="transmission-player__controls">
		<button
			type="button"
			class="transmission-player__play"
			onclick={togglePlay}
			aria-label={playing ? 'Mettre en pause' : 'Lire la transmission'}
		>
			{#if playing}
				<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
				</svg>
			{:else}
				<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M8 5v14l11-7L8 5z" />
				</svg>
			{/if}
		</button>

		<div class="transmission-player__timeline">
			<input
				type="range"
				class="transmission-player__seek"
				min="0"
				max="100"
				step="0.1"
				value={progress}
				oninput={seek}
				disabled={!ready}
				aria-label="Position dans la transmission"
			/>
			<div class="transmission-player__times">
				<span>{formatTime(currentTime)}</span>
				<span>{formatTime(duration)}</span>
			</div>
		</div>
	</div>

	<div class="transmission-player__actions">
		<div class="transmission-player__speed-group" role="group" aria-label="Vitesse de lecture">
			<span class="transmission-player__action-label">Vitesse</span>
			<div class="transmission-player__speeds">
				{#each SPEED_OPTIONS as option (option.value)}
					<button
						type="button"
						class="transmission-player__speed-btn"
						class:transmission-player__speed-btn--active={playbackRate === option.value}
						onclick={() => setSpeed(option.value)}
					>
						{option.label}
					</button>
				{/each}
			</div>
		</div>

		<a class="transmission-player__download btn-pill btn-pill--primary" href={src} download={filename}>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
				/>
			</svg>
			Télécharger
		</a>
	</div>
</section>
